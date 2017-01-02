import React from 'react';

import { notePath, noteBodyPath } from '../utils/firebasePaths';
import NoteActions from '../actions/NoteActions';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentWillMount() {
    const { auth, database, currentNoteId } = this.props;
    this.addEventListenerToNote(auth.currentUser.uid, currentNoteId, database);
  }

  componentWillReceiveProps(nextProps) {
    const { currentNoteId, auth, database } = nextProps;
    const userId = auth.currentUser.uid;
    if (this.props.currentNoteId !== currentNoteId) {
      this.removeEventListenerOnNote(userId, this.props.currentNoteId, database);
      this.addEventListenerToNote(userId, currentNoteId, database);
    }
  }

  handleEditorChange(e) {
    const { database, currentNoteId, auth } = this.props;
    const newBody = e.target.value;
    const userId = auth.currentUser.uid;
    database.ref(noteBodyPath(userId, currentNoteId)).set(newBody);
  }

  addEventListenerToNote(userId, noteId, database) {
    database.ref(notePath(userId, noteId)).on('value', (snapshot) => {
      NoteActions.setCurrentNote(snapshot.val());
    });
  }

  removeEventListenerOnNote(userId, noteId, database) {
    database.ref(notePath(userId, noteId)).off();
  }

  render() {
    const { currentNote } = this.props;
    console.log(currentNote);
    const { title, body, last_update_time } = currentNote;
    return (
      <div>
        <h3>{title}</h3>
        <i>{last_update_time}</i>
        <textarea value={body} onChange={this.handleEditorChange} />
      </div>
    );
  }
}
