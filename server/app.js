require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const jwt = require('jsonwebtoken');
const https = require('https');

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    handle_forces: { type: String },
    done: { type: String },
    todo: { type: String }
})

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });
const User = new mongoose.model("User", userSchema);

// Default
app.get('/', function (req, res) {
    res.send("Server Working Properly");
});

// Login
app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            if (found) {
                if (found.password === password) {
                    var token = jwt.sign({ username: username, password: password }, process.env.SECRET, { expiresIn: 9999 });
                    res.send(token)
                } else {
                    res.send("Not Found");
                }
            } else {
                res.send("Not Found");
            }
        }
    })
});

// Register
app.post('/register', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            if (found) {
                res.send("Username Already Exists");
            } else {
                const newUser = User({
                    username: req.body.username,
                    password: req.body.password,
                    handle_forces: "",
                    done: "000000000000",
                    todo: "000000000000"
                });

                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.send("Failed");
                    } else {
                        var token = jwt.sign({ username: req.body.username, password: req.body.password }, process.env.SECRET, { expiresIn: 9999 });
                        res.send(token)
                    }
                })
            }
        }
    })
});

// Loading Profile
app.post('/load_profile', function (req, res) {
    jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
        if (!err) {
            User.findOne({ username: decoded.username }, function (er, doc) {
                if (er) {
                    res.send(false);
                } else {
                    res.send({
                        username: doc.username,
                        handle_forces: doc.handle_forces
                    });
                }
            })
        } else {
            res.send(false);
        }
    })
})

// Saving Profile
app.post('/profile', function (req, res) {
    jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
        if (!err) {
            User.findOneAndUpdate({ username: decoded.username }, { handle_forces: req.body.handle_forces }, function (er) {
                if (er) {
                    res.send(false);
                } else {
                    res.send(true);
                }
            })
        } else {
            res.send(false);
        }
    })
})

// Getting Data from CodeForces
function getPromise(handle) {
    return new Promise((resolve, reject) => {
        const url = "https://codeforces.com/api/user.status?handle=" + handle + "&from=1";
        var chunks = [];
        https.get(url, function (res) {
            res.on('data', (chunk) => {
                chunks.push(chunk);
            }).on('end', () => {
                chunks = Buffer.concat(chunks).toString();

                if (res.statusCode === 200) {
                    resolve(chunks);
                } else {
                    resolve(null)
                }
            })
        })
    });
}

// Processing Data
function process_data(data) {
    var solved = {
        "Divide and Conquer": 0,
        "Depth First Search": 0,
        "Graph": 0,
        "Greedy": 0,
        "Hashing": 0,
        "Shortest Path": 0,
        "Tree": 0,
        "Dynamic Programming": 0,
        "String": 0,
        "Sorting": 0,
        "Disjoint Set Union": 0,
        "Searching": 0
    };

    const map = {
        "divide and conquer": "Divide and Conquer",
        "dfs and similar": "Depth First Search",
        "graphs": "Graph",
        "greedy": "Greedy",
        "hashing": "Hashing",
        "shortest paths": "Shortest Path",
        "trees": "Tree",
        "dp": "Dynamic Programming",
        "strings": "String",
        "sortings": "Sorting",
        "dsu": "Disjoint Set Union",
        "binary search": "Searching"
    };

    for (let i = 0; i < data.length; i++) {
        let rating = Math.pow(1.5, data[i].problem.rating / 100) / 1000;
        if (isNaN(rating)) continue;

        data[i].problem.tags.forEach(tag => {
            if (map[tag]) {
                solved[map[tag]] += rating;
            }
        });
    }

    for (x in solved) {
        solved[x] = (Math.ceil(solved[x]) < 500) ? Math.ceil(solved[x]) : 500;
    }
    return solved;
}

// Refresh Data
app.post('/refresh', function (req, res) {
    jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
        if (!err) {
            User.findOne({ username: decoded.username }, function (er, doc) {
                if (er) {
                    res.send(false);
                } else {
                    var body;
                    async function makeRequest() {
                        let http_promise = getPromise(doc.handle_forces);
                        body = await http_promise;
                    }

                    (async function () {
                        await makeRequest();
                        if (body) {
                            body = JSON.parse(body);
                        }

                        var data = {
                            personal: {
                                username: doc.username,
                                handle_forces: doc.handle_forces
                            },
                            standard: {
                                done: doc.done,
                                todo: doc.todo
                            }
                        }

                        if (body) {
                            data.competetive = process_data(body.result)
                        } else {
                            data.competetive = null
                        }

                        res.send(data);
                    })();
                }
            })
        } else {
            res.send(false);
        }
    })
})

// Load Question Data
app.post('/load_question_data', function (req, res) {
    jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
        if (!err) {
            User.findOne({ username: decoded.username }, function (er, doc) {
                if (er) {
                    res.send(false);
                } else {
                    var data = {
                        done: doc.done
                    }
                    res.send(data);
                }
            })
        } else {
            res.send(false);
        }
    })
})

// Save Question Data
app.post('/save_question_data', function (req, res) {
    jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
        if (!err) {
            User.findOneAndUpdate({ username: decoded.username }, { done: req.body.done }, function (er) {
                if (er) {
                    res.send(false);
                } else {
                    res.send(true);
                }
            })
        } else {
            res.send(false);
        }
    })
})

// Starting Server
app.listen(process.env.PORT || 5000, function () {
    console.log("Server is Working");
})
