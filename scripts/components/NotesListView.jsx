import React from 'react';

import NoteActions from '../actions/NoteActions';

export default class NotesListView extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.updateNotesList = this.updateNotesList.bind(this);
  }

  componentWillMount() {
    const { currentNotebook, database, auth } = this.props;
    const userId = auth.currentUser.uid;
    this.updateNotesList(userId, currentNotebook['id'], database);
  }

  componentWillReceiveProps(nextProps) {
    const { currentNotebook, auth, database } = nextProps;
    if (this.props.currentNotebook.id !== currentNotebook.id) {
      this.updateNotesList(auth.currentUser.uid, currentNotebook['id'], database);
    }
  }

  updateNotesList(userId, notebookId, database) {
    database.ref('users/user-' + userId + '/notes_meta/' + notebookId).on('value', (snapshot) => {
      NoteActions.setNotesList(snapshot.val());
    });
  }

  componentWillUnmount() {
    const { currentNotebook, database, lastUserId } = this.props;
    database.ref('users/user-' + lastUserId + '/notes_meta/' + currentNotebook['id']).off();
  }

  handleFormChange(e) {
    NoteActions.setNewNoteTitle(e.target.value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { auth, currentNotebook, newNoteTitle } = this.props;
    console.log(currentNotebook);
    this.createNewNote(auth.currentUser.uid, currentNotebook['id'], newNoteTitle);
  }

  createNewNote(userId, notebookId, title) {
    const { database } = this.props;
    const currentTime = new Date();
    database.ref('users/user-' + userId + '/notes_meta/' + notebookId).push({
      title,
      notebook_id: notebookId,
      body: '',
      last_update_time: currentTime.toString(),
    }).then((snapshot) => {
      database.ref('users/user-' + userId + '/notes').child(snapshot.key).set({
        title,
        notebook_id: notebookId,
        body: '',
        last_update_time: currentTime.toString(),
      });
    });
  }

  render() {
    const { currentNotebook, notesList, newNoteTitle } = this.props;
    return (
      <div>
        <h3>Current notebook: {currentNotebook['name'] || "No notebook selected"}</h3>
        Create new note in this notebook:
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Title of Note:
            <input type="text" value={newNoteTitle} onChange={this.handleFormChange} />
            </label>
            <input type="submit" value="Create new note" />
        </form>
        {!notesList && 'No notes to show'}
        {notesList && Object.keys(notesList).map((key) => {
          return (<h4 key={key}>{notesList[key]['title']}</h4>);
        })}
        <br />
      </div>
    );
  }
}