import { join } from 'path';
import { mkdirsSync } from 'fs-extra';
import camelCase from './camelCase';


export { camelCase };

export const getPaths = ({ dir, name, group }) => {
    let route = join(dir, 'src', 'routes');
    let service = join(dir, 'src', 'services');
    let model = join(dir, 'src', 'models');
    let vdConfig = join(dir, '.vd', 'components');

    mkdirsSync(vdConfig);

    if (group) {
        let paths = group.split('>').map(e => e.trim());

        paths.forEach(item => component = join(component, item));
        paths.forEach(item => route = join(route, item));
        paths.forEach(item => service = join(service, item));
        paths.forEach(item => model = join(model, item));

        component = join(component, name);

        vdConfig = join(config, `${group.replace(/>/g, '-')}-${camelCase(name)}.json`);
    } else {
        vdConfig = join(config, `${camelCase(name)}.json`);
    }
    return { component, route, service, model, vdConfig };
}