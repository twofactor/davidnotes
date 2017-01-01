import React from 'react';

import Notebook from './Notebook.jsx';
import NoteActions from '../actions/NoteActions';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.createNotebook = this.createNotebook.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createNotebook(name) {
    const { database, auth } = this.props;
    const id = auth.currentUser.uid;
    const currentTime = new Date();
    database.ref('users/user-' + id + '/notebooks_meta').push({
      'name': name,
      'last_updated_on': currentTime.toString(),
    }).then((snapshot) => {
      database.ref('users/user-' + id + '/notes_meta').child(snapshot.key).set('');
    });
  }

  handleFormChange(e) {
    NoteActions.setNewNotebookName({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newNotebookName } = this.props;
    this.createNotebook(newNotebookName);
  }

  render() {
    const { notebooks, newNotebookName } = this.props;
    return (
      <div>
        {!notebooks && "No notebooks yet."}
        {notebooks && Object.keys(notebooks).map((key) => {
          return (
            <Notebook
              key={key}
              name={notebooks[key]['name']}
            />
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <label>
            Name of notebook:
            <input type="text" value={newNotebookName} onChange={this.handleFormChange} />
          </label>
          <input type="submit" value="Create new notebook" />
        </form>
      </div>
    );
  }
}
