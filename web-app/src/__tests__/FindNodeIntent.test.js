import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindNodeIntent from '../components/FindNodeIntent';
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

  test('Test correct nodes showing in datalist', async () => {
    // given - set up fake session storage for the main undertest component to read from
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('files', JSON.stringify(sample_skill));
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
    expect([...datalist.children].map(option => option[Object.keys(option)[0]].key).sort()).toEqual(nodesInSkill.sort());
})