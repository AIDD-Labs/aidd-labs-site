const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yaml');
const utils = require('./utils')

const CONTENT_DIRECTORY = path.resolve(__dirname, `../src/pages/content`);

const imageIsUploaded = (answers) => {
  return answers.hasImg;
};

const includesPDF = (answers) => {
  return answers.yesPDF;
};

const pdfIsUploaded = (answers) => {
  return answers.hasPDF;
};

const pdfNotMissing = (answers) => {
  return (answers.yesPDF && answers.hasPDF) || (!answers.yesPDF)
}

const questions = [
  {
    type: 'confirm',
    name: 'hasImg',
    message: "Have you uploaded a thumbnail image of this content to /public/img/?"
  },
  {
    type: 'input',
    name: 'imgName',
    when: (answers) => imageIsUploaded(answers),
    message: 'Please enter the filename of your Thumbnail Image including filetype (e.g.,): content-b-ier-nepal.png',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a filename for your Thumnail Image.';
      }

      return true;
    }
  },
  {
    type: 'confirm',
    name: 'yesPDF',
    when: (answers) => imageIsUploaded(answers),
    message: "Do you want to include a pdf for this content?"
  },
  {
    type: 'confirm',
    name: 'hasPDF',
    when: (answers) => includesPDF(answers),
    message: "Have you uploaded a PDF for this content to /public/files/?"
  },
  {
    type: 'input',
    name: 'pdfName',
    when: (answers) => pdfIsUploaded(answers),
    message: "Please enter the filename of your PDF including filetype (e.g.,): Knodel_et_al_2025_Global_DYFI_Analysis_AIDD.pdf",
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a filename for your PDF.';
      }

      return true;
    }
  },
  {
    type: 'list',
    name: 'type',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
    choices: [ 'blog', 'conference_paper', 'journal_article', 'presentation', 'podcast', 'software', 'report', 'visualization', 'video' ],
    message: 'Please select the type of your content:',
  },
  {
    type: 'input',
    name: 'title',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
    message: 'Please enter the title of your content:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a title for your content.';
      }

      return true;
    }
  },
  {
    type: 'input',
    name: 'description',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
    message: 'Please enter a 1-2 SENTENCE description for this piece:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a description.';
      }

      return true;
    }
  },
  {
    type: 'input',
    name: 'link',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
    message: 'Please enter the external URL for the original content:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a URL for your content.';
      }

      return true;
    }
  },
  {
    type: 'input',
    name: 'citation',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
    message: 'Please enter the full citation for your content:',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must enter a citation for your content.';
      }

      return true;
    }
  },
  {
    type: 'checkbox',
    name: 'topics',
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
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
    when: (answers) => imageIsUploaded(answers) && pdfNotMissing(answers),
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
  const { hasImg, yesPDF, hasPDF, title, type, topics, members, imgName, pdfName, description, link, citation } = result;
  if(hasImg){
    let embedPDF = '';
    if(yesPDF){
      if(hasPDF){
        embedPDF = 
`<iframe src="${pdfName}" width="100%" height="600px"></iframe>

<a href="${pdfName}" download class="btn">
  Download PDF
</a>`;
      } else {
        console.info(">>> Please upload a PDF for this content to /public/files/");
        return
      }
    }
    const date = new Date().toISOString().split('T')[0];
    const typeId = typeMap[type] || type[0];
    const dasherizedTitle = title.toLowerCase().split(' ').join('-');
    const slug = dasherizedTitle;
    const thumbnail =   `/img/${imgName}`;
    const NEW_CONTENT_DIRECTORY = `${CONTENT_DIRECTORY}/${typeId.toUpperCase()}${date}_${dasherizedTitle}`;
    const meta = {
      slug,
      title,
      createdDate: new Date().toISOString().split('T')[0],
      date: date,
      status: "draft",
      topics: topics,
      type: type,
      members: members,
      thumbnail: thumbnail,
      description: description,
      citation: citation,
      url: link,
      citationLink: link
    };

    // const data = `---\n${yaml.stringify(meta)}---\n\n ADD TEXT HERE\n${''}`;
    let data = `---\n${yaml.stringify(meta)}---\n\n`;
    data += embedPDF ? embedPDF + '\n\n' : '';
    data += 'ADD TEXT HERE\n';
    console.info(data)
    // fs.mkdirSync(NEW_CONTENT_DIRECTORY, { recursive: true });
    // fs.writeFileSync(`${NEW_CONTENT_DIRECTORY}/index.md`, data);
  } else {
    console.info(">>> Please upload a thumbnail of your content to /public/img/");
  }
}

init ();