const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const PROJECT_DIRECTORY = path.resolve(__dirname, `../src/pages/projects`);

const imageIsUploaded = (answers) => {
  return answers.hasImg;
};

const questions = [
  // {
  //   type: 'checkbox',
  //   name: 'content',
  //   choices: utils.getContentChoices(),
  //   message: 'Please select the team members who are part of this project:',
  // },
  {
    type: 'confirm',
    name: 'hasImg',
    message: "Have you uploaded a thumbnail image of this project to /public/img/?"
  },
  {
    type: 'input',
    name: 'imgName',
    when: imageIsUploaded,
    message: 'Please enter the filename of your Thumbnail Image including filetype (e.g.,): proj-dispatcher-ai-bots.jpg',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a filename for your Thumnail Image.';
      }

      return true;
    }
  },
  {
    type: 'input',
    name: 'title',
    when: imageIsUploaded,
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
    when: imageIsUploaded,
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
    type: 'checkbox',
    name: 'methods',
    when: imageIsUploaded,
    choices: [
      {name: 'qualitative-methods',},
      {name: 'statistical-inference',},
      {name: 'mixed-methods',},
      {name: 'surveys',},
      {name: 'statistical-modeling',},
      {name: 'risk-analysis',},
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
    name: 'locations',
    when: imageIsUploaded,
    choices: [
      {name: 'nepal',},
      {name: 'haiti',},
      {name: 'new-zealand',},
      {name: 'italy',},
      {name: 'global',},
      {name: 'united-states',},
    ],
    message: 'Please select the locations where your project is based:',
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one location.';
      }

      return true;
    },
  },
  {
    type: 'checkbox',
    name: 'members',
    when: imageIsUploaded,
    choices: utils.getMemberChoices(),
    message: 'Please select the team members who are part of this project:',
  },
  {
    type: 'input',
    name: 'description',
    when: imageIsUploaded,
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
  const { hasImg, imgName, title, type, members, methods, topics, locations, description } = result;
  
  if(hasImg){
    const createdDate = new Date().toISOString().split('T')[0];
    const date = `${createdDate.slice(0, 4)} - Present`;
    const dasherizedTitle = title.toLowerCase().split(' ').join('-');
    const slug = dasherizedTitle;
    const thumbnail =   `/img/${imgName}`;
    const NEW_PROJECT_DIRECTORY = `${PROJECT_DIRECTORY}/${createdDate}_${dasherizedTitle}`;
    const meta = {
      slug,
      title,
      createdDate: createdDate,
      date: date,
      status: "current",
      topics: topics,
      methods: methods,
      members: members,
      locations: locations,
      thumbnail: thumbnail,
      description: description,
    }
    const data = `---\n${yaml.stringify(meta)}---\n\n ADD TEXT HERE\n${''}`;
    fs.mkdirSync(NEW_PROJECT_DIRECTORY, { recursive: true });
    fs.writeFileSync(`${NEW_PROJECT_DIRECTORY}/index.md`, data);
  }else {
    console.info(">>> Please upload a thumbnail of your project to /public/img/");
  }
}

init ();