import * as constants from "../constants/index"

const HOST1 = 'https://fast-ocean-68598.herokuapp.com'
const HOST = 'http://localhost:8080'

export const widgetTextChanged = (dispatch, widgetId, newText) => (
  dispatch({
    type: constants.WIDGET_TEXT_CHANGED,
    id: widgetId,
    text: newText})
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
  dispatch({
    type: constants.HEADING_SIZE_CHANGED,
    id: widgetId,
    size: newSize})
)
export const widgetAttrChanged = (dispatch, widgetId, attr, newValue) => (
    dispatch({
        type: constants.WIDGET_ATTR_CHANGED,
        id: widgetId,
        attr: attr,
        newValue: newValue})
)
export const findAllWidgets = dispatch => {
  fetch(HOST + '/api/widget')
    .then(response => (response.json()))
    .then(widgets => dispatch({
      type: constants.FIND_ALL_WIDGETS,
      widgets: widgets }))
}
export const addWidget = dispatch => (
  dispatch({type: constants.ADD_WIDGET})
)
export const deleteWidget = (dispatch, widgetId) => (
    dispatch({type: constants.DELETE_WIDGET, id: widgetId})
)
export const moveWidgetUp = (dispatch, widgetId, oldOrder) => {
    dispatch({type: constants.MOVE_WIDGET_UP, id: widgetId, oldOrder: oldOrder})
}
export const moveWidgetDown = (dispatch, widgetId, oldOrder) => {
    dispatch({type: constants.MOVE_WIDGET_DOWN, id: widgetId, oldOrder: oldOrder})
}

export const selectWidgetType = (dispatch, widgetId, text) => (
    dispatch({
        type: 'SELECT_WIDGET_TYPE',
        id: widgetId,
        name: text
    })
)
export const save = dispatch => (
  dispatch({type: constants.SAVE})
)
export const preview = dispatch => (
  dispatch({type: constants.PREVIEW})
)
export const changeActiveLesson = (dispatch, newLessonId) => {
    if(newLessonId === null) {
        return;
    }

    fetch(HOST + '/api/lesson/' + newLessonId + '/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch(
            {type: constants.ACTIVE_LESSON_CHANGED,
                activeLessonId: newLessonId,
                widgets: widgets}
            )
        )
}