import * as path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import * as inquirer from 'inquirer';
import { stringify } from 'yaml'


const CONTENT_DIRECTORY = path.resolve(__dirname, `../src/pages/content`);

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the title of your content:'
  },
  {
    type: 'list',
    name: 'type',
    choices: [ 'blog', 'conference_paper', 'journal_article', 'presentation', 'podcast', 'software', 'report', 'visualization', 'video' ],
    message: 'Please select the type of your content:'
  },
  {
    type: 'input',
    name: 'date',
    message: 'Please enter the date of your content (YYYY-MM-DD):'
  }
];

const init = async () => {
  const typeMap = {
    'podcast': 'PD',
    'video': 'VD'
  }
  const result = await inquirer.prompt(questions);
  const { title, type, date } = result;

  const typeId = typeMap[type] || type[0];
  const dasherizedTitle = title.toLowerCase().split(' ').join('-');
  const NEW_CONTENT_DIRECTORY = `${CONTENT_DIRECTORY}/${typeId.toUpperCase()}${date}_${dasherizedTitle}`;

  mkdirSync(NEW_CONTENT_DIRECTORY, { recursive: true });
  writeFileSync(`${NEW_CONTENT_DIRECTORY}/index.md`, stringify(result));
}

init ();
export {};