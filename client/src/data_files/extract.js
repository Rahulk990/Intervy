import data from './question_data';

function extract_topics(key) {
    var extracted_data = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].companies.length; j++) {
            if (data[i].companies[j] === key) {
                extracted_data.push({
                    id: data[i].id,
                    title: data[i].name,
                    link: data[i].link,
                    tags: data[i].topics,
                    rating: data[i].rating
                });
            }
        }
    }
    return extracted_data;
}

function extract_companies(key) {
    var extracted_data = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].topics.length; j++) {
            if (data[i].topics[j] === key) {
                extracted_data.push({
                    id: data[i].id,
                    title: data[i].name,
                    link: data[i].link,
                    tags: data[i].companies
                });
            }
        }
    }
    return extracted_data;
}

export { extract_topics, extract_companies };