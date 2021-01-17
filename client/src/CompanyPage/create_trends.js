import Topics from '../data_files/topic_data';
import Question_Set from '../data_files/question_data';
import { extract_topics } from '../data_files/extract';

function create_trends(topics) {
    var map = new Map();
    for (let i = 0; i < topics.length; i++) {
        let rating = topics[i].rating;

        topics[i].tags.forEach(tag => {
            if (map.has(tag))
                map.set(tag, map.get(tag) + rating);
            else
                map.set(tag, rating);
        });
    }

    var asked_ds = [];
    var asked_algo = [];

    for (let [key, value] of map.entries()) {
        if (Topics[key] === 1) {
            asked_ds.push({
                name: key,
                value: value
            });
        } else {
            asked_algo.push({
                name: key,
                value: value
            })
        }
    }

    var sum = 0;
    asked_ds.forEach(elt => { sum += elt.value; })
    asked_ds.forEach(elt => { elt.value = Math.floor(100 * elt.value / sum); })
    asked_ds.sort(function (val1, val2) { return val2.value - val1.value });

    sum = 0;
    asked_algo.forEach(elt => { sum += elt.value; })
    asked_algo.forEach(elt => { elt.value = Math.floor(100 * elt.value / sum); })
    asked_algo.sort(function (val1, val2) { return val2.value - val1.value });

    var final_ds = [];
    var final_algo = [];

    for (let i = 0; i < 6; i++) {
        if (i < asked_ds.length) final_ds.push(asked_ds[i]);
        if (i < asked_algo.length) final_algo.push(asked_algo[i]);
    }

    return [final_ds, final_algo];
}

function progress_value(data, done, company_name) {
    var done_data = done;
    var comp_data = data.competetive;

    var overall = {}
    var user = {}
    var total = 0;
    var user_total = 0;

    Question_Set.forEach(question => {
        question.companies.forEach(company => {
            if (company === company_name) {
                question.topics.forEach(topic => {
                    overall[topic] = 1;
                    user[topic] = 1;
                })
            }
        })
    })

    Question_Set.forEach(question => {
        question.topics.forEach(topic => {
            if (overall[topic]) {
                overall[topic] += question.rating;
                if (question.id < done_data.length && done_data[question.id - 1] === '1')
                    user[topic] += question.rating;
            }
        })
    })

    if (comp_data !== null) {
        Object.entries(comp_data).forEach(([key, value]) => {
            if (overall[key]) {
                user[key] += value;
                overall[key] += 520;
            }
        })
    }

    var topics = extract_topics(company_name);
    var map = new Map();
    for (let i = 0; i < topics.length; i++) {
        let rating = topics[i].rating;

        topics[i].tags.forEach(tag => {
            if (map.has(tag))
                map.set(tag, map.get(tag) + rating);
            else
                map.set(tag, rating);
        });
    }

    Object.entries(overall).forEach(([key, value]) => {
        total += (value * map.get(key));
        user_total += (user[key] * map.get(key));
    })

    return Math.floor(100 * (user_total) / (total));
}

export { create_trends };
export { progress_value };