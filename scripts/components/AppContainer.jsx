import React from 'react';
import * as firebase from 'firebase';
import { each } from 'underscore';

import Sidebar from './Sidebar.jsx';
import NotesListView from './NotesListView.jsx';
import UnicornEditor from './UnicornEditor.jsx';
import NoteActions from '../actions/NoteActions';
import emptyUserData from '../utils/emptyUserData';
import validateUser from '../utils/validateUser';


export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    const { database, auth } = this.props;
    const id = auth.currentUser.uid;
    const users_ref = database.ref('users');

    // check to see if new user
    validateUser(users_ref, id);
    users_ref.child('user-' + id + '/notebooks_meta').on('value', (snapshot) => {
      NoteActions.setNotebooks(snapshot.val());
    });
  }

  componentWillUnmount() {
    const { lastUserId, database } = this.props;
    const users_ref = database.ref('users/user-' + lastUserId + '/notebooks_meta').off();
  }

  signOut() {
    const { auth } = this.props;
    auth.signOut();
    NoteActions.signOut();
  }

  render() {
    const { user, currentNotebook, currentNoteId } = this.props;
    return (
      <div>
        <h1>Welcome, {user.displayName}</h1>
        <button onClick={this.signOut}>Sign Out</button>
        <Sidebar {...this.props} />
        {currentNotebook && <NotesListView {...this.props} />}
        {currentNoteId && <UnicornEditor {...this.props} />}
      </div>
    );
  }
}
