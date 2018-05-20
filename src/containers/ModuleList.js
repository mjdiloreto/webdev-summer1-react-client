import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'

export default class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      activeModule: {},
      module: { title: '' },
      modules: []
    };
    this.createModule = this.createModule.bind(this);
    this.titleChanged = this.titleChanged.bind(this);

    this.setCourseId = this.setCourseId.bind(this);

    this.moduleService = ModuleService.instance;

  }
  setModules(modules) {
    console.log("setting modules " + modules[1].id)
    this.setState({modules: modules})
  }
  findAllModulesForCourse(courseId) {
    this.moduleService
      .findAllModulesForCourse(courseId)
      .then((modules) => {this.setModules(modules)});
  }
  setActiveModule(moduleId) {
    this.setState({activeModule: this.findModuleById(moduleId)});
    this.render();
  }
  findModuleById(moduleId) {
      for (let module of this.state.modules) {
        console.log("module id is " + module.id)
          if (module.id === moduleId) {
            this.setState({activeModule: module});
          }
      }
  }
  setCourseId(courseId) {
    this.setState({courseId: courseId});
  }
  componentDidMount() {
    this.setCourseId(this.props.courseId);
  }
  componentWillReceiveProps(newProps){
    this.setCourseId(newProps.courseId);
    this.findAllModulesForCourse(newProps.courseId)
  }
  createModule() {
    console.log(this.state.module);
    this.moduleService
      .createModule(this.props.courseId, this.state.module)
  }
  titleChanged(event) {
    console.log(event.target.value);
    this.setState({module: {title: event.target.value}});
  }
  renderListOfModules() {
    let active_module = this.state.activeModule;

    let modules = this.state.modules.map(function(module){
      if (module.id === active_module.id) {
        return <ModuleListItem class_name="active"
                               module={module}
                               key={module.id}/>
      }
      return <ModuleListItem class_name=" "
                             module={module}
                             key={module.id}/>
    });
    return modules;
  }
  render() {
    return (
      <div>
        <h3>Module List for course: {this.state.courseId}</h3>
        <input onChange={this.titleChanged}
               value={this.state.module.title}
               placeholder="title"
               className="form-control"/>
        <button onClick={this.createModule} className="btn btn-primary btn-block">
          <i className="fa fa-plus"></i>
        </button>
        <br/>
        <ul className="list-group">
          {this.renderListOfModules()}
        </ul>
      </div>
    );
  }
}
