import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/functions';
import 'whatwg-fetch';

// Get the firebase configuration from the /__/ reserved space on
// firestore hosting
fetch('/__/firebase/init.json')
  .then(async response => {
    const config = await response.json();
    // Initialize the app with the config
    firebase.initializeApp(config);

    // Once the firebase configuration has been loaded, then render the app
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(e => {
    throw new Error(
      'Failed to fetch Firebase configuration file. If you are in development, make sure firebase hosting emulator is running. In production it should be pulled from /__/ reserved directory '
    );
  });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    alert('New version available!  Ready to update?');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }
});
