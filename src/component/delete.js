import { join } from 'path';
import { removeSync } from 'fs-extra';
import resetIndex from './resetIndex';
import { getPaths } from '../utils';

export default (project, component) => {
    const { name, type, group } = component;

    const paths = getPaths({ dir: project.dir, group, name });

    removeSync(paths.vdConfig);
    removeSync(paths.component);

    if (type === 1 || type === '1') {
        removeSync(join(paths.model, `${name}.js`));
        removeSync(join(paths.route, `${name}.js`));
        removeSync(join(paths.service, `${name}.js`));
    }
    resetIndex({
        ...project
    });
}