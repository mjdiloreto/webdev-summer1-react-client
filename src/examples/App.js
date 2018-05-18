import React from 'react';
import Hello from '../components/Hello';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

const Page1 = () => {
  return(<h2>Page 1</h2>)
};

const Page2 = () => {
  return(<h2>Page 2</h2>)
};

const PageParam = ({match}) => {
  return(
    <h2>PageParam {match.params.id}
    </h2>
  )
};

class PageUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.updatePage =
      this.updatePage.bind(this);


    this.state = {
      id: ''
    }
  }

  componentDidMount() {
    this.updatePage
    (this.props.match.params.id);
  }
  componentWillReceiveProps(newProps){
    this.updatePage
    (newProps.match.params.id);
  }

  updatePage(id) {
    this.setState({id: id});
  }

  render() {
    return(
      <h2>PageUpdate
        {this.state.id}
      </h2>
);}}


const App = () => {
  return(
    <Router>
      <div>
        <Link to="/hello">Hello</Link> |
        <Link to="/page1">Page 1</Link> |
        <Link to="/page2">Page 2</Link> |
        <Link to="/pageParam/123">
          Page 123</Link> |
        <Link to="/pageParam/234"> |
          Page 234</Link>

        <Link to="/pageUpdate/345">
          PageUpdate 345</Link>
        <Link to="/pageUpdate/456">
          PageUpdate 456</Link>
        <Route path='/pageUpdate/:id'
               component={PageUpdate}/>


        <Route path='/hello' component={Hello}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/page2" component={Page2}/>
        <Route path='/pageParam/:id'
               component={PageParam}/>
      </div>
    </Router>
  );
};

export default App;