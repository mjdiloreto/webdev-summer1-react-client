import React from 'react';

const iconStyle = {fontSize: 20, cursor: 'pointer'};
const moduleFontStyle = {fontSize: 20, font: 'arial'};

export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-group-item" style={moduleFontStyle}>
        {this.props.module.title}
        <span className="float-right">
          <i className="fa fa-trash" title="delete module" style={iconStyle}></i>
          <i  title="delete module" style={iconStyle}>   </i>
          <i className="fa fa-pencil" title="edit module" style={iconStyle}></i>
        </span>
      </li>
    );
  }
}
