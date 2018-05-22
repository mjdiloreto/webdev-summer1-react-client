import React from 'react'
import LessonService from '../services/LessonService'

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moduleId: props.moduleId,
            title: "",
            lessons: [],
        }
        this.lessonService = LessonService.instance;

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.findLessonsForModule(this.props.moduleId);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId})
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.findLessonsForModule(newProps.moduleId);
    }

    findLessonsForModule(moduleId) {
        // this.lessonService.findAllLessons()
        // .then((lessons) => {
        //     console.log(lessons);
        //     this.setState({lessons: lessons})
        // });

        // No module has been selected
        if(moduleId === null) {
            return;
        }

        this.lessonService.findAllLessonsForModule(moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons});
            });
    }

    createLesson() {
        alert("created a lesson {" + this.state.title + "}")
    }

    titleChanged(event) {
        this.setState({title: event.target.value});
    }

    renderLessons() {
        console.log("lessons");
        console.log(this.state.lessons)
        let lessons = this.state.lessons.map((lesson) => {
          return <li className="nav-item"><a className="nav-link active"
                                             href="#">{lesson.title}</a></li>
        });
        return lessons
        // let l = "" + JSON.stringify(this.state);
        // return <p>{l}</p>;
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
