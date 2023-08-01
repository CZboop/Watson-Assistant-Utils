import nodeFinder from '../utils/intentNodeFinder.js';

test('can find the single node of an intent that has no child nodes (id and/or title where relevant)', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {
            "type": "event_handler",
            "title": "handler_3_1501275087289",
            "output": {
              "text": {
                "values": [
                  "I see you need help making an appointment. Let me transfer you to an agent..."
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Reservation using slots",
            "context": {
              "date": null,
              "time": null,
              "phone": null,
              "confirm": null,
              "specialist": null,
              "user_needs_help": true
            },
            "metadata": {},
            "next_step": {
              "behavior": "skip_all_slots"
            },
            "conditions": "#Help",
            "event_name": "generic",
            "dialog_node": "handler_3_1501275087289"
          }]};
    expect(new nodeFinder(testSkill, 'Help').findAllNodes()).toEqual(["handler_3_1501275087289 - handler_3_1501275087289"]);
})

test('can handle intent not being found', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
        {
            "type": "event_handler",
            "title": "handler_3_1501275087289",
            "output": {
              "text": {
                "values": [
                  "I see you need help making an appointment. Let me transfer you to an agent..."
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Reservation using slots",
            "context": {
              "date": null,
              "time": null,
              "phone": null,
              "confirm": null,
              "specialist": null,
              "user_needs_help": true
            },
            "metadata": {},
            "next_step": {
              "behavior": "skip_all_slots"
            },
            "conditions": "#Help",
            "event_name": "generic",
            "dialog_node": "handler_3_1501275087289"
          }]};
    expect(() => {new nodeFinder(testSkill, 'Helping').findAllNodes()}).toThrow(EvalError);
})

test('can find all nodes of intent, including parent, with one level of child nodes (title and/or id where relevant)', () => {
  const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
      {
        "type": "standard",
        "title": "Provide location",
        "output": {
          "text": {
            "values": [
              "Just a bot response"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_123",
        "metadata": {},
        "next_step": {
            "behavior": "jump_to",
            "dialog_node": "node_123"
        },
        "conditions": "true",
        "dialog_node": "node_321"
      },
      {
        "type": "standard",
        "title": "Directions parent node",
        "output": {
          "text": {
            "values": [
              "Find us online at our website"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_200",
        "metadata": {},
        "next_step": {
            "behavior": "jump_to",
            "dialog_node": "node_3_1522439390442"
        },
        "conditions": "#Directions",
        "dialog_node": "node_123"
      },
      {
        "type": "standard",
        "title": "Provide location - option 2",
        "output": {
          "text": {
            "values": [
              "Just a bot response"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_123",
        "metadata": {},
        "next_step": {
            "behavior": "jump_to",
            "dialog_node": "node_123"
        },
        "conditions": "true",
        "dialog_node": "node_3212"
      }]};
  expect(new nodeFinder(testSkill, 'Directions').findAllNodes().sort()).toEqual(["node_3212 - Provide location - option 2", "node_321 - Provide location", "node_123 - Directions parent node"].sort());
})

test('can find all nodes of intent with two levels of child nodes (id and/or title where relevant)', () => {
  const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
    {
      "type": "standard",
      "title": "Provide location",
      "output": {
        "text": {
          "values": [
            "Just a bot response"
          ],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_123",
      "metadata": {},
      "next_step": {
          "behavior": "jump_to",
          "dialog_node": "node_123"
      },
      "conditions": "true",
      "dialog_node": "node_321"
    },
    {
      "type": "standard",
      "title": "Directions parent node",
      "output": {
        "text": {
          "values": [
            "Find us online at our website"
          ],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_200",
      "metadata": {},
      "next_step": {
          "behavior": "jump_to",
          "dialog_node": "node_3_1522439390442"
      },
      "conditions": "#Directions",
      "dialog_node": "node_123"
    },
    {
      "type": "standard",
      "title": "Provide location - option 2",
      "output": {
        "text": {
          "values": [
            "Just a bot response"
          ],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_123",
      "metadata": {},
      "next_step": {
          "behavior": "jump_to",
          "dialog_node": "node_123"
      },
      "conditions": "true",
      "dialog_node": "node_3212"
    },
    {
      "type": "standard",
      "title": "Provide location - child node 2",
      "output": {
        "text": {
          "values": [
            "Just a bot response"
          ],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_3212",
      "metadata": {},
      "next_step": {
          "behavior": "jump_to",
          "dialog_node": "node_123"
      },
      "conditions": "true",
      "dialog_node": "node_3212001"
    },
    {
      "type": "standard",
      "title": "Provide location - child node",
      "output": {
        "text": {
          "values": [
            "Just a bot response"
          ],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_3212",
      "metadata": {},
      "next_step": {
          "behavior": "jump_to",
          "dialog_node": "node_123"
      },
      "conditions": "true",
      "dialog_node": "node_3212100"
    }]};
  expect(new nodeFinder(testSkill, 'Directions').findAllNodes().sort()).toEqual(["node_3212 - Provide location - option 2", "node_321 - Provide location", "node_123 - Directions parent node", "node_3212100 - Provide location - child node", "node_3212001 - Provide location - child node 2"].sort());
})

// test('', () => {

//   expect().toBe();
// })