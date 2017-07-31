import { join, parse } from 'path';
import { existsSync, statSync, mkdirsSync, writeFileSync, readFileSync, readdirSync } from 'fs-extra';
import render from '../utils/mustache';

export default (reduxPath) => {
  const files = readdirSync(reduxPath);
  const sagas = [];
  const reducerImport = [];
  const reducerContent = [];
  const sagaImport = [];
  const sagaContent = [];
  files.forEach(fileName => {
    const filePath = join(reduxPath, fileName);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      if (fileName !== 'sagas.js' && fileName !== 'reducers.js') {
        const { name, ext } = parse(fileName);
        if (ext === '.js') {
          reducerImport.push(`import ${name} from './${name}';`);
          reducerContent.push(name);
          sagaImport.push(`import { watchSagas as ${name}Sagas } from './${name}';`);
          sagaContent.push(`...${name}Sagas`);
        }
      }
    }
  });

  writeFileSync(join(reduxPath, 'reducers.js'),
    render('redux/reducerIndex.mustache',
      {
        importContent: reducerImport.join('\n'),
        content: reducerContent.join(',\n  ')
      })
  );
  writeFileSync(join(reduxPath, 'sagas.js'),
    render('redux/sagaIndex.mustache',
      {
        importContent: sagaImport.join('\n'),
        content: sagaContent.join(',\n    ')
      })
  );
}
