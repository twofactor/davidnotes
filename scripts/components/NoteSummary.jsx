import React from 'react';

import NoteActions from '../actions/NoteActions';

export default class NoteSummary extends React.Component {
  constructor(props) {
    super(props);

    this.handleNoteClick = this.handleNoteClick.bind(this);
  }

  handleNoteClick() {
    const { id } = this.props;
    NoteActions.setCurrentNoteId(id);
  }

  render() {
    const { note } = this.props;
    const { title, last_updated_time, first_twenty_chars } = note;
    return (
      <div onClick={this.handleNoteClick}>
        <h4>{title}</h4>
        <i>{last_updated_time}</i><br />
        {first_twenty_chars}
      </div>
    );
  }
}
