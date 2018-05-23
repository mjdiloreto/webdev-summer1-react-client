import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'

export default class CourseEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        courseId: '',
        courseTitle: '',
        activeModuleId: null
    }
    this.selectCourse = this.selectCourse.bind(this);
    this.changeActiveModule = this.changeActiveModule.bind(this);
  }

  componentDidMount() {
    this.selectCourse
    (this.props.match.params.courseId);
  }

  selectCourse(courseId) {
    this.setState({courseId: courseId});
  }

  changeActiveModule(moduleId) {
    this.setState({activeModuleId: moduleId});
  }

  render() { return(
    <div>
      <h2>Editing course: {this.state.courseId}</h2>
      <div className="row">
        <div className="col-4">
          <ModuleList courseId={this.state.courseId}
            onActiveModuleChange={this.changeActiveModule.bind(this)}/>
        </div>
        <div className="col-8">
          <LessonTabs moduleId={this.state.activeModuleId}/>
        </div>
      </div>
    </div>
  );}}
