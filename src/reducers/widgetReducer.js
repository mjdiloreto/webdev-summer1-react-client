import * as constants from "../constants/index"

export const widgetReducer = (state = {widgets: [], activeLessonId: null, preview: false}, action) => {

  let newState;

  switch (action.type) {

    case constants.PREVIEW:
        newState = Object.assign({}, state);
        newState.preview = !state.preview;
        return newState;

    case constants.WIDGET_TEXT_CHANGED:
        newState = Object.assign({}, state);
        newState.widgets = state.widgets.map(widget => {
            if(widget.id === action.id) {
                widget.text = action.text
            }
            return Object.assign({}, widget)
        });
        return newState;

      // Used to change any attribute of a widget
      case constants.WIDGET_ATTR_CHANGED:
          newState = Object.assign({}, state);
          newState.widgets = state.widgets.map(widget => {
              if(widget.id === action.id) {
                  widget[action.attr] = action.newValue
              }
              return Object.assign({}, widget)
          });
          return newState;

    case constants.HEADING_SIZE_CHANGED:
        newState = Object.assign({}, state);
        newState.widgets = state.widgets.map(widget => {
          if(widget.id === action.id) {
              widget.size = action.size
          }
          return Object.assign({}, widget)
        });
        return newState;

      case constants.SELECT_WIDGET_TYPE:
        newState = Object.assign({}, state);
        newState.widgets = state.widgets.filter((widget) => {
            if(widget.id === action.id) {
                widget.name = action.name
            }
            return true;
        });
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
            text: 'New Widget',
            name: 'Paragraph',
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