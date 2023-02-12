const NodeIntentFinder = require('./nodeIntentFinder.cjs');

test('can find the intent of a node if it is the root node for the intent', () => {const testSkill = {"name": "test skill", "intents": [], "dialog_nodes": [
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