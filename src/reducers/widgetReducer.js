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

      case constants.MOVE_WIDGET_UP:
          newState = Object.assign({}, state);
          newState.widgets = moveWidgetUp(action.id, action.oldOrder, newState.widgets);
          return JSON.parse(JSON.stringify(newState));

      case constants.MOVE_WIDGET_DOWN:
          newState = Object.assign({}, state);
          newState.widgets = moveWidgetDown(action.id, action.oldOrder, newState.widgets);
          return JSON.parse(JSON.stringify(newState));

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
          let newOrder = state.widgets.length;

          return {
              ...state,
            widgets: [
              ...state.widgets,
              {
                text: 'New Widget',
                name: 'Heading',
                size: '2',
                listType: '1',
                order: newOrder
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

const moveWidgetUp = (widgetId, oldOrder, widgets) => {
    return JSON.parse(JSON.stringify(widgets.map((widget) => {
            let newWidget = Object.assign({}, widget);;

            if(widget.id === widgetId) {
                widget.order ? newWidget.order = widget.order - 1 : newWidget.order = widget.order;
                return newWidget;
            } if (widget.order === oldOrder - 1) {  // swap places with the widget that moved
                newWidget.order = oldOrder;
                return newWidget;
            }
            return newWidget;
        }
    )));
}

const moveWidgetDown = (widgetId, oldOrder, widgets) => {
    let length = widgets.length;
    return JSON.parse(JSON.stringify(widgets.map((widget) => {
            let newWidget = Object.assign({}, widget);

            if(widget.id === widgetId) {
                widget.order === length ? newWidget.order = widget.order : newWidget.order = widget.order + 1;
                return newWidget;
            } if (widget.order === oldOrder + 1) {  // swap places with the widget that moved
                newWidget.order = oldOrder;
                return newWidget;
            }
            return newWidget;
        }
    )));
}