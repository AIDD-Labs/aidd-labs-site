import * as path from 'path';
import * as inquirer from 'inquirer';
import { stringify } from 'yaml'

const TEAM_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter your full name:'
  },
  {
    type: 'input',
    name: 'title',
    message: 'Please enter your official title:'
  }
];

const init = async () => {
  const result = await inquirer.prompt(questions);
}

init ();
export {};