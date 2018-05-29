import React from 'react'
import LessonService from '../services/LessonService'

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moduleId: props.moduleId,
            title: "",
            lessons: [],
            activeLesson: null
        }
        this.lessonService = LessonService.instance;

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.findLessonsForModule(this.props.moduleId);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId})
    }

    setActiveLesson(lessonId) {
        this.props.onActiveLessonChange(lessonId);
        this.setState({activeLesson: lessonId});
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.findLessonsForModule(newProps.moduleId);
    }

    findLessonsForModule(moduleId) {
        // No module has been selected
        if(moduleId === null) {
            return;
        }

        this.lessonService.findAllLessonsForModule(moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons});
                console.log(this.state.lessons);
            });
    }

    createLesson() {
        if(this.state.moduleId) {
            this.lessonService.createLesson(this.state.moduleId, {title: this.state.title})
                .then(() => this.findLessonsForModule(this.state.moduleId));
        }
        else {
            alert("You must select a Module from the list to add a lesson.")
        }
    }

    titleChanged(event) {
        this.setState({title: event.target.value});
    }

    deleteLesson(event) {
        var conf = window.confirm("Are you sure you want to delete the lesson?");
        if (conf) {
            let id = event.currentTarget.id
            this.lessonService.deleteLesson(id)
                .then(() => this.findLessonsForModule(this.state.moduleId))
        }
    }

    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return (
                <li className="nav-item" onClick={() => this.setActiveLesson(lesson.id)}>
                <div className="btn-group">
                    <a className= {this.state.activeLesson === lesson.id ?
                        "nav-link bg-primary text-white"
                        : "nav-link"}>{lesson.title}</a>
                    <button id={lesson.id} type="button" className="btn btn-danger" onClick={this.deleteLesson}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                </li>
            )
        });
        return lessons
    }

    render() { return(
        <div>
            <nav className="navbar">
                <a className="navbar-brand">Lessons</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2"
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
                {this.renderLessons()}
            </ul>
        </div>
      );
    }
}
