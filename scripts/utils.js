const path = require('path');
const fs = require('fs');
const yaml = require('yaml');

const MEMBER_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

const getMemberChoices = () => {
  memberFiles = fs.readdirSync(MEMBER_DIRECTORY);
  return memberFiles.map(file => {
    const memberMd = fs.readFileSync(`${MEMBER_DIRECTORY}/${file}`, { encoding: 'utf8' });
    const meta = yaml.parse(yaml.stringify(yaml.parseAllDocuments(memberMd)[0].contents));
    
    return { name: meta.name, value: meta.slug };
  });
}

module.exports = { getMemberChoices }