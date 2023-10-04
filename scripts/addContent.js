const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const CONTENT_DIRECTORY = path.resolve(__dirname, `../src/pages/content`);

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the title of your content:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a title for your content.';
      }

      return true;
    }
  },
  {
    type: 'list',
    name: 'type',
    choices: [ 'blog', 'conference_paper', 'journal_article', 'presentation', 'podcast', 'software', 'report', 'visualization', 'video' ],
    message: 'Please select the type of your content:',
  },
  {
    type: 'checkbox',
    name: 'topics',
    choices: [
      {name: 'risk',},
      {name: 'impact',},
      {name: 'recovery',},
      {name: 'equity',},
    ],
    message: 'Please select the topic your content falls under (you may select 1 or more):',
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topic.';
      }

      return true;
    },
  },
  {
    type: 'checkbox',
    name: 'members',
    choices: utils.getMemberChoices(),
    message: 'Please select the team members who created this content:',
  }

];

const init = async () => {
  const typeMap = {
    'podcast': 'PD',
    'video': 'VD'
  }
  const result = await inquirer.prompt(questions);
  const { title, type } = result;
  
  const date = new Date().toISOString().split('T')[0];
  const typeId = typeMap[type] || type[0];
  const dasherizedTitle = title.toLowerCase().split(' ').join('-');
  const NEW_CONTENT_DIRECTORY = `${CONTENT_DIRECTORY}/${typeId.toUpperCase()}${date}_${dasherizedTitle}`;
  const meta = {
    ...result, 
    createdDate: new Date().toISOString().split('T')[0]
  }
  const data = `---\n${yaml.stringify(result)}---`;
  fs.mkdirSync(NEW_CONTENT_DIRECTORY, { recursive: true });
  fs.writeFileSync(`${NEW_CONTENT_DIRECTORY}/index.md`, data);
}

init ();