import alt from '../utils/alt';

class NoteActions {
  changeAuth(user) {
    return user;
  }

  setDatabase(database) {
    return database;
  }

  setAuth(auth) {
    return auth;
  }

  signOut() {
    return true;
  }

  setNotebooks(notebooks) {
    return notebooks;
  }
}

export default alt.createActions(NoteActions);
