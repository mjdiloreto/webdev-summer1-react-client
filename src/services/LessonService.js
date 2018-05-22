
const HOST = 'http://localhost:8080'
const LESSON_API_URL = HOST + '/api/lesson'
const NESTED_API_URL = HOST + '/api/course/CID/module/MID/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    // NOTE: The courseId is ignored on server-side, so we just pass junk (0) here
    findAllLessonsForModule(moduleId) {
        return fetch(
            NESTED_API_URL
                .replace('MID', moduleId)
                .replace('CID', 0))
            .then(function (response) {
                return response.json();
            })
    }

    // createModule(courseId, module) {
    //     return fetch(MODULE_API_URL.replace('CID', courseId),
    //         {
    //             body: JSON.stringify(module),
    //             headers: { 'Content-Type': 'application/json' },
    //             method: 'POST'
    //         }).then(function (response)
    //     { return response.json(); })
    // }
    //
    // deleteModule(moduleId) {
    //     console.log("attempting to delete module")
    //     return fetch(HOST + '/api/module/' + moduleId,
    //         {
    //             method: "DELETE"
    //         }
    //     )
    // }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
