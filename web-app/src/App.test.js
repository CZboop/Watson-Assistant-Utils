import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

it('App component renders without crashing', () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
  });
  
// testing navigation
test('Initially loads home page', async () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));

    // verify home page content
    expect(document.querySelector("#page-header").textContent).toEqual("Watson Assistant Utils");
})

// verify jump to finder link and resulting page header
test('Able to navigate to jump to finder', async () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));

    const user = userEvent.setup();
    await user.click(document.querySelector("#nav_jump-finder"));
    expect(document.querySelector("#page-header").textContent).toEqual("Jump-To Finder");
})


// verify node intent finder link and resulting page header
test('Able to navigate to node intent finder', async () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));

    const user = userEvent.setup();
    await user.click(document.querySelector("#nav_intent-finder"));
    expect(document.querySelector("#page-header").textContent).toEqual("Node Intent Finder");
})

// verify intent node finder link and resulting page header
test('Able to navigate to intent node finder', async () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));

    const user = userEvent.setup();
    await user.click(document.querySelector("#nav_node-finder"));
    expect(document.querySelector("#page-header").textContent).toEqual("Intent Node Finder");
})

// test('', () => {
// });
