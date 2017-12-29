import { join } from 'path';
import { removeSync } from 'fs-extra';
import resetIndex from './resetIndex';

export default (project, component) => {
    const dev = project.directory.development;
    const { name, type, group } = component;

    let filename = `${name}.json`;
    if (group) {
        filename = `${group.replace(/>/g, '-')}-${name}.json`;
    }

    removeSync(join(project.dir, '.vd', 'components', filename));

    let baseComponentPath = join(project.dir, 'src', 'components');

    if (group) {
        let paths = group.split('>').map(e => e.trim());
        paths.forEach(item => baseComponentPath = join(baseComponentPath, item));
    }

    removeSync(join(baseComponentPath, name));

    if (type === 1) {
        removeSync(join(project.dir, 'src', 'models', `${name}.js`));
        removeSync(join(project.dir, 'src', 'routes', `${name}.js`));
        removeSync(join(project.dir, 'src', 'services', `${name}.js`));
    }
    resetIndex({
        ...project
    });
}