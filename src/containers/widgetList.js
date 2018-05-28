import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/widget'

class WidgetList extends Component {
  constructor(props) {
    super(props)
    this.props.findAllWidgets()
  }
  render() {
    return(
      <div>
        <h1>Widgets For Lesson: [placeholder]</h1>

        <button hidden={this.props.previewMode} onClick={this.props.save}>
          Save
        </button>
        <button onClick={this.props.preview}>
          Preview
        </button>

        <ul className="list-group">
          {this.props.widgets.map(widget => (
              <WidgetContainer widget={widget}
                               preview={this.props.previewMode}
                               key={widget.id}/>
          ))}
        </ul>
        <button onClick={this.props.addWidget}>Add widget
        </button>
       </div>
    )
  }
}

const stateToPropertiesMapper = (state) => ({
  widgets: state.widgets,
  previewMode: state.preview
})
const dispatcherToPropsMapper
  = dispatch => ({
  findAllWidgets: () => actions.findAllWidgets(dispatch),
  addWidget: () => actions.addWidget(dispatch),
  save: () => actions.save(dispatch),
  preview: () => actions.preview(dispatch)
})
const WidgetApp = connect(
  stateToPropertiesMapper,
  dispatcherToPropsMapper)(WidgetList)

export default WidgetApp