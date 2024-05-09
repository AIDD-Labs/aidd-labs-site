const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const PROJECT_DIRECTORY = path.resolve(__dirname, `../src/pages/projects`);

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the title of your project:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a title for your project.';
      }

      return true;
    }
  },
  {
    type: 'checkbox',
    name: 'topics',
    choices: [
      {name: 'risk',},
      {name: 'hazard',},
      {name: 'climate',},
      {name: 'impact',},
      {name: 'response',},
      {name: 'recovery',},
      {name: 'equity',},
    ],
    message: 'Please select the topic your project falls under (you may select 1 or more):',
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topic.';
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'status',
    choices: [ 'Current', 'Complete'],
    message: 'Please select the status of this project:'
  },
  {
    type: 'checkbox',
    name: 'methods',
    choices: [
      {name: 'Qualitative Methods',},
      {name: 'Statistical Inference',},
      {name: 'Mixed Methods',},
      {name: 'Surveys',},
      {name: 'Statistical Modeling',},
      {name: 'Risk Analysis',},
    ],
    message: 'Please select the methods your project uses (you may select 1 or more):',
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one method.';
      }

      return true;
    },
  },
  {
    type: 'checkbox',
    name: 'members',
    choices: utils.getMemberChoices(),
    message: 'Please select the team members who are part of this project:',
  }

];

const init = async () => {
  const result = await inquirer.prompt(questions);
  const { title, type, members, methods } = result;
  
  const date = new Date().toISOString().split('T')[0];
  const dasherizedTitle = title.toLowerCase().split(' ').join('-');
  const NEW_PROJECT_DIRECTORY = `${PROJECT_DIRECTORY}/${date}_${dasherizedTitle}`;
  const meta = {
    ...result, 
    createdDate: new Date().toISOString().split('T')[0]
  }
  const data = `---\n${yaml.stringify(result)}---`;
  fs.mkdirSync(NEW_PROJECT_DIRECTORY, { recursive: true });
  fs.writeFileSync(`${NEW_PROJECT_DIRECTORY}/index.md`, data);
}

init ();