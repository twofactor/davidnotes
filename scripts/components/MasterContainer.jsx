import React from 'react';
import ReactDOM from 'react-dom';
import connectToStores from 'alt-utils/lib/connectToStores';
import * as firebase from 'firebase';

import config from '../firebaseCredentials';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import NoteContainer from './NoteContainer.jsx';

export default class MasterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.initializeFirebase = this.initializeFirebase.bind(this);
    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this.initializeFirebase();
  }

  static getStores() {
    return [NoteStore];
  }

  static getPropsFromStores() {
    return NoteStore.getState();
  }

  initializeFirebase() {
    const app = firebase.initializeApp(config);
    const auth = firebase.auth();
    const database = firebase.database();

    auth.onAuthStateChanged(this.onAuthStateChange);
    NoteActions.setAuth(auth);
    NoteActions.setDatabase(database);
  }

  onAuthStateChange(user) {
    NoteActions.changeAuth(user);
  }

  signIn() {
    const { auth } = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {!user && <button onClick={this.signIn}>Sign In</button>}
        {user && <NoteContainer {...this.props} />}
      </div>
    );
  }
}

const MasterContainerWrapper = connectToStores(MasterContainer);
ReactDOM.render(<MasterContainerWrapper />, document.getElementById('react-content'));
