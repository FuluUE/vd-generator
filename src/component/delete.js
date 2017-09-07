import { join } from 'path';
import { removeSync } from 'fs-extra';
import reduxReset from './reduxReset';
import resetIndex from './resetIndex';

export default (project, component) => {
    const dev = project.directory.development;
    const { name, type } = component;
    removeSync(join(project.dir, '.vd', 'components', `${name}.json`));
    removeSync(join(project.dir, dev.envName, dev.component, name));
    if (type === 1) {
        removeSync(join(project.dir, dev.envName, dev.container, `${name}.js`));
        removeSync(join(project.dir, dev.envName, dev.redux, `${name}.js`));
        reduxReset(join(project.dir, dev.envName, dev.redux));
    }
    resetIndex({
        ...project,
        directory: {
            source: dev.envName,
            component: dev.component,
        }
    });
}