import alt from '../src/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.user = null;
    this.database = null;
    this.auth = null;

  this.bindListeners({
    handleAuthChange: NoteActions.CHANGE_AUTH,
    handleSetDatabase: NoteActions.SET_DATABASE,
    handleSetAuth: NoteActions.SET_AUTH,
  });
  }

  handleAuthChange(user) {
    this.user = user;
  }

  handleSetDatabase(database) {
    this.database = database;
  }

  handleSetAuth(auth) {
    this.auth = auth;
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
