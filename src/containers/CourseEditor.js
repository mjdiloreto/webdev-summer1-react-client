import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseService from "../services/CourseService";

export default class CourseEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        courseId: '',
        activeModuleId: null,
        course: {title: ''}
    }

    this.courseService = CourseService.instance;
    this.selectCourse = this.selectCourse.bind(this);
    this.changeActiveModule = this.changeActiveModule.bind(this);
  }

  componentDidMount() {
    this.selectCourse(this.props.match.params.courseId);
  }

  selectCourse(courseId) {
    this.courseService.findCourseById(courseId).then(
        (course) => {
          console.log(course);
          this.setState({courseId: courseId, course: course})
        }
    );
  }

  changeActiveModule(moduleId) {
    this.setState({activeModuleId: moduleId});
  }

  render() { return(
    <div>
      <h2>Editing course: {this.state.course.title}</h2>
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
