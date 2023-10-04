import path from "path";
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync } from 'fs'
import { stringify } from 'yaml';
import inquirer from 'inquirer';
import { getMemberChoices } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    },
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
    choices: getMemberChoices(),
    message: 'Please select the team members who created this content:',
  }
];

const init = async () => {
  const typeMap = {
    'podcast': 'PD',
    'video': 'VD'
  }
  const result = await inquirer.prompt(questions);
  const { title, type, topics} = result;
  
  const date = new Date().toISOString().split('T')[0];
  const typeId = typeMap[type] || type[0];
  const dasherizedTitle = title.toLowerCase().split(' ').join('-');
  const NEW_CONTENT_DIRECTORY = `${CONTENT_DIRECTORY}/${typeId.toUpperCase()}${date}_${dasherizedTitle}`;

  const data = `---\n${stringify(result)}---`;
  mkdirSync(NEW_CONTENT_DIRECTORY, { recursive: true });
  writeFileSync(`${NEW_CONTENT_DIRECTORY}/index.md`, data);
}

init ();