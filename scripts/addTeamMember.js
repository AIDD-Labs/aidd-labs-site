const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');

const TEAM_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

const imageIsUploaded = (answers) => {
  return answers.hasImg;
};

const questions = [
  {
    type: 'confirm',
    name: 'hasImg',
    message: "Have you uploaded a headshot of yourself named member-firstname-lastname.png to /public/img/?"
  },
  {
    type: 'input',
    name: 'name',
    when: imageIsUploaded,
    message: '[1/8] Please enter your full name (First and Last):',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter your first and last name.';
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'title',
    when: imageIsUploaded,
    choices: [ 'Postdoctoral Fellow', 'PhD Researcher', 'Masters Researcher', 'Undergraduate Researcher'],
    message: '[2/8] Please select your role in AIDD labs:'
  },
  {
    type: 'list',
    name: 'type',
    when: imageIsUploaded,
    choices: [ 'current', 'alumni', 'external'],
    message: '[3/8] Are you a current, alumni, or external AIDD labs team member?'
  },
  {
    type: 'input',
    name: 'affiliation',
    when: imageIsUploaded,
    message: '[4/8] Please enter your affiliation(s), limit to 2 max:'
  },
  {
    type: 'input',
    name: 'linkedin',
    when: imageIsUploaded,
    message: '[5/8] Please enter your LinkedIn URL (if you have one):'
  },
  {
    type: 'input',
    name: 'twitter',
    when: imageIsUploaded,
    message: '[6/8] Please enter your Twitter URL (if you have one):'
  },
  {
    type: 'input',
    name: 'personalWebsite',
    when: imageIsUploaded,
    message: '[7/8] Please enter your Personal Website URL (if you have one):'
  }
];

const init = async () => {
  const result = await inquirer.prompt(questions);

  const { hasImg, name, title, affiliation, linkedin, twitter, personalWebsite, type } = result;

  if(hasImg) {
    const slug = name.toLowerCase().split(' ').join('-');
    const img =   `/img/member-${slug}.png`
    const meta = {
      slug,
      name,
      createdDate: new Date().toISOString().split('T')[0],
      type,
      title,
      affiliation,
      img,
      linkedin,
      twitter,
      personalWebsite
    };
  
    const data = `---\n${yaml.stringify(meta)}---\n\n## Bio\n${''}`;
    fs.writeFileSync(`${TEAM_DIRECTORY}/${slug}.md`, data);
  } else {
    console.info(">>> Please upload a headshot of yourself named member-firstname-lastname.png to /public/img/");
  }
}

init ();