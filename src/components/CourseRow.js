import React from 'react';
import { Link } from 'react-router-dom'
import CourseService from "../services/CourseService";

class CourseRow extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.courseService = CourseService.instance;
  }

  deleteCourse() {
      this.courseService.deleteCourse(this.props.course.id).then(
          () => this.props.unmount(this.props.course.id));
  }

  render() {

    return (
      <tr>
        <td>
          <Link to={`/course/${this.props.course.id}`}>
            {this.props.course.title}
          </Link>
        </td>
        <td>
            {this.props.course.modified}
        </td>
        <td>
          <i className="fa fa-trash" onClick={this.deleteCourse}
             title="delete module" style={{fontSize: 20, cursor: 'pointer'}}/>
        </td>
      </tr>
    );
  }
}
export default CourseRow;
