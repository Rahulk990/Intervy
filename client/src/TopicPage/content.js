import React from 'react';
import Question from '../Others/questions';

function Content(prop) {
    if (prop.done == null) prop.load_data();

    return (
        <div className="row">
            <div className="mb-4 col">
                <div className="card shadow">
                    <div className="card-header text-center">
                        <h6 className="m-0 text-primary"> Popular Questions </h6>
                    </div>
                    <div className="card-body">
                        {prop.done == null ? (
                            <div className="text-center mb-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                                <Question
                                    done={prop.done}
                                    base={"company"}
                                    save_data={prop.save_data}
                                    question_data={prop.question_data} />
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;