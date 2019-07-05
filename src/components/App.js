import React from 'react';
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Calendar from './Calendar';
import EventView from './EventView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          render={() => <Calendar />}
        />
        <Route
          path="/new"
          render={() => <EventView type="new" />}
        />
        <Route
          path="/edit"
          render={() => (
            this.props.editedEvent ? (
              <EventView type="edit" />
            ) : (
              <Redirect to="/"/>
            )
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    editedEvent: state.events.editedEvent
  }
}

export default connect(mapStateToProps)(App);
