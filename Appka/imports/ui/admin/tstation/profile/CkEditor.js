import React, { Component } from 'react';

export default class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let configuration = {
      toolbar: 'Basic',
    };
    CKEDITOR.replace('editor', configuration);
    CKEDITOR.instances.editor.on('change', () => {
      let data = CKEDITOR.instances.editor.getData();
      this.props.onChange(data);
    });
  }

  render() {
    return (
      <textarea name="editor" cols="100" rows="6" value={this.props.value} />
    );
  }
}
