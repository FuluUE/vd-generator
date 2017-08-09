import _ from 'lodash';
import { join } from 'path';
import { existsSync, mkdirsSync, writeFileSync, readFileSync } from 'fs-extra';
import render from '../utils/mustache';

export default function webpack(config, destPath, debug = true) {
    config = _.cloneDeep(config);
    if (debug && config.general.publicPath === '.') {
        config.general.publicPath = '';
    }
    if (config.dir !== '__dirname') {
        config.dir = `'${config.dir.replace(/\\/g, '/')}'`;
    }
    config.compiler.css.less.minimize = JSON.stringify(config.compiler.css.less.minimize);
    config.compiler.css.postcss.autoprefixer = JSON.stringify(config.compiler.css.postcss.autoprefixer);
    config.compiler.css.postcss.pxtorem = JSON.stringify(config.compiler.css.postcss.pxtorem);
    config.general.resolve.alias = JSON.stringify(config.general.resolve.alias);
    config.general.resolve.extensions = JSON.stringify(config.general.resolve.extensions);
    config.general.resolve.mainFields = JSON.stringify(config.general.resolve.mainFields);
    config.general.externals = JSON.stringify(config.general.externals);
    config.theme = JSON.stringify(theme);
    config.pc = config.platform === 'pc';
    if (typeof config.dll.content === 'object') {
        config.dll.content = JSON.stringify(config.dll.content);
    }
    config.dll.target = JSON.stringify(config.dll.target);
    config.isDebug = debug;
    // writeFileSync(destPath,
    //     render(debug ? 'webpack/webpack.dev.mustache' : 'webpack/webpack.prod.mustache', config)
    // );
    writeFileSync(join(destPath, debug ? 'webpack.config.dev.js' : 'webpack.config.prod.js'),
        render('webpack/webpack.config.mustache', config)
    );
    writeFileSync(join(destPath, 'webpack.config.dll.js'),
        render('webpack/webpack.dll.mustache', config)
    );
}