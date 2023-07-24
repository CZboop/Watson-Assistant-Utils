import React from 'react';
import ReactDOM from 'react-dom';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// TODO: test render and navigation

it('App component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
  
// testing navigation
test('Initially loads home page', async () => {
    const div = document.createElement('div');
    render(<App />, div);
    const user = userEvent.setup();

    // verify home page content
    expect(screen.getByText(/Welcome! This is a page hosting some simple tools/i)).toBeInTheDocument();
})

// verify jump to finder link and resulting page header
test('Able to navigate to jump to finder', async () => {
    const div = document.createElement('div');
    render(<App />, div);
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Jump-To Finder' }));
    expect(screen.getByRole("heading", { level: 2 }).textContent).toEqual("Jump-To Finder");
})


// verify node intent finder link and resulting page header
test('Able to navigate to node intent finder', async () => {
    const div = document.createElement('div');
    render(<App />, div);
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Node Intent Finder' }));
    expect(screen.getByRole("heading", { level: 2 }).textContent).toEqual("Node Intent Finder");
})

// verify intent node finder link and resulting page header
test('Able to navigate to intent node finder', async () => {
    const div = document.createElement('div');
    render(<App />, div);
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Intent Node Finder' }));
    expect(screen.getByRole("heading", { level: 2 }).textContent).toEqual("Intent Node Finder");
})

// test('', () => {
// });
