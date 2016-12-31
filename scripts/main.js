import * as firebase from 'firebase';
import masterContainer from './components/MasterContainer.jsx';

const config = {
	apiKey: "AIzaSyBigoLPAUwIO9Saasbi4AkqtELwcdE9RMM",
  authDomain: "davidnotes-edbf8.firebaseapp.com",
  databaseURL: "https://davidnotes-edbf8.firebaseio.com",
  storageBucket: "davidnotes-edbf8.appspot.com",
  messagingSenderId: "423654397128"
}

const app = firebase.initializeApp(config);

console.log(app.name);