import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FileUploader from '../components/FileUploader';
import {screen} from '@testing-library/react';

// NOTE: not much to test, can rely on default uploader working and state being changed once onchange is triggered (confirmed by the below test)
test('Can upload a file and this updates text with uploaded file name', async () => {
    const component = <FileUploader />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(component));

    const testData = {"name": "test skill", "intents": [], "dialog_nodes": [
        {   "type": "standard",
            "title": "Some info",
            "output": {
              "text": {
                "values": [
                  "It's information"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "More info",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_123"
            },
            "conditions": "true",
            "dialog_node": "node_3_1522439390442"
          },
          {
            "type": "standard",
            "title": "More info",
            "output": {
              "text": {}
            },
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_123"
            },
            "conditions": "true",
            "dialog_node": "node_3_2222439390445"
          }]};
    const str = JSON.stringify(testData);
    const blob = new Blob([str]);
    const testFile = new File([blob], 'test_file.json', {
      type: 'application/JSON',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);

    const fileInput = screen.getByLabelText('Upload File');
    user.upload(fileInput, testFile);

    await waitFor(() => expect(screen.getByText(/Selected File: test_file.json/i)).toBeInTheDocument());
})