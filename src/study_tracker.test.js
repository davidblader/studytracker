import React from 'react';
import ReactDOM from 'react-dom';
import App from './study_tracker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
