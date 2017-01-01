import React from 'react';
import * as firebase from 'firebase';
import { each } from 'underscore';

import NoteActions from '../actions/NoteActions';
import emptyUserData from '../utils/emptyUserData';
import validateUser from '../utils/validateUser';


export default class NoteContainer extends React.Component {
  constructor(props) {
    super(props);

    this.createNotebook = this.createNotebook.bind(this);
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

  createNotebook() {
    const { database, auth } = this.props;
    const id = auth.currentUser.uid;
    const currentTime = new Date();
    database.ref('users/user-' + id + '/notebooks_meta').push({
      'name': 'Default notebook name',
      'last_updated_on': currentTime.toString(),
    });
  }

  signOut() {
    const { auth } = this.props;
    auth.signOut();
    NoteActions.signOut();
  }

  render() {
    const { user, notebooks } = this.props;
    return (
      <div>
        <h1>Welcome, {user.displayName}</h1>
        <button onClick={this.signOut}>Sign Out</button>
        {!notebooks && "No notebooks yet."}
        {notebooks && Object.keys(notebooks).map((key) => {
          return <h5 key={key}>Notebook id: {key}</h5>;
        })}
        <button onClick={this.createNotebook}>Create New Notebook</button>
      </div>
    );
  }
}
