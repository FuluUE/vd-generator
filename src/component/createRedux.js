import _ from 'lodash';
import { join, relative } from 'path';
import { existsSync, mkdirsSync, writeFileSync, readFileSync, readJSONSync } from 'fs-extra';
import { camelCase, getPaths } from '../utils';
import render from '../utils/mustache';
import resetIndex from './resetIndex';

export default (config, opts) => {
    const name = _.upperFirst(camelCase(opts.name));
    const camelCaseName = camelCase(name);
    opts.camelCaseName = camelCaseName;

    const paths = getPaths({ dir: config.dir, group: opts.group, name });

    if (!existsSync(paths.vdConfig)) {
        // begin create component
        mkdirsSync(paths.component);
        writeFileSync(join(paths.component, 'index.js'),
            render('component/index.mustache',
                { name: name })
        );

        const module = {};
        _.forEach(opts.module, (item) => {
            module[item] = camelCaseName;
            if (item !== 'style' && item !== 'doc' && item !== '__tests__') {
                mkdirsSync(join(paths.component, config.directory[item] || item));
            }
        });

        if (module.__tests__) {
            const testPath = join(paths.component, '__tests__');
            mkdirsSync(testPath);
            writeFileSync(join(testPath, `${camelCaseName}.js`),
                render('component/test.mustache', {
                    name
                }));
        }

        if (module.style) {
            const stylePath = join(paths.component, config.directory.style);
            mkdirsSync(stylePath);
            writeFileSync(join(stylePath, `${camelCaseName}.less`), '');
        }
        if (module.doc) {
            const docPath = join(paths.component, config.directory.document);
            mkdirsSync(docPath);
            writeFileSync(join(docPath, 'index.md'), `${name} Doc`);
        }

        const lifecycle = {};
        const firstLoad = [];

        _.forEach(opts.lifecycle, (item) => lifecycle[item] = true);

        writeFileSync(join(paths.component, `${name}.js`),
            render('component/component.mustache', {
                ...opts,
                lifecycle,
                firstLoad: firstLoad.join(';\n'),
                module
            })
        );
        // end create component
    } else {
        opts = {
            ...readJSONSync(paths.vdConfig),
            ...opts,
        }
    }
    if (opts.saga) {
        const apiPath = join(config.dir, 'src', 'configs', 'api.js');
        let apiContent = readFileSync(apiPath, 'utf8');
        apiContent = apiContent.replace('export default', '').replace(';', '');
        apiContent = JSON.parse(apiContent);
        apiContent[opts.saga.requestVarName] = opts.saga.url;
        writeFileSync(apiPath, `export default ${JSON.stringify(apiContent, null, 2)};`);

        const relativePath = relative(join(paths.service), join(config.dir, 'src')).replace(/\\/g, '/');

        if (!existsSync(paths.route)) {
            mkdirsSync(paths.route);
        }
        console.log(paths);
        writeFileSync(join(paths.route, `${name}.js`),
            render('route.mustache',
                {
                    name,
                    ...opts.saga,
                    relativePath,
                    groupPath: paths.groupPath
                })
        );
        if (!existsSync(paths.service)) {
            mkdirsSync(paths.service);
        }

        writeFileSync(join(paths.service, `${camelCaseName}.js`),
            render('services.mustache',
                {
                    camelCaseName,
                    ...opts.saga,
                    relativePath
                })
        );

        if (!existsSync(paths.model)) {
            mkdirsSync(paths.model);
        }
        writeFileSync(join(paths.model, `${camelCaseName}.js`),
            render('model.mustache',
                {
                    name,
                    camelCaseName,
                    relativePath,
                    groupPath: paths.groupPath
                })
        );
    }

    writeFileSync(paths.vdConfig, JSON.stringify(opts, null, 2));

    resetIndex(config);
}