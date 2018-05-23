import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'

export default class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      activeModule: {id: 0},
      module: { title: '' },
      modules: [],
      onActiveModuleChange: props.onActiveModuleChange
    };
    this.createModule = this.createModule.bind(this);
    this.titleChanged = this.titleChanged.bind(this);

    this.setCourseId = this.setCourseId.bind(this);
    this.setActiveModule = this.setActiveModule.bind(this);
    this.unmountModule = this.unmountModule.bind(this);

    this.moduleService = ModuleService.instance;
  }
  setModules(modules) {
    this.setState({modules: modules})
  }
  unmountModule(id) {
    this.state.modules.filter((module) => module.id !== id);
    this.findAllModulesForCourse(this.state.courseId);
  }
  findAllModulesForCourse(courseId) {
    this.moduleService
      .findAllModulesForCourse(courseId)
      .then((modules) => {this.setModules(modules)});
  }
  setActiveModule(moduleId) {
    this.state.onActiveModuleChange(moduleId);
    this.setState({activeModule: this.findModuleById(moduleId)});
  }
  findModuleById(moduleId) {
      for (let module of this.state.modules) {
          if (module.id === moduleId) {
            return module;
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
    this.moduleService
      .createModule(this.props.courseId, this.state.module)
        .then(() => this.findAllModulesForCourse(this.state.courseId));
  }
  titleChanged(event) {
    this.setState({module: {title: event.target.value}});
  }
  renderListOfModules() {
    let modules = this.state.modules.map(function(module){
      if (module.id === this.state.activeModule.id) {
        return <ModuleListItem class_name="active"
                               module={module}
                               key={module.id}
                               unmount={this.unmountModule.bind(this)}
                               on_click={this.setActiveModule.bind(this)}/>
      }
      return <ModuleListItem class_name=" "
                             module={module}
                             key={module.id}
                             unmount={this.unmountModule.bind(this)}
                             on_click={this.setActiveModule.bind(this)}/>
    }, this);
    return modules;
  }
  render() {
    return (
      <div>
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
