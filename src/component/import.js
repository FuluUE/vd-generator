import { join, parse } from 'path';
import { existsSync, mkdirsSync, readFileSync, readdirSync, copySync, readJSONSync } from 'fs-extra';
import resetIndex from './resetIndex';
import camelCase from '../utils/camelCase';

export default (srcProject, destProject, components) => {
    const srcProjectDir = join(srcProject.dir, 'src');
    const destProjectDir = join(destProject.dir, 'src');

    const comCfgPath = join(srcProject.dir, '.vd', 'components');
    const comPath = join(srcProjectDir, 'components');
    const conPath = join(srcProjectDir, 'routes');
    const reduxPath = join(srcProjectDir, 'services');
    const modelPath = join(srcProjectDir, 'models');

    const destComCfgPath = join(destProject.dir, '.vd', 'components');
    const destComPath = join(destProjectDir, 'components');
    const destConPath = join(destProjectDir, 'routes');
    const destReduxPath = join(destProjectDir, 'services');
    const destModelsPath = join(destProjectDir, 'models');
    if (existsSync(destComCfgPath)) mkdirsSync(destComCfgPath);
    const destComponents = [];
    readdirSync(destComCfgPath).forEach(item => {
        destComponents.push(item.toLocaleLowerCase());
    });
    Object.keys(components).forEach(filename => {
        if (components[filename] && destComponents.indexOf(filename.toLocaleLowerCase()) === -1) {
            const cfg = readJSONSync(join(comCfgPath, filename), 'utf8');
            copySync(join(comCfgPath, filename), join(destComCfgPath, filename));

            // begin copy components
            let componentPath = comPath;
            let destComponentPath = destComPath;
            if (cfg.group) {
                let paths = cfg.group.split('>').map(e => e.trim());
                paths.forEach(item => componentPath = join(componentPath, item));
                paths.forEach(item => destComponentPath = join(destComponentPath, item));
            }
            copySync(join(componentPath, cfg.name), join(destComponentPath, cfg.name));
            // end copy components


            if (cfg.type === 1) {
                copySync(join(conPath, `${cfg.name}.js`), join(destConPath, `${camelCase(cfg.name)}.js`));
                copySync(join(reduxPath, `${cfg.name}.js`), join(destReduxPath, `${camelCase(cfg.name)}.js`));
                copySync(join(modelPath, `${cfg.name}.js`), join(destModelsPath, `${camelCase(cfg.name)}.js`));
            }
        }
    });
    resetIndex({
        ...destProject
    });
}