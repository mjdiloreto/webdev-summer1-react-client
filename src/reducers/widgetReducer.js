import * as constants from "../constants/index"

export const widgetReducer = (state = {widgets: [], activeLessonId: null, preview: false}, action) => {

  let newState;

  switch (action.type) {

    case constants.PREVIEW:
      return {
        widgets: state.widgets,
        preview: !state.preview
      }

    case constants.HEADING_TEXT_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.text = action.text
          }
          return Object.assign({}, widget)
        })
      };

    case constants.HEADING_SIZE_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.size = action.size
          }
          return Object.assign({}, widget)
        })
      }

    case constants.SELECT_WIDGET_TYPE:
      newState = {
        widgets: state.widgets.filter((widget) => {
          if(widget.id === action.id) {
            widget.widgetType = action.widgetType
          }
          return true;
        })
      }
      return JSON.parse(JSON.stringify(newState))

    case constants.SAVE:
      fetch(constants.HOST + '/api/lesson/' + state.activeLessonId + '/widgets', {
        method: 'post',
        body: JSON.stringify(state.widgets),
        headers: {
          'content-type': 'application/json'}
      })
      return state

    case constants.FIND_ALL_WIDGETS:
      newState = Object.assign({}, state);
      newState.widgets = action.widgets;
      return newState;

    case constants.DELETE_WIDGET:
      return {
        widgets: state.widgets.filter(widget => (
          widget.id !== action.id
        ))
      };

      case constants.ADD_WIDGET:
      return {
          ...state,
        widgets: [
          ...state.widgets,
          {
            id: state.widgets.length + 1,
            text: 'New Widget',
            widgetType: 'Paragraph',
            size: '2'
          }
        ]
      };

      case constants.ACTIVE_LESSON_CHANGED:
          newState = Object.assign({}, state);
          newState.widgets = action.widgets;
          newState.activeLessonId = action.activeLessonId;
          return newState;

    default:
      return state
  }
}