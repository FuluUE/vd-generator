import path from 'path';
import fs from 'fs';

export default (project) => {
    const { dir, directory } = project;
    if (!fs.existsSync(dir)) return console.error('project dir not exist');
    const componentCfgPath = path.join(dir, '.vd', 'components');
    if (fs.existsSync(componentCfgPath)) {
        const components = fs.readdirSync(componentCfgPath);
        let str = '';
        components.forEach(item => {
            let name = path.parse(item).name;
            if (project.type !== 'library') {
                name = `${name[0].toUpperCase()}${name.substr(1)}`
            }
            str += `export { default as ${name} } from './${name}';\n`;
        });
        const componentPath = path.join(dir, directory.source, directory.component);
        fs.writeFileSync(path.join(componentPath, 'index.js'), str);
    }
}