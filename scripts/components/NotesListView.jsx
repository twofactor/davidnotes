import React from 'react';

export default class NotesListView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { currentNotebook } = this.props;
    return (
      <h1>Current notebook: {currentNotebook['name'] || "None selected"}</h1>
    );
  }
}
