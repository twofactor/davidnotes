import React from 'react';
import ReactDOM from 'react-dom';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

import {
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

export default class UnicornEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(), // for empty content
    };

    /*
    this.state = {
      editorState: createEditorState(data), // if you have initial data
    };
    */

    this.onChange = (editorState) => {
      this.setState({ editorState });
      var editorData = convertToRaw(this.state.editorState.getCurrentContent());
      console.log(editorData);
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange} />
    );
  }
};
