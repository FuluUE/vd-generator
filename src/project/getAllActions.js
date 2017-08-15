import path from 'path';
import fs from 'fs';

export default (reduxPath) => {
  const actions = [];
  if (fs.existsSync(reduxPath)) {
    const files = fs.readdirSync(reduxPath);
    files.forEach(fileName => {
      const filePath = path.join(reduxPath, fileName);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        if (fileName !== 'sagas.js' && fileName !== 'reducers.js') {
          const content = fs.readFileSync(filePath, 'utf8');
          const name = path.parse(fileName).name;
          const pattern = /\('(.*)?'/g;
          let res;
          while ((res = pattern.exec(content)) != null) {
            // result.push({ name: res[3], comment: res[2] });
            actions.push(`${name} ${res[1]}`);
          }
        }
      }
    });
  }
  return actions;
}
