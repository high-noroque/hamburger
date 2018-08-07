import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavList from './NavList';
import NavItems from './NavItems/NavItems';

configure({adapter: new Adapter()});

describe('<NavList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavList />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavItems)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavItems)).toHaveLength(3);
  });

  it('should an exact logout button', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavItems link="/logout">Logout</NavItems>)).toEqual(true);
  });
});