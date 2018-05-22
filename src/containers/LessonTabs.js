import React from 'react'
import LessonService from '../services/LessonService'

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            lessons: []
        }
        this.lessonService = LessonService.instance;

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this)
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId)
        this.findLessonsForModule(this.state.moduleId);

        console.log(this.state);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId})
    }

    findLessonsForModule(moduleId) {
        this.lessonService.findAllLessonsForModule(moduleId)
            .then((lessons) => this.setState({lessons: lessons}));
    }

    createLesson() {
        alert("created a lesson {" + this.state.title + "}")
    }

    titleChanged(event) {
        this.setState({title: event.target.value});
    }

    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
          return <li className="nav-item"><a className="nav-link active"
                                             href="#">{lesson.title}</a></li>
        })
        return lessons;
    }

    render() { return(
        <div>

            <nav class="navbar">
                <a class="navbar-brand">Lessons</a>
                <form class="form-inline">
                    <input class="form-control mr-sm-2"
                           type="search"
                           placeholder="New Lesson Name"
                           onChange={this.titleChanged}/>
                    <button className="btn btn-success my-2 my-sm-0"
                            onClick={this.createLesson}
                            type="button">
                        <i className={"fa fa-plus"}></i>
                    </button>
                </form>
            </nav>

            <ul className="nav nav-tabs">
                {this.renderLessons}
            </ul>
        </div>
      );
    }
}
