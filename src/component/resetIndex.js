import path from 'path';
import fs from 'fs-extra';

function read(filepath, componentPath, parentPath) {
    const { name, ext } = path.parse(filepath);
    if (fs.statSync(filepath).isDirectory()) {
        const components = fs.readdirSync(filepath);
        return components.map(item => read(path.join(filepath, item), componentPath, filepath)).join('\n');
    } else if (name !== 'index' && ext === '.js') {
        return `export { default as ${name} } from './${path.relative(componentPath, parentPath).replace(/\\/g, '/')}';`;
    }
}

export default ({ dir, type }) => {
    if (!fs.existsSync(dir)) return console.error('project dir not exist');
    const componentPath = path.join(dir, 'src', 'components');
    if (fs.existsSync(componentPath)) {
        const components = fs.readdirSync(componentPath);
        fs.writeFileSync(path.join(componentPath, 'index.js'), read(componentPath, componentPath));
    }
}