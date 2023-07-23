# Watson Assistant Utils 🛠️
React JSX web application to speed up some simple but manual tasks for the IBM Watson Assistant chatbot development tool.

## Tools/Functionality
* Jump-To Finder - Get a list of nodes that are jumping to either a single node or any node in an intent. May be useful to check before deleting something
* Node Intent Finder - Quickly check which intent a node sits under
* Intent Node Finder - Quickly find the ids and titles for all nodes in an intent

## User Interface/How It Works
Upload the JSON file containing your target assistant skill, and a dropdown list will be populated with the intents or nodes in the skill as relevant. 

Start typing and the list will be filtered to just nodes or intents containing what you've types, or select from the list, then submit to get the results!

You can upload a different JSON file to look at a different skill, but only one skill will be stored at a time. Skill persists in session storage until you have closed the browser where you uploaded it, refreshing will not cause you to need to upload the file again.