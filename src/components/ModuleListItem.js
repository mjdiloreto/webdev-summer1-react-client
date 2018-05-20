import React from 'react';
import ModuleService from '../services/ModuleService'

const iconStyle = {fontSize: 20, cursor: 'pointer'};
const moduleFontStyle = {fontSize: 20, font: 'arial'};

export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);

    this.moduleService = ModuleService.instance;

    this.deleteModule = this.deleteModule.bind(this);
  }

  deleteModule() {
    this.moduleService.deleteModule(this.props.module.id);
  }

  render() {
    return (
      <li className={"list-group-item " + this.props.class_name} style={moduleFontStyle}>
        {this.props.module.title}
        <span className="float-right">
          <i className="fa fa-trash" onClick={this.deleteModule} title="delete module" style={iconStyle}></i>
          <i  title="delete module" style={iconStyle}>   </i>
          <i className="fa fa-pencil" title="edit module" style={iconStyle}></i>
        </span>
      </li>
    );
  }
}
