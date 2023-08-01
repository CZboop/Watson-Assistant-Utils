import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindIntentNode from '../components/FindIntentNode';
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

test('Test can switch intents once selected', async () => {
    // set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // set up undertest component
    const component = <FindIntentNode />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we submit an initial input
    const datalist = screen.getByLabelText("Select or start typing the intent whose nodes you want to see:");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "Thanks");
    const submitButton = document.querySelector(".submit-intent");
    await user.click(submitButton);
    // then - the switch intent button can be selected and then we can enter a new intent
    const switchButton = document.querySelector("#switch-intent");
    await user.click(switchButton);
    await user.type(datalist, "Customer_Care_Store_Hours");
    await user.click(submitButton);
})

test('All intents appear in the data list dropdown', async () => {
    // given - set up fake session storage for the main undertest component to read from
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // when - we render the undertest component
    const component = <FindIntentNode />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // then - the datalist contains all intents from the skill
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    const datalistOptions = [...datalist.children].map(option => option[Object.keys(option)[0]].key).sort()
    expect(datalistOptions).toEqual(["Customer_Care_Store_Hours", "Thanks", "Customer_Care_Appointments", "Customer_Care_Store_Location", "Cancel", "General_Connect_to_Agent", "Goodbye", "General_Greetings", "Help"].sort());
})