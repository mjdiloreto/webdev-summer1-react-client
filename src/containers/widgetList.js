import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/widget'

class WidgetList extends Component {
  constructor(props) {
    super(props);
  }

  // This is almost certainly a bad way of doing this.
  // The CourseEditor renders this component with a certain activeLessonId,
  // But the id is not in the store! Instead of connecting the CourseEditor
  // to the store, since it already maintains its own state, this method is used.
  componentWillReceiveProps(newProps) {
      if(newProps.activeLessonId === this.props.activeLessonId) {
      } else {
          this.props.changeActiveLesson(newProps.activeLessonId);
      }
  }

  render() {
      console.log(this.props)
    return(
        <div>
            {this.props.activeLessonId &&
            <div>
                <h1>Widgets For Lesson: {this.props.activeLessonId}</h1>

                <button className="btn" hidden={this.props.previewMode} onClick={this.props.save}>
                    Save
                </button>
                <button className="btn" onClick={this.props.preview}>
                    Preview
                </button>

                <ul className="list-group">
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button className="btn btn-success" onClick={this.props.addWidget}>Add widget</button>
            </div>}
        </div>
    )
  }
}

const stateToPropertiesMapper = (state) => ({
  widgets: state.widgets,
  previewMode: state.preview
});

const dispatcherToPropsMapper
  = dispatch => ({
  findAllWidgets: () => actions.findAllWidgets(dispatch),
  addWidget: () => actions.addWidget(dispatch),
  save: () => actions.save(dispatch),
  preview: () => actions.preview(dispatch),
  changeActiveLesson: (newLessonId) => actions.changeActiveLesson(dispatch, newLessonId)
});

const WidgetApp = connect(
  stateToPropertiesMapper,
  dispatcherToPropsMapper)(WidgetList)

export default WidgetApp