import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  handleChange(event) {
    this.props.saveChartTitle(this.textInput.current.value);
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
            
            <input className='chartTitleInput' type="text" ref={this.textInput} defaultValue={this.props.title} />

            <Button.Group>
              <Button className="cancelButton" onClick={this.props.cancelPopup}>Cancel</Button>
              <Button.Or />
              <Button positive className="saveButton" onClick={this.handleChange}>Save</Button>
            </Button.Group>
        </div>
      </div>
    );
  }
}


export default Popup;