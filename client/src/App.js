import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemIndex from './components/ItemIndex';
import EditItem from './components/EditItem';

export default class App extends React.Component {
  render() {
      return (
          <div>
              <Router>
                  <div>
                      <Route path='/add-item' component={ AddItem } />
                      <Route path='/index' component={ ItemIndex } />
                      <Route path='/edit/:id' component={EditItem} />
                  </ div>
              </ Router>
          </ div>
      );
  }
}
