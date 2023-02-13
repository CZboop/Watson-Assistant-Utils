const JumpToFinder = require('./jumpToFinder.cjs');

test('can handle nothing jumping to the node under test', () => {
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
    expect(new JumpToFinder(testSkill, "handler_3_1501275087289").findNodeJumpTos()).toEqual([]);
})

test('can return single node jumping to the node under test', () => {
    const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
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
    expect(new JumpToFinder(testSkill, "node_3_1522439390442").findJumpTos()).toBe(["node_123"]);
})

// test('', () => {

//   expect().toBe();
// })