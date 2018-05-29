import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseService from "../services/CourseService";
import WidgetApp from "./widgetList";
import {createStore} from "redux";
import {widgetReducer} from "../reducers/widgetReducer";
import {Provider} from "react-redux";

export default class CourseEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        courseId: '',
        activeModuleId: null,
        course: {title: ''},
        activeLessonId: null
    }

    this.courseService = CourseService.instance;
    this.selectCourse = this.selectCourse.bind(this);
    this.changeActiveModule = this.changeActiveModule.bind(this);
    this.changeActiveLesson = this.changeActiveLesson.bind(this);
  }

  componentDidMount() {
    this.selectCourse(this.props.match.params.courseId);
  }

  selectCourse(courseId) {
    this.courseService.findCourseById(courseId).then(
        (course) => {
          this.setState({courseId: courseId, course: course})
        }
    );
  }

  changeActiveModule(moduleId) {
      // reset the active lesson
      this.changeActiveLesson(null);

      this.setState({activeModuleId: moduleId});
  }

  changeActiveLesson(lessonId) {
    this.setState({activeLessonId: lessonId})
  }

    render() {
      let store = createStore(widgetReducer);

      return(
    <div>
      <h2>Editing course: {this.state.course.title}</h2>
      <div className="row">
        <div className="col-4">
          <ModuleList courseId={this.state.courseId}
            onActiveModuleChange={this.changeActiveModule.bind(this)}/>
        </div>
        <div className="col-8">
          <LessonTabs moduleId={this.state.activeModuleId}
                      onActiveLessonChange={this.changeActiveLesson.bind(this)}/>
            <Provider store={store}>
                <WidgetApp activeLessonId={this.state.activeLessonId}/>
            </Provider>
        </div>
      </div>
    </div>
  );}}