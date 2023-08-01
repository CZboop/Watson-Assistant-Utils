import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindJumpTos from '../components/FindJumpTos';
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

test('Test correct intents showing in datalist', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
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