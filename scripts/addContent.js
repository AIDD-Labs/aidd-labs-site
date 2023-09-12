const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const CONTENT_DIRECTORY = path.resolve(__dirname, `../src/pages/content`);

const questions = [
  {
    type: 'confirm',
    name: 'thumbnail',
    message: "Have you uploaded a thumbnail for the project named content-title.png to /public/img/?",
  },
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the title of your content:'
  },
  {
    type: 'input',
    name: 'authors',
    message: 'Please enter the authors of your content:'
  },
  {
    type: 'checkbox',
    name: 'members',
    choices: utils.getMemberChoices(),
    message: 'Please select the team members who created this content:',
  },
  {
    type: 'input',
    name: 'publication',
    message: 'Please enter the publication your content was published in (e.g., website, journal, etc.):'
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
    type: 'input',
    name: 'date',
    message: 'Please enter the date this content was published (YYYY-MM-DD):'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter a short, 1-2 sentence summary of this content:'
  },
  {
    type: 'input',
    name: 'citation',
    message: 'Please enter the citation for this content in APA format and without the URL:'
  },
  {
    type: 'input',
    name: 'citationLink',
    message: 'Please enter the link in the citation for this content:',
    default: ''
  },

];

const init = async () => {
  const typeMap = {
    'podcast': 'PD',
    'video': 'VD'
  }
  const result = await inquirer.prompt(questions);
  const { title, type, topics, date} = result;

  const createdDate = new Date().toISOString().split('T')[0];
  const typeId = typeMap[type] || type[0];
  const dasherizedTitle = title.toLowerCase().split(' ').join('-');
  const NEW_CONTENT_DIRECTORY = `${CONTENT_DIRECTORY}/${typeId.toUpperCase()}${date}_${dasherizedTitle}`;
  const meta = {
    ...result,
    slug: dasherizedTitle,
    createdDate: createdDate,
    status: "draft",
    thumbnail: `img/content-${dasherizedTitle}.png`
  };
  
  const data = `---\n${yaml.stringify(meta)}---`;
  fs.mkdirSync(NEW_CONTENT_DIRECTORY, { recursive: true });
  fs.writeFileSync(`${NEW_CONTENT_DIRECTORY}/index.md`, data);
}

init ();