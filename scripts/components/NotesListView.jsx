import React from 'react';

import NoteActions from '../actions/NoteActions';
import NoteSummary from './NoteSummary.jsx';

export default class NotesListView extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.addEventListenerToNote = this.addEventListenerToNote.bind(this);
    this.removeEventListenerOnNote = this.removeEventListenerOnNote.bind(this);
  }

  componentWillMount() {
    const { currentNotebook, database, auth } = this.props;
    const userId = auth.currentUser.uid;
    this.addEventListenerToNote(userId, currentNotebook['id'], database);
  }

  componentWillReceiveProps(nextProps) {
    const { currentNotebook, auth, database } = nextProps;
    if (this.props.currentNotebook.id !== currentNotebook.id) {
      this.removeEventListenerOnNote(auth.currentUser.uid, this.props.currentNotebook.id, database);
      this.addEventListenerToNote(auth.currentUser.uid, currentNotebook['id'], database);
    }
  }

  addEventListenerToNote(userId, notebookId, database) {
    database.ref('users/user-' + userId + '/notes_meta/' + notebookId).on('value', (snapshot) => {
      NoteActions.setNotesList(snapshot.val());
    });
  }

  removeEventListenerOnNote(userId, notebookId, database) {
    database.ref('users/user-' + userId + '/notes_meta/' + notebookId).off();
  }

  componentWillUnmount() {
    const { currentNotebook, database, lastUserId } = this.props;
    this.removeEventListenerOnNote(lastUserId, currentNotebook.id, database);
  }

  handleFormChange(e) {
    NoteActions.setNewNoteTitle(e.target.value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { auth, currentNotebook, newNoteTitle } = this.props;
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
        first_twenty_chars: '',
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
          return (<NoteSummary key={key} id={key} note={notesList[key]} />);
        })}
        <br />
      </div>
    );
  }
}
