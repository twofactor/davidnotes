import alt from '../utils/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.user = null;
    this.lastUserId = null;
    this.database = null;
    this.auth = null;
    this.notebooks = [];

    this.bindListeners({
      handleAuthChange: NoteActions.CHANGE_AUTH,
      handleSetDatabase: NoteActions.SET_DATABASE,
      handleSetAuth: NoteActions.SET_AUTH,
      handleSignOut: NoteActions.SIGN_OUT,
      handleSetNotebooks: NoteActions.SET_NOTEBOOKS,
    });
  }

  handleAuthChange(user) {
    this.user = user;
    this.lastUserId = user && user.uid;
  }

  handleSetDatabase(database) {
    this.database = database;
  }

  handleSetAuth(auth) {
    this.auth = auth;
  }

  handleSignOut() {
    this.user = null;
  }

  handleSetNotebooks(notebooks) {
    this.notebooks = notebooks;
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
