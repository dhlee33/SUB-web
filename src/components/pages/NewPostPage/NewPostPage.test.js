import React from 'react';
import renderer from 'react-test-renderer';
import NewPostPage from './index';

describe('NewPostPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<NewPostPage />);
  });

});
