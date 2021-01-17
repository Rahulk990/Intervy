import React from 'react';

function Question(prop) {
    var done = prop.done;
    var base = prop.base;

    function create_tags(data, name) {
        return (
            <a key={data + name} className="tag_boxes btn btn-sm btn-primary shadow" href={`/${base}/${data}`}> {data} </a>
        );
    }

    function create_button(id) {
        var new_done = done;
        console.log(done);

        if (id + 1 > new_done.length) {
            var extra = id - new_done.length + 1;
            while (extra--) new_done += '0';
            prop.save_data(new_done);
        }

        if (done[id] === '1') {
            return (
                <div className="col-lg-2 text-center">
                    <p className="tag_boxes btn btn-sm btn-danger shadow mb-0"
                        onClick={() => {
                            new_done = done.slice(0, id) + "0" + done.slice(id + 1);
                            console.log(new_done);
                            prop.save_data(new_done);
                        }} > Mark as Undone </p>
                </div>
            );
        } else {
            return (
                <div className="col-lg-2 text-center">
                    <p className="tag_boxes btn btn-sm btn-success shadow mb-0"
                        onClick={() => {
                            new_done = done.slice(0, id) + "1" + done.slice(id + 1);
                            console.log(new_done);
                            prop.save_data(new_done);
                        }} > Mark as Done </p>
                </div>
            );
        }
    }

    function create_question(data) {
        return (
            <div key={data.title}>
                <div className="row">
                    <div className="col-lg-5">
                        <a className="question_links" href={data.link}>{data.title}</a>
                    </div>

                    <div className="col-lg-5">
                        {data.tags.map(create_tags, data.title)}
                    </div>

                    {create_button(data.id - 1)}
                </div >
                <hr className="mt-1 mb-1" />
            </div >
        );
    }

    return (
        <div>
            {prop.question_data.map(create_question)}
        </div>
    );
}

export default Question;