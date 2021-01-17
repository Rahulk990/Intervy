// Find and Replace questions with q_name
// Find and Replace companies with c_tags
// Find and Replace Topics with t_tags
// Find and Replace Link with link
// Then goto: https://beautifier.io/

var _ = require("lodash");
const company_data = []
var newdata = [];

for(var i=0;i<company_data.length;i++)
{
  company_data[i].questions = _.startCase(_.lowerCase(company_data[i].questions));

  company_data[i].companies = (company_data[i].companies).split(',');
  for(var j=0;j<company_data[i].companies.length;j++)
    company_data[i].companies[j] = _.startCase(_.lowerCase(company_data[i].companies[j]));

  company_data[i].Topics = (company_data[i].Topics).split(',');
  for (j=0;j<company_data[i].Topics.length;j++)
      company_data[i].Topics[j] = _.startCase(_.lowerCase(company_data[i].Topics[j]));
  
  company_data[i].votes = 0;

  newdata.push(company_data[i]);
}

var json = JSON.stringify(newdata);
console.log(json);
