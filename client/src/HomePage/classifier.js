import Questions from '../data_files/question_data';
import Topics from '../data_files/topic_data';

function classifier(data) {
    var done_data = data.standard.done;
    var comp_data = data.competetive;

    var overall_ds = {}
    var overall_algo = {}

    var user_ds = {}
    var user_algo = {}

    var analysis_ds = {}
    var analysis_algo = {}

    var total_ds = 0;
    var total_algo = 0;

    var total_user_ds = 0;
    var total_user_algo = 0;

    var total_analysis = 0;
    var total_analysis_ds = 0;
    var total_analysis_algo = 0;

    Questions.forEach(question => {
        question.topics.forEach(topic => {
            if (Topics[topic] === 1) {
                if (!overall_ds[topic]) {
                    overall_ds[topic] = question.rating;
                } else {
                    overall_ds[topic] += question.rating;
                }
                user_ds[topic] = 0;
            } else {
                if (!overall_algo[topic]) {
                    overall_algo[topic] = question.rating;
                } else {
                    overall_algo[topic] += question.rating;
                }
                user_algo[topic] = 0;
            }
        })
    })

    for (let i = 0; i < Questions.length; i++) {
        let question = Questions[i];
        question.topics.forEach(topic => {
            if (done_data[i] === '1') {
                if (Topics[topic] === 1) {
                    user_ds[topic] += question.rating;
                } else {
                    user_algo[topic] += question.rating;
                }
            }
        })
    }

    if (comp_data !== null) {
        Object.entries(comp_data).forEach(([key, value]) => {
            if (Topics[key] === 1) {
                if (!overall_ds[key]) {
                    overall_ds[key] = 500;
                    user_ds[key] = value;
                } else {
                    user_ds[key] += value;
                    overall_ds[key] += 500;
                }
            } else {
                if (!overall_algo[key]) {
                    overall_algo[key] = 500;
                    user_algo[key] = value;
                } else {
                    user_algo[key] += value;
                    overall_algo[key] += 500;
                }
            }
        })
    }

    Object.entries(overall_ds).forEach(([key, value]) => {
        analysis_ds[key] = Math.floor(100 * user_ds[key] / value);
        total_ds += value;
        total_user_ds += user_ds[key];
    })
    Object.entries(overall_algo).forEach(([key, value]) => {
        analysis_algo[key] = Math.floor(100 * user_algo[key] / value);
        total_algo += value;
        total_user_algo += user_algo[key];
    })

    total_analysis = Math.floor(100 * (total_user_ds + total_user_algo) / (total_ds + total_algo));
    total_analysis_ds = Math.floor(100 * total_user_ds / total_ds);
    total_analysis_algo = Math.floor(100 * total_user_algo / total_algo);

    return [total_analysis, total_analysis_ds, analysis_ds, total_analysis_algo, analysis_algo];
}

export default classifier;