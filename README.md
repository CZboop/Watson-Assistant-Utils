# Watson Assistant Utils 🛠️
React JSX web application to speed up some simple but manual tasks for the IBM Watson Assistant chatbot development tool.

Uses basic built in JavaScript functions to filter and traverse the nodes within the JSON representation of an Assistant skill, wrapped in a React application for ease of use.

Deployed via Github Actions pipeline on [GitHub Pages](https://CZboop.github.io/Watson-Assistant-Utils)

**Note: There is currently an issue with the GH Pages version of the app, where after a form submit it will throw a 404 error. This issue does not occur with cloning and running a local version, which is recommended for actual use. How to do this is outlined in the Install and Run heading below. The GH Pages issue can also be bypassed by going back to the homepage '/Watson-Assistant-Utils' and refreshing, but this does get impractical**

## Tools/Functionality
* Jump-To Finder - Get a list of nodes that are jumping to either a single node or any node in an intent. May be useful to check before deleting something
* Node Intent Finder - Quickly check which intent a node sits under
* Intent Node Finder - Quickly find the ids and titles for all nodes in an intent

## User Interface - Front End
Upload the JSON file containing your target assistant skill, and a dropdown list will be populated with the intents or nodes in the skill as relevant. 

Start typing and the list will be filtered to just nodes or intents containing what you've types, or select from the list, then submit to get the results!

You can upload a different JSON file to look at a different skill, but only one skill will be stored at a time. Skill persists in session storage until you have closed the browser where you uploaded it, refreshing will not cause you to need to upload the file again.

## Install and Run
The web app is accessible on GitHub Pages at this link: [https://CZboop.github.io/Watson-Assistant-Utils](https://CZboop.github.io/Watson-Assistant-Utils)

To install and run a dev version that you can customise or build on:
* Clone this repository using ```$ git clone https://github.com/CZboop/Watson-Assistant-Utils```
* Run ```$ npm install``` to install dependencies
* Run ```$ npm start``` to start the local development version
* Make any changes or use the development version (will run on http://localhost:3000/ by default and will open automatically)
