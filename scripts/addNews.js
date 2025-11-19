const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const NEWS_DIRECTORY = path.resolve(__dirname, `../src/pages/news`);

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the title of your news item:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a title for your news item.';
      }

      return true;
    }
  },
  {
    type: 'checkbox',
    name: 'members',
    choices: utils.getMemberChoices(),
    message: 'Please select the team members who are part of this project:',
  },
  {
    type: 'input',
    name: 'date',
    message: 'Please enter the date of your news item in YYYY-MM-DD format:',
  },
  {
    type: 'list',
    name: 'type',
    choices: [ 'conference', 'award', 'workshop'],
    message: 'Please select the type of your news item:',
  },
  {
    type: 'input',
    name: 'url',
    message: 'If there is a url, please enter:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter a 1-2 paragraph description for this piece.',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'Your description is too short.';
      }

      return true;
    }
  }

];

const init = async () => {
  const result = await inquirer.prompt(questions);
  const {title, type, members, date, url, description } = result;
  
    const createdDate = new Date().toISOString().split('T')[0];
    const dasherizedTitle = title.toLowerCase().split(' ').join('-');
    const slug = dasherizedTitle;
    const NEW_NEWS_DIRECTORY = `${NEWS_DIRECTORY}/${createdDate}_${dasherizedTitle}`;
    const meta = {
      slug,
      title,
      createdDate: createdDate,
      date: date,
      status: "draft",
      type: type,
      url: url,
      members: members,
      description: description,
    }
    const data = `---\n${yaml.stringify(meta)}---\n\n ADD NEWS TEXT HERE\n\n you can upload an image into the same folder than reference it using the following: \n ![](./filename.jpg)
<em> add caption here </em> \n Make sure you don't use a .jpeg! it doesn't work for some reason.
${''}`;
    fs.mkdirSync(NEW_NEWS_DIRECTORY, { recursive: true });
    fs.writeFileSync(`${NEW_NEWS_DIRECTORY}/index.md`, data);
    console.log(`New project created at ${NEW_NEWS_DIRECTORY}`);
}

init ();