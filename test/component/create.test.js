import createRedux from '../../src/component/createRedux';


describe('component/create', () => {
    const opts = { "type": "1", "format": "class", "group": "c", "name": "CC", "description": "asd", "version": "1.0.0", "compatibility": { "chrome": "latest", "firefox": "latest", "safari": "latest", "ie": "9+" }, "lifecycleMountingOptions": ["constructor", "render"], "isPropCheck": true, "saga": { "url": "das", "requestVarName": "dsad", "method": "get" }, "lifecycle": ["constructor", "render"] };

    it('create', () => {
        createRedux({ dir: 'C:/Users/xuzhiheng/Desktop/a', type: 'pcWeb' }, opts);
    });
});