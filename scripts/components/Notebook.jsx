import React from 'react';

import NoteActions from '../actions/NoteActions';

export default class Notebook extends React.Component {
  constructor(props) {
    super(props);

    this.handleNotebookClick = this.handleNotebookClick.bind(this);
  }

  handleNotebookClick() {
    const { name, key } = this.props;
    NoteActions.setCurrentNotebook({name, key});
  }

  render() {
    const { name } = this.props;
    return (
      <div onClick={this.handleNotebookClick}>{name}</div>
    );
  }
}
