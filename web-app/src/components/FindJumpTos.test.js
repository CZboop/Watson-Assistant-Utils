import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindJumpTos from './FindJumpTos';
import {screen} from '@testing-library/react';
import { cleanup } from '@testing-library/react'
import data from '../../../data/data.json';
import sample_skill from '../../../data/sample_skill.json';

const sessionStorageMock = (() => {
    let store = {};
  
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
});

afterEach(cleanup);
// NOTE: circular reference error is likely a jest issue that happens when a test fails but not otherwise, so can be used as indication that test is failing and needs to be fixed anyway

  test('Test submitting intent with jump-tos into it displays expected nodes jumping in', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindJumpTos />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - user types a valid intent in the datalist
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "Thanks{enter}");
    const submitButton = document.querySelector(".submit-intent");
    // // console.log(submitButton)
    await user.click(submitButton);
    // then - the page updates with the results
    // TODO: again something going wrong and not displaying results in test! fix this/understand what happening
    // node jumping to is node_22_1467833484410
    await waitFor(() => expect(document.querySelector("#result-list")).toBeInTheDocument());

})

// TODO:
test('Test submitting node with jump-tos into it displays expected nodes jumping in', async () => {
  // given - set up fake session storage for the main undertest component to read from
  const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
  window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
  // given - set up mock alert
  const alertMock = jest.spyOn(window,'alert').mockImplementation();
  // given - set up undertest component
  const component = <FindJumpTos />;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(component));
  // when - user types a valid intent in the datalist
  const datalist = document.querySelector("#optionData");
  expect(datalist).toBeInTheDocument();
  await user.type(datalist, "Thanks{enter}");
  const submitButton = document.querySelector(".submit-intent");
  // // console.log(submitButton)
  await user.click(submitButton);
  // then - the page updates with the results
  // TODO: again something going wrong and not displaying results in test! fix this/understand what happening
  // node jumping to is node_22_1467833484410
  await waitFor(() => expect(document.querySelector("#result-list")).toBeInTheDocument());

})

test('Test correct intents showing in datalist', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindJumpTos />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - user selects intent from toggle
    const toggleIntent = document.querySelector("#type-toggle-intent")
    await user.click(toggleIntent);
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    // then - correct intents are shown in datalist
    // some manipulation needed on the htmlcollection get from .children below, get first value of object which has random key then .key should match the value
    expect([...datalist.children].map(option => option[Object.keys(option)[0]].key).sort()).toEqual(["Customer_Care_Store_Hours", "Thanks", "Customer_Care_Appointments", "Customer_Care_Store_Location", "Cancel", "General_Connect_to_Agent", "Goodbye", "General_Greetings", "Help"].sort())

})

test('Test correct nodes showing in datalist', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindJumpTos />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - user selects nodes from toggle
    const toggleNode = document.querySelector("#type-toggle-node")
    await user.click(toggleNode);
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    // then - correct nodes are shown in datalist
    const nodesInSkill = sample_skill["dialog_nodes"].map(node => node.dialog_node)
    expect([...datalist.children].map(option => option[Object.keys(option)[0]].key).sort()).toEqual(nodesInSkill.sort())
})

test('Test can toggle between intent and node', async () => {
  // TODO
})

test('Test alert error if no selection is made for node', async () => {
  // TODO
})

test('Test alert error if no selection is made for intent', async () => {
  // TODO
})

test('Test alert error if no jump-tos for node', async () => {
  // TODO
})

test('Test alert error if no jump-tos for intent', async () => {
  // TODO
})

test('Test alert error if invalid input for node', async () => {
  // TODO
})

test('Test alert error if invalid input for intent', async () => {
  // TODO
})

test('Test can switch node after node selected', async () => {
  // TODO
})

test('Test can switch intent after intent selected', async () => {
  // TODO
})