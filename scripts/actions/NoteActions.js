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

  setNewNotebookName(nameObject) {
    return nameObject;
  }

  setCurrentNotebook(notebookObject) {
    return notebookObject;
  }

  setNotesList(notes) {
    return notes;
  }

  setNewNoteTitle(title) {
    return title;
  }
}

export default alt.createActions(NoteActions);
