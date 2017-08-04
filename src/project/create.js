import { join, resolve, dirname } from 'path';
import fs from 'fs-extra';

export default function createProject({ projectPath, config }) {
    try {
        const basePath = join(__dirname, '../../boilerplates/project/react');
        let dirConfig = config.directory || {};
        fs.copySync(join(basePath, 'src'), projectPath);

        dirConfig = config.directory.development;
        dirConfig.source = dirConfig.envName;
        fs.writeFileSync(join(projectPath, '.vd', 'project.json'), JSON.stringify(config, null, 2));
        const appPath = join(projectPath, 'src', 'App.js');
        // HashRouter as Router,
        if (config.routerType !== 'BrowserRouter') {
            const str = fs.readFileSync(appPath, 'utf8');
            fs.writeFileSync(appPath, str.replace('BrowserRouter', 'HashRouter'))
        }

    } catch (error) {
        fs.removeSync(projectPath);
        throw error;
    }
}