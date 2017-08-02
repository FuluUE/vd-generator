import _ from 'lodash';
import { join } from 'path';
import { existsSync, mkdirsSync, writeFileSync, readFileSync } from 'fs-extra';
import { camelCase } from '../utils';
import reduxReset from './reduxReset';
import render from '../utils/mustache';

export default function createComponent(config, opts = { type: 0 }) {
    if (opts.type === 0 || opts.type === 1) {
        const name = _.upperFirst(camelCase(opts.name));
        const camelCaseName = camelCase(name);
        opts.camelCaseName = camelCaseName;
        const componentPath = join(config.dir, config.directory.source, config.directory.component, name);
        mkdirsSync(componentPath);
        const vdConfigPath = join(config.dir, '.vd', 'components');
        mkdirsSync(vdConfigPath);

        writeFileSync(join(componentPath, 'index.js'),
            render('component/index.mustache',
                { name: name })
        );

        const lifecycle = {};
        const module = {};
        const firstLoad = [];

        _.forEach(opts.lifecycle, (item) => lifecycle[item] = true);
        _.forEach(opts.module, (item) => {
            module[item] = camelCaseName;
            if (item !== 'style') {
                mkdirsSync(join(componentPath, config.directory[item] || item));
            }
        });

        if (opts.type === 1) {
            const reduxPath = join(config.dir, config.directory.source, config.directory.redux);
            mkdirsSync(reduxPath);
            const actionGroups = {};
            const exportActions = [];
            const mapStateToProps = [];

            const apiPath = join(config.dir, config.directory.source, config.directory.config, 'api.js');
            let apiContent = readFileSync(apiPath, 'utf8');
            apiContent = apiContent.replace('export default', '').replace(';', '');
            apiContent = JSON.parse(apiContent);
            apiContent[opts.sagas[0].requestVarName] = opts.sagas[0].url;
            writeFileSync(apiPath, `export default ${JSON.stringify(apiContent, null, 2)};`);

            opts.sagas.forEach(item => {
                const actionType = camelCase(item.actionName);
                writeFileSync(join(reduxPath, `${camelCaseName}.js`),
                    render('redux/saga.mustache',
                        {
                            ...item,
                            method: item.method.toLowerCase(),
                            actionName: item.actionName.toUpperCase(),
                            prefix: camelCaseName.toUpperCase(),
                            actionType
                        })
                );
                actionGroups[camelCaseName] = [];
                exportActions.push(actionType);
                actionGroups[camelCaseName].push(actionType);
                mapStateToProps.push(`${actionType}Result: state.${name}.${actionType}Result`);
            });

            const containerPath = join(config.dir, config.directory.source, config.directory.container);
            mkdirsSync(containerPath);
            const { actions = [], first = [] } = opts.import;
            first.forEach(item => {
                const [name, actionName] = item.split(' ');
                const actionType = _.camelCase(actionName);
                firstLoad.push(`this.props.${actionType}()`);
            });
            let importContent = '';
            actions.forEach(item => {
                const [name, actionName] = item.split(' ');
                if (!actionGroups[name]) {
                    actionGroups[name] = [];
                }
                const actionType = _.camelCase(actionName);
                exportActions.push(actionType);
                actionGroups[name].push(actionType);
                mapStateToProps.push(`${actionType}Result: state.${_.camelCase(name)}.${actionType}Result`);
            });
            Object.keys(actionGroups).forEach(key => {
                importContent += `import { ${actionGroups[key].join(', ')} } from '../${config.directory.redux}/${key}';\n`;
            });

            writeFileSync(join(containerPath, `${name}.js`),
                render('container/container.mustache',
                    {
                        ...opts,
                        componentDir: config.directory.component,
                        importContent,
                        mapStateToProps: mapStateToProps.join(',\n'),
                        exportActions: exportActions.join(', '),
                    })
            );

            reduxReset(reduxPath);
        }

        writeFileSync(join(componentPath, `${name}.js`),
            render('component/component.mustache', {
                ...opts,
                lifecycle,
                firstLoad: firstLoad.join(';\n'),
                module
            })
        );

        if (module.style) {
            const stylePath = join(componentPath, config.directory.style);
            mkdirsSync(stylePath);
            writeFileSync(join(stylePath, `${camelCaseName}.less`), '');
        }
        writeFileSync(join(vdConfigPath, `${camelCaseName}.json`), JSON.stringify(opts, null, 2));
    }
}