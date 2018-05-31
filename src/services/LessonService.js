
const HOST = 'https://fast-ocean-68598.herokuapp.com'
const HOST1 = 'http://localhost:8080'
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

    findAllLessons() {
        return fetch(LESSON_API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(function (response) {
            return response.json();
        });
    }

    createLesson(moduleId, lesson) {
        return fetch(NESTED_API_URL.replace('CID', 0).replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL + "/" + lessonId,
            {
                method: "DELETE"
            }
        )
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
