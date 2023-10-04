import path from "path";
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs'
import { stringify, parse, parseAllDocuments } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMBER_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);

export function getMemberChoices() {
  const memberFiles = readdirSync(MEMBER_DIRECTORY);
  
  return memberFiles.map(file => {
    const memberMd = readFileSync(`${MEMBER_DIRECTORY}/${file}`, { encoding: 'utf8' });
    const meta = parse(stringify(parseAllDocuments(memberMd)[0].contents));
    
    return { name: meta.name, value: meta.slug };
  });
}