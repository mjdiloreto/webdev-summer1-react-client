import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'

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

const List = (widget, preview) => (
  <h2>List</h2>
)

const dispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) =>
        actions.widgetTextChanged(dispatch, widgetId, newText),

    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),

    widgetAttrChanged: (widgetId, attr, newVal) =>
        actions.widgetAttrChanged(dispatch, widgetId, attr, newVal)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)



const Widget = ({widget, preview, dispatch}) => {
  let selectElement
  return(
    <li className="list-group-item">
        {/*<div className="container"*/}
             {/*style={{border: "1px solid gray", borderCornerShape: "curve", borderRadius: "5px",*/}
                 {/*padding:"10px"}}>*/}
      <div className="row" hidden={preview}>
        {/*{widget.order} {widget.name}*/}

          <div className="col-1">
              <i className = "fa fa-chevron-up"></i>
              <i className = "fa fa-chevron-down"></i>
          </div>

          <div className="col-5">
          <select className="custom-select"
                  value={widget.name}
                  onChange={e =>
              dispatch({
                type: 'SELECT_WIDGET_TYPE',
                id: widget.id,
                name: selectElement.value
              })} ref={node => selectElement = node}>
            <option>Select One</option>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>List</option>
            <option>Image</option>
          </select>
          </div>

          <div className="col-2">
              <button className = "btn btn-danger"
                      onClick={e => (
                dispatch({type: DELETE_WIDGET, id: widget.id})
              )}>Delete</button>
          </div>
      </div>

      <div>
        {widget.name==='Heading' && <HeadingContainer widget={widget}/>}
        {widget.name==='Paragraph' && <ParagraphContainer widget={widget}/>}
        {widget.name==='List' && <ListContainer widget={widget}/>}
        {widget.name==='Image' && <ImageContainer widget={widget}/>}
      </div>
        {/*</div>*/}
    </li>
  )
}

const WidgetContainer = connect(state => ({
  preview: state.preview
}))(Widget)
export default WidgetContainer
