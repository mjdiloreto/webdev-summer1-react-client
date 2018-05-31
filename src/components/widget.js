import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import {widgetAttrChanged} from "../actions/index";

const Heading = ({widget, preview, widgetTextChanged, headingSizeChanged}) => {
  let selectElem;
  let inputElem;
  return(
      <div>
      <div hidden={preview}>
        <h2> Heading {widget.size}</h2>
          <input onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                 value={widget.text}
                 ref={node => inputElem = node}/>
          <select className="custom-select custom-select-sm"
                  onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                  value={widget.size}
                  ref={node => selectElem = node}>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
      </div>

      <div hidden={!preview}>
          {widget.size == 1 && <h1>{widget.text}</h1>}
          {widget.size == 2 && <h2>{widget.text}</h2>}
          {widget.size == 3 && <h3>{widget.text}</h3>}
      </div>
    </div>
  )
}

const Paragraph = ({widget, preview, widgetTextChanged}) => {
    let textAreaElem;

    return (
        <div>
        <div hidden={preview}>
            <h2>Paragraph</h2>
            <textarea
                value={widget.text}
                onChange={() => widgetTextChanged(widget.id, textAreaElem.value)}
                ref={node => textAreaElem = node}/>
        </div>
        <div hidden={!preview}>
            <p>{widget.text}</p>
        </div>
        </div>

)}

const Image = ({widget, preview, widgetAttrChanged}) => {
    let inputElem;

    return (
    <div>
        <div hidden={preview}>
            <h2>Image</h2>
            <input onChange={() => widgetAttrChanged(widget.id, "src", inputElem.value)}
                   value={widget.src}
                   ref={node => inputElem = node}/>
        </div>

        <div hidden={!preview}>
            <img src={widget.src}/>
        </div>
    </div>
)
}

const Link = ({widget, preview, widgetAttrChanged}) => {
    let hrefInputElem;
    let textInputElem;

    return (
        <div>
            <div hidden={preview}>
                <h2>Link</h2>
                <input onChange={() => widgetAttrChanged(widget.id, "href", hrefInputElem.value)}
                       value={widget.href}
                       placeholder="url"
                       ref={node => hrefInputElem = node}/>
                <input onChange={() => widgetAttrChanged(widget.id, "text", textInputElem.value)}
                       value={widget.text}
                       placeholder="link text"
                       ref={node => textInputElem = node}/>
            </div>

            <div hidden={!preview}>
                <a href={widget.href}>{widget.text}</a>
            </div>
        </div>
    )
};

const List = ({widget, preview, widgetAttrChanged}) => {
    let inputElem;
    let selectElem;

    return (
        <div>
            <div hidden={preview}>
                <h2>List</h2>
                <select className="custom-select custom-select-sm"
                        onChange={() => widgetAttrChanged(widget.id, "listType", selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="1">Ordered List</option>
                    <option value="2">Unordered List</option>
                </select>
                <textarea onChange={() => widgetAttrChanged(widget.id, "listItems",
                    inputElem.value.replace(/\n/g, "\\\\n"))}
                       value={widget.listItems.replace(/\\\\n/g, "\n")}
                       ref={node => inputElem = node}/>
            </div>

            <div hidden={!preview}>
                {widget.listType == 1 &&
                <ol>
                    {widget.listItems && widget.listItems.split("\\\\n").map((line) =>
                        <li>{line}</li>
                    )}
                </ol>}
                {widget.listType == 2 &&
                <ul>
                    {widget.listItems && widget.listItems.split("\\\\n").map((line) =>
                        <li>{line}</li>
                    )}
                </ul>}
            </div>
        </div>
    )
};

const dispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) =>
        actions.widgetTextChanged(dispatch, widgetId, newText),

    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),

    widgetAttrChanged: (widgetId, attr, newVal) =>
        actions.widgetAttrChanged(dispatch, widgetId, attr, newVal),

    deleteWidget: (widgetId) =>
        actions.deleteWidget(dispatch, widgetId),

    selectWidgetType: (widgetId, name) =>
        actions.selectWidgetType(dispatch, widgetId, name),

    moveWidgetUp: (widgetId, oldOrder) => {
        actions.moveWidgetUp(dispatch, widgetId, oldOrder)
    },

    moveWidgetDown: (widgetId, oldOrder) =>
    {
        actions.moveWidgetDown(dispatch, widgetId, oldOrder)
    }
});

const stateToPropsMapper = state => ({
    preview: state.preview,
    widgets: state.widgets
});

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);


const Widget = ({widget, widgets, preview, deleteWidget, selectWidgetType, widgetAttrChanged,
                moveWidgetUp, moveWidgetDown}) => {
  let selectElement;
  return(
    <li className="list-group-item">

      <div className="row" hidden={preview}>

          <div className="col-1">
              <i className = "fa fa-chevron-up"
                 style={{fontSize: 20, cursor: 'pointer'}}
                 onClick={() => {moveWidgetUp(widget.id, widget.order)}}/>
              <i className = "fa fa-chevron-down"
                 style={{fontSize: 20, cursor: 'pointer'}}
                 onClick={() => {moveWidgetDown(widget.id, widget.order)}}/>
          </div>

          <div className="col-5">
          <select className="custom-select"
                  value={widget.name}
                  ref={node => selectElement = node}
                  onChange={() => selectWidgetType(widget.id, selectElement.value)}>
            <option>Select One</option>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>List</option>
            <option>Link</option>
            <option>Image</option>
          </select>
          </div>

          <div className="col-2">
              <button className = "btn btn-danger"
                      onClick={() => deleteWidget(widget.id)}>Delete</button>
          </div>
      </div>

      <div>
        {widget.name==='Heading' && <HeadingContainer widget={widget}/>}
        {widget.name==='Paragraph' && <ParagraphContainer widget={widget}/>}
        {widget.name==='List' && <ListContainer widget={widget}/>}
        {widget.name==='Link' && <LinkContainer widget={widget}/>}
        {widget.name==='Image' && <ImageContainer widget={widget}/>}
      </div>
    </li>
  )
};

const WidgetContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Widget);
export default WidgetContainer
