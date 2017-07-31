import Mustache from 'mustache';
import { join } from 'path';
import { readFileSync } from 'fs-extra';


export default function render(filename, obj) {
    return Mustache.render(readFileSync(join(__dirname, '../../boilerplates/react', filename), 'utf-8'), obj);
}
