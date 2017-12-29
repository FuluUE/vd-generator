import { join, parse } from 'path';
import { existsSync, mkdirsSync, readFileSync, readdirSync, copySync, readJSONSync } from 'fs-extra';
import resetIndex from './resetIndex';
import { camelCase, getPaths } from '../utils';

export default (srcProject, destProject, components) => {
    const destComponents = [];
    const destComCfgPath = join(destProject.dir, '.vd', 'components');
    readdirSync(destComCfgPath).forEach(item => {
        destComponents.push(item.toLocaleLowerCase());
    });
    Object.keys(components).forEach(filename => {
        if (components[filename] && destComponents.indexOf(filename.toLocaleLowerCase()) === -1) {
            const cfg = readJSONSync(join(srcProject.dir, '.vd', 'components', filename), 'utf8');

            const paths = getPaths({ dir: srcProject.dir, group: cfg.group, name: cfg.name });
            const destPaths = getPaths({ dir: destProject.dir, group: cfg.group, name: cfg.name });

            copySync(paths.vdConfig, destPaths.vdConfig);
            copySync(paths.component, destPaths.component);

            if (cfg.type === 1 || cfg.type === '1') {
                copySync(join(paths.route, `${cfg.name}.js`), join(destPaths.route, `${camelCase(cfg.name)}.js`));
                copySync(join(paths.model, `${cfg.name}.js`), join(destPaths.model, `${camelCase(cfg.name)}.js`));
                copySync(join(paths.service, `${cfg.name}.js`), join(destPaths.service, `${camelCase(cfg.name)}.js`));
            }
        }
    });
    resetIndex({
        ...destProject
    });
}