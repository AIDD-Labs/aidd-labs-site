const path = require('path');
const fs = require('fs');
const yaml = require('yaml');

const MEMBER_DIRECTORY = path.resolve(__dirname, `../src/pages/team`);
const CONTENT_DIRECTORY = path.resolve(__dirname, `../src/pages/content`);
const PROJECTS_DIRECTORY = path.resolve(__dirname, `../src/pages/projects`);

const getMemberChoices = () => {
  memberFiles = fs.readdirSync(MEMBER_DIRECTORY);
  return memberFiles.map(file => {
    const memberMd = fs.readFileSync(`${MEMBER_DIRECTORY}/${file}`, { encoding: 'utf8' });
    const meta = yaml.parse(yaml.stringify(yaml.parseAllDocuments(memberMd)[0].contents));
    
    return { name: meta.name, value: meta.slug };
  });
}

const getProjectChoices = () => {
  console.log('Loading projects from:', PROJECTS_DIRECTORY);
  
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.log('Projects directory does not exist!');
    return [];
  }
  
  const projectFolders = fs.readdirSync(PROJECTS_DIRECTORY);
  // console.log('Found items:', projectFolders);
  
  const projects = projectFolders
    .filter(folder => {
      // Skip hidden files like .DS_Store
      if (folder.startsWith('.')) return false;
      
      // Check if it's a directory
      const folderPath = path.join(PROJECTS_DIRECTORY, folder);
      const isDirectory = fs.statSync(folderPath).isDirectory();
      // console.log(`${folder}: ${isDirectory ? 'Directory' : 'Skipping'}`);
      return isDirectory;
    })
    .map(folder => {
      try {
        // Read the index.md file inside the folder
        const indexPath = path.join(PROJECTS_DIRECTORY, folder, 'index.md');
        
        if (!fs.existsSync(indexPath)) {
          // console.log(`No index.md in ${folder}`);
          return null;
        }
        
        const projectMd = fs.readFileSync(indexPath, { encoding: 'utf8' });
        const meta = yaml.parse(yaml.stringify(yaml.parseAllDocuments(projectMd)[0].contents));
        // console.log(`Parsed ${folder}:`, meta.title, meta.slug);
        return { name: meta.title, value: meta.slug };
      } catch (error) {
        // console.log(`Error parsing ${folder}:`, error.message);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // console.log('Final projects:', projects);
  return projects;
}

module.exports = { getMemberChoices, getProjectChoices }

// const getContentChoices = () => {
//   contentFolders = fs.readdirSync(CONTENT_DIRECTORY);
//   return contentFolders.map(folder => {
//     const contentFolder = fs.readFileSync(`${CONTENT_DIRECTORY}/${folder}/index.md`, { encoding: 'utf8' });
//     const meta = yaml.parse(yaml.stringify(yaml.parseAllDocuments(contentFolder)[0].contents));
//     
//     return { name: meta.title, value: meta.slug };
//   });
// }

// module.exports = { getContentChoices }