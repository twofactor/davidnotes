import React from 'react';
import ReactDOM from 'react-dom';

//FIXME Help me Tina :O

//TODO This rando editor doesn't handle rich text as well as Quill does,
//todo make a react component wrapper for quill later on for better handeling of rich text/links/copy paste
//i guess this is technically technical debt lol

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
      //FIXME I think this can load previous data but not sure how to do that
    };

    /*
    this.state = {
      editorState: createEditorState(data), // if you have initial data
    };
    */ //this was there already in an example lmao

    this.onChange = (editorState) => {
      this.setState({ editorState });
      var editorData = convertToRaw(this.state.editorState.getCurrentContent());
      console.log(editorData);
      //FIXME so this is like converting data to raw or something idk how to save it
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
