import NodeIntentFinder from '../utils/nodeIntentFinder.js';

test('can find the intent of a node if it is the root node for the intent', () => {
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
    expect(new NodeIntentFinder(testSkill, "handler_3_1501275087289").getIntent()).toBe("#Help");
})

test('can find the intent for a node if it is a direct child of the root node for the intent', () => {
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
  expect(new NodeIntentFinder(testSkill, "node_3212").getIntent()).toBe("#Directions");
})

test('can find the intent for a node that is a second level child of the root node for the intent', () => {
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
  expect(new NodeIntentFinder(testSkill, "node_3212100").getIntent()).toBe("#Directions");
})

// test('', () => {

//   expect().toBe();
// })