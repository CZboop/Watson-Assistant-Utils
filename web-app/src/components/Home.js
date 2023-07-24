import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='Home PageContainer'>
      <h2 id="page-header">Watson Assistant Utils</h2>
      <p>Welcome! This is a page hosting some simple tools to help speed up tedious tasks in IBM Watson Assistant.</p>
      <h4>The Tools</h4>
      <ul>
        <li><Link to="/find-jumps">Jump-To Finder:</Link><p>Find whether any nodes are jumping to a given intent or node. Useful to check before deleting a node or intent.</p></li>
        <li><Link to="/find-intent">Node Intent Finder:</Link><p>Find which intent a node is a child of. Useful to get quick context on a node.</p></li>
        <li><Link to="/find-nodes">Intent Node Finder:</Link><p>Find all nodes inside an intent.</p></li>
      </ul>
      <p>Select a link from the nav bar or one of the bullet points above to get started </p>
    </div>
  )
}

export default Home;