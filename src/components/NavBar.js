import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class NavBar
    extends Component {
    render() {
        return (
            <Router>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Course List</a>
                    </li>
                </ul>

                <div className="container-fluid">

                    <Route path="/courses"
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


