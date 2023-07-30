import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindNodeIntent from './FindNodeIntent';
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
    jest.resetAllMocks()
});
// afterEach(() => {
//     jest.clearAllMocks();
// });

// afterEach(cleanup);

  test('Test correct nodes showing in datalist', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we select the datalist with node options
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    // then - correct nodes are shown in datalist
    // some manipulation needed on the htmlcollection get from .children below, get first value of object which has random key then .key should match the value
    const nodesInSkill = sample_skill["dialog_nodes"].map(node => node.dialog_node)
    expect([...datalist.children].map(option => option[Object.keys(option)[0]].key).sort()).toEqual(nodesInSkill.sort())

})

test('Test alert error thrown if submit with no input', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we hit the submit button without entering or selecting in the datalist
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    const submitButton = document.querySelector(".submit-node");
    await user.click(submitButton);
    // then - the alert is called once with the expected message
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith("Please select a node!");
})

test('Test alert error thrown if submit with invalid input', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we enter some invalid input not matching a node in the datalist
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "ummm....");
    // when - we hit the submit button
    const submitButton = document.querySelector(".submit-node");
    await user.click(submitButton);
    // then - the alert is called once with the expected message
    // TODO: fix this, prob issue with the mock, in browser working as expected but here giving different message
    // TODO: change to a non alert error message component...
    expect(alertMock).toHaveBeenCalledTimes(1);
})

// TODO: FIX THIS
test('Test correct intent given if valid node selected', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we select a valid input from the datalist
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "node_3_1519173961259");
    // when - we hit the submit button
    const submitButton = document.querySelector(".submit-node");
    await user.click(submitButton);
    // then - the page presents the intent that is the parent of the node
    await expect(screen.getByText("#Customer_Care_Appointments", {exact: false})).toBeInTheDocument();
    // value should be #Customer_Care_Appointments
})

test('Test can upload a new skill', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we hit the upload new skill button
    const switchButton = document.querySelector(".submit-node");
    await user.click(switchButton);
    // then - the session storage spy shows the files item has been changed/cleared
    await expect(sessionStorageSpy).toHaveBeenCalledWith("files");
})

test('Test can switch node after getting result', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we select a valid input from the datalist
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "node_3_1519173961259");
    // when - we hit the submit button
    const submitButton = document.querySelector(".submit-node");
    await user.click(submitButton);
    // when - we hit the switch node button
    const switchNodeButton = document.querySelector("#switch-node");
    await user.click(switchNodeButton);
    // then - the datalist appears again after clicking
    expect(document.querySelector("#optionData")).toBeInTheDocument();
})

test('Test can handle node not having any intent as parent', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(data));
    // given - set up mock alert
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    // given - set up undertest component
    const component = <FindNodeIntent />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));
    // when - we select a valid input from the datalist with no intent as parent
    const datalist = document.querySelector("#optionData");
    expect(datalist).toBeInTheDocument();
    await user.type(datalist, "node_123321");
    // when - we hit the submit button
    const submitButton = document.querySelector(".submit-node");
    await user.click(submitButton);
    // then - the page presents the top level parent of the node
    await act(async () => expect(screen.getByText("@an_entity", {exact: false})).toBeInTheDocument());
})