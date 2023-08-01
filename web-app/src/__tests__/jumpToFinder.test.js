import JumpToFinder from '../utils/jumpToFinder.js';

test('can handle nothing jumping to the node under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}], "dialog_nodes": [
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
    expect(new JumpToFinder(testSkill, "handler_3_1501275087289", null).findNodeJumpTos()).toEqual([]);
})

test('can return single node jumping to the node under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}], "dialog_nodes": [
        {
            "type": "standard",
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
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
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_3_1522439390442"
            },
            "conditions": "true",
            "dialog_node": "node_123"
          }]};
    expect(new JumpToFinder(testSkill, "node_3_1522439390442", null).findJumpTos()).toEqual(["node_123 - Provide location"]);
})

test('throws error if no node or intent is provided in the intial constructor', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": []};
    expect(() => {new JumpToFinder(testSkill);}).toThrow(Error);
})

test('throws expected error message if no node or intent is provided in the intial constructor', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": []};
    expect(() => {new JumpToFinder(testSkill);}).toThrow('No intent or node provided');
  })

test('can handle nothing jumping to an intent under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}]
      , "dialog_nodes": [
        {
            "type": "standard",
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_12333"
            },
            "conditions": "true",
            "dialog_node": "node_3_1522439390442"
          },
          {
            "type": "standard",
            "title": "Directions",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_3_1522439390442"
            },
            "conditions": "#Directions",
            "dialog_node": "node_123"
          }]};
    expect(new JumpToFinder(testSkill, null, "Directions").findJumpTos()).toEqual([]);
})

test('can return one node jumping to an intent under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}], "dialog_nodes": [
        {
            "type": "standard",
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
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
            "title": "Directions",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_3_1522439390442"
            },
            "conditions": "#Directions",
            "dialog_node": "node_123"
          }]};
    expect(new JumpToFinder(testSkill, null, "Directions").findJumpTos()).toEqual(["node_3_1522439390442 - Provide location"]);
  })

  test('can return multiple nodes jumping to one intent under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}], "dialog_nodes": [
        {
            "type": "standard",
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
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
            "title": "Provide location 2",
            "output": {
              "text": {}
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_123"
            },
            "conditions": "true",
            "dialog_node": "node_3_2222439390445"
          },
          {
            "type": "standard",
            "title": "Directions",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              },
              "next_step": {
                  "behavior": "jump_to",
                  "dialog_node": "node_123"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_3_1522439390442"
            },
            "conditions": "#Directions",
            "dialog_node": "node_123"
          }]};
    expect(new JumpToFinder(testSkill, null, "Directions").findJumpTos().sort()).toEqual(["node_3_1522439390442 - Provide location","node_3_2222439390445 - Provide location 2"].sort());
  })

  test('can return multiple nodes jumping to one node under test', () => {
    const testSkill = {"name": "test skill", "intents": [{
      "intent": "Directions",
      "examples": []}], "dialog_nodes": [
        {
            "type": "standard",
            "title": "Provide location",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              }
            },
            "parent": "Directions",
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
            "title": "Provide location 2",
            "output": {
              "text": {}
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_123"
            },
            "conditions": "true",
            "dialog_node": "node_3_2222439390445"
          },
          {
            "type": "standard",
            "title": "Directions",
            "output": {
              "text": {
                "values": [
                  "We're located by Union Square on the corner of 13th and Broadway"
                ],
                "selection_policy": "sequential"
              },
              "next_step": {
                  "behavior": "jump_to",
                  "dialog_node": "node_123"
              }
            },
            "parent": "Directions",
            "metadata": {},
            "next_step": {
                "behavior": "jump_to",
                "dialog_node": "node_3_1522439390442"
            },
            "conditions": "#Directions",
            "dialog_node": "node_123"
          }]};
    expect(new JumpToFinder(testSkill, "node_123", null).findJumpTos().sort()).toEqual(["node_3_1522439390442 - Provide location","node_3_2222439390445 - Provide location 2"].sort());
  })

// test('', () => {

//   expect().toBe();
// })