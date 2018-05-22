import React, {Component} from 'react'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class CourseManager
  extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">

          <nav className="navbar navbar-dark bg-primary">
            <a className="text-white navbar-brand container-fullwidth">Course Manager</a>
          </nav>

          <Route exact path="/"
                 component={CourseList}>
          </Route>

          <Route path="/course/:courseId"
                 component={CourseEditor}>
          </Route>


        </div>
      </Router>
    )
  }
}
