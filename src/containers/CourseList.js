import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
  constructor() {
    super();
    this.courseService = CourseService.instance;
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.unmountRow = this.unmountRow.bind(this);
  }
  componentDidMount() {
    this.findAllCourses();
  }
  findAllCourses() {
    this.courseService
      .findAllCourses()
      .then((courses) => {
        this.setState({courses: courses});
      })
  }
  unmountRow(id) {
    this.state.courses.filter((c) => c.id !== id);
    this.findAllCourses();
  }
  renderCourseRows() {
    let courses = null;
    let unmountRow = this.unmountRow.bind(this);

    if(this.state) {
      courses = this.state.courses.map(
        function (course) {
          return <CourseRow key={course.id}
                            course={course}
                            unmount={unmountRow}/>
        }
      )
    }
    return (
      courses
    )
  }
  titleChanged(event) {
    this.setState({
      course: { title: event.target.value }
    });
  }
  createCourse() {
    this.courseService
      .createCourse(this.state.course)
        .then(() => this.setState({"title": ""}))
      .then(this.findAllCourses);
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr><th>Title</th></tr>
          <tr>
            <th><input onChange={this.titleChanged}
                       className="form-control" id="titleFld"
                       placeholder="cs101"/></th>
            <th><button onClick={this.createCourse}
                        className="btn btn-primary">
              Add</button></th>
          </tr>
        </thead>
        <tbody>
          {this.renderCourseRows()}
        </tbody>
      </table>
    )
  }
}
export default CourseList;
