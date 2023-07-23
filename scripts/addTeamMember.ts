import * as path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import * as inquirer from 'inquirer';
import { stringify } from 'yaml'

const TEAM_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

const questions = [
  {
    type: 'confirm',
    name: 'begin',
    message: "Have you uploaded a headshot of yourself named member-firstname-lastname.png to /public/img/?",
    validate(answer) {
      if (answer == 'No') {
        return 'Please upload your headshot then return to this menu.';
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'name',
    message: '[1/8] Please enter your full name (First and Last):',
    validate(answer) {
      if (answer.length < 1) {
        return 'You must enter your first and last name.';
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'createdDate',
    message: '[2/8] Please enter todays date (YYYY-MM-DD):',
    validate(value) {
      const pass = value.match(
          /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid date';
    },
  },
  {
    type: 'list',
    name: 'title',
    choices: [ 'Postdoctoral Fellow', 'PhD Researcher', 'Masters Researcher', 'Undergraduate Researcher'],
    message: '[3/8] Please select your role in AIDD labs:'
  },
  {
    type: 'list',
    name: 'type',
    choices: [ 'internal', 'external'],
    message: '[5/8] Are you an internal or external AIDD labs team member?'
  },
  {
    type: 'input',
    name: 'affiliation',
    message: '[4/8] Please enter your affiliation(s), limit to 2 max:'
  },
  {
    type: 'input',
    name: 'linkedin',
    message: '[6/8] Please enter your LinkedIn URL (if you have one):'
  },
  {
    type: 'input',
    name: 'twitter',
    message: '[7/8] Please enter your Twitter URL (if you have one):'
  },
  {
    type: 'input',
    name: 'personalWebsite',
    message: '[8/8] Please enter your Personal Website URL (if you have one):'
  },
  // {
  //   type: 'editor',
  //   name: 'bio',
  //   message: 'Please write a short bio of at least 3 sentences.',
  // },
];

const init = async () => {
  const result = await inquirer.prompt(questions);

  const { name, createdDate, title, affiliation, linkedin, twitter, personalWebsite } = result;

  const slug = name.toLowerCase().split(' ').join('-');
  const img =   `/img/member-${slug}.png`
  const mdResult = { slug, name, createdDate, title, affiliation, img, linkedin, twitter, personalWebsite };

  writeFileSync(`${TEAM_DIRECTORY}/${slug}.md`, stringify(mdResult));
}

init ();
export {};