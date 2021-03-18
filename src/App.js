import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookReader
} from '@fortawesome/free-solid-svg-icons'

import BookComponent from './components/books.component';
import CreateComponent from './components/create.component';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EditComponent from './components/edit.component';
import ShowComponent from './components/show.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
          <div className="container">
            <Link to={"/"} className="navbar-brand">
              <FontAwesomeIcon icon={faBookReader} className="mr-2" /> Books
            </Link>
          </div>
        </nav>

        <div className="container px-0">
          <Switch>
            <Route exact path="/" component={BookComponent}></Route>
            <Route exact path="/books/create" component={CreateComponent}></Route>
            <Route exact path="/books/:id" component={ShowComponent}></Route>
            <Route exact path="/books/:id/edit" component={EditComponent}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
