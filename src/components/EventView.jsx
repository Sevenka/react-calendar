import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addEvent,
  onSetEditedEvent,
  editEvent
} from '../actions';

class EventView extends React.Component {
  constructor(props) {
    super(props);
    const createEventDate = this.props.location.state ? this.props.location.state.date : '';
    const editedEventDate = props.editedEvent && {
      year: props.editedEvent.year,
      month: props.editedEvent.month,
      day: props.editedEvent.day
    };

    this.state = {
      name: props.editedEvent ? props.editedEvent.name : '',
      description: props.editedEvent ? props.editedEvent.description : '',
      date: editedEventDate ? this.getInitialDate(editedEventDate) : createEventDate ? this.getInitialDate(createEventDate) : '',
      _id: props.editedEvent ? props.editedEvent._id : ''
    }
  }

  getInitialDate(date) {
    let year, month, day;

    if (date instanceof Date) {
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();

    } else {
      year = date.year;
      month = date.month;
      day = date.day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  submitEvent(e) {
    e.preventDefault();
    const newEventDate = new Date(this.state.date);
    let newEvent = {
      name: this.state.name,
      description: this.state.description,
      day: newEventDate.getDate(),
      month: newEventDate.getMonth() + 1,
      year: newEventDate.getFullYear(),
      ...this.state._id && { _id: this.state._id }
    };

    if (this.props.type === 'new') {
      this.props.addEvent(newEvent);
      this.props.history.push('/');
    } else {
      this.props.editEvent(newEvent);
      this.handleBack();
    }
  }

  handleBack() {
    this.props.onSetEditedEvent(null);
    this.props.history.push('/');
  }

  onValueChange(e) {
    let key = e.target.name;
    let value = e.target.value;
    this.setState({ [key]: value });
  }

  render() {
    const title = this.props.type === 'new' ? 'Create new event' : 'Edit event';
    const backLink = this.props.type === 'new' ?
      <Link
        to="/"
        className="btn btn-light mt-2">
        Go back
      </Link>
      :
      <button
        className="btn btn-light mt-2"
        onClick={() => this.handleBack()}>
        Go back
      </button>;

    return (
      <div className="container">
        {backLink}
        <h1>{title}</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={this.state.name}
              onChange={(e) => this.onValueChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={this.state.description}
              onChange={(e) => this.onValueChange(e)}>
            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              id="date"
              value={this.state.date}
              onChange={(e) => this.onValueChange(e)} />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => this.submitEvent(e)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editedEvent: state.events.editedEvent
});

const mapDispatchToProps = {
  addEvent,
  onSetEditedEvent,
  editEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventView));
