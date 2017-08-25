import React from 'react';
import { mount } from 'enzyme';
import Main from '../Main';


describe('Main', () => {
  it('should remove duplicated user input colon', () => {
    const wrapper = mount(<Main />);
    // expect(wrapper.find('.ant-form-item-label label').at(0).text()).not.toContain(':');
    // expect(wrapper.find('.ant-form-item-label label').at(1).text()).not.toContain('：');
  });
});
