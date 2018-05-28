const HOST = 'https://fast-ocean-68598.herokuapp.com';
const MODULE_API_URL = HOST + '/api/course/CID/module';

let _singleton = Symbol();
export default class ModuleService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Singleton!!!');
  }

  findAllModulesForCourse(courseId) {
    return fetch(
      MODULE_API_URL
        .replace('CID', courseId))
      .then(function (response) {
        return response.json();
      })
  }

  createModule(courseId, module) {
    return fetch(MODULE_API_URL.replace('CID', courseId),
      {
        body: JSON.stringify(module),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(function (response)
    { return response.json(); })
  }

  deleteModule(moduleId) {
    return fetch(HOST + '/api/module/' + moduleId,
        {
          method: "DELETE"
        }
    )
  }

  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new ModuleService(_singleton);
    return this[_singleton]
  }
}
