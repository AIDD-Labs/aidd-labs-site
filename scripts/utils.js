import path from "path";
import { readFileSync } from 'fs'
import { stringify } from 'yaml';

const MEMBER_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

export const getMemberChoices = () => {
  memberFiles = fs.readdirSync(MEMBER_DIRECTORY);
  return memberFiles.map(file => {
    const memberMd = readFileSync(`${MEMBER_DIRECTORY}/${file}`, { encoding: 'utf8' });
    const meta = yaml.parse(stringify(yaml.parseAllDocuments(memberMd)[0].contents));
    
    return { name: meta.name, value: meta.slug };
  });
}