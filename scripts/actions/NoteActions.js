import alt from '../src/alt';

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
}

export default alt.createActions(NoteActions);
