import { join, resolve, dirname } from 'path';
import fs from 'fs-extra';

export default function createProject({ projectPath, config }) {
    try {
        if (config.type === 'library') {
            const basePath = join(__dirname, '../../boilerplates/project/library');
            fs.copySync(basePath, projectPath);
            fs.writeFileSync(join(projectPath, '.vd', 'project.json'), JSON.stringify(config, null, 2));
        } else {
            const basePath = join(__dirname, '../../boilerplates/project', config.type);
            let dirConfig = config.directory || {};
            console.log(basePath, projectPath);
            if (!fs.existsSync(basePath)) {
                return console.error(`${basePath} not found`);
            }
            // fs.copy(basePath, projectPath, (err) => {
            //     console.log(err);
            // });
            // fs.mkdirsSync(projectPath);
            fs.copySync(basePath, projectPath);

            dirConfig = config.directory.development;
            dirConfig.source = dirConfig.envName;
            const appPath = join(projectPath, 'src', 'App.js');
            fs.writeFileSync(join(projectPath, '.vd', 'project.json'), JSON.stringify(config, null, 2));
            if (config.routerType !== 'BrowserRouter') {
                const str = fs.readFileSync(appPath, 'utf8');
                fs.writeFileSync(appPath, str.replace('BrowserRouter', 'HashRouter'))
            }
        }
    } catch (error) {
        // fs.removeSync(projectPath);
        throw error;
    }
}