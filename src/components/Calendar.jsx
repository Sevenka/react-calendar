import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  initCalendar,
  setCalendarMode,
  moveTo,
  getEvents,
  setEditedEvent,
  deleteEvent
} from '../actions';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekdays: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ],
      currentViewWithEvents: []
    }
  }

  onMoveTo(direction) {
    this.props.moveTo(direction);
    this.onGetEvents();
  }

  onGetEvents() {
    this.props.getEvents(this.state.mode)
      .then(() => {
        let currentViewWithEvents = this.props.currentView.map(day => {
          let eventsByDay = this.props.events.filter(item => day.date.getDate() === item.day);
          return {
            ...day,
            events: eventsByDay.slice()
          }
        });
        this.setState({ currentViewWithEvents });
    });
  }

  goToCreateEvent(e, date) {
    if (e.target !== e.currentTarget)
      return;
    this.props.history.push({
      pathname: '/new',
      state: { date }
    });
  }

  goEditEvent(e, eventItem) {
    if (e.target.type === 'button')
      return;
    this.props.setEditedEvent(eventItem);
    this.props.history.push('/edit');
  }

  onDeleteEvent(id, eventIndex, dayIndex) {
    this.props.deleteEvent(id)
      .then(() => {
        let currentViewWithEvents = this.state.currentViewWithEvents.slice();
        currentViewWithEvents[dayIndex].events.splice(eventIndex, 1);
        this.setState({ currentViewWithEvents });
      })
  }

  onInitCalendar() {
    this.props.initCalendar();
    this.onGetEvents();
  }

  onSetMode(mode) {
    if (mode === this.props.mode)
      return;

    this.props.setCalendarMode(mode);
    this.onInitCalendar();
  }

  componentDidMount() {
    this.onInitCalendar();
  }

  render() {
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(this.props.currentDatePoint);

    return (
      <div className="container">
        <header>
          <h1>Calendar</h1>
        </header>
        <nav className="controls">
          <button
            className="btn btn-primary"
            onClick={() => this.onMoveTo('today')}>
            Today
          </button>
          <div className="switch">
            <button
              className="btn btn-light previous"
              onClick={() => this.onMoveTo('backward')}>
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              className="btn btn-light next"
              onClick={() => this.onMoveTo('forward')}>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
          <h3 className="mr-auto">{currentMonthName} {this.props.currentDatePoint && this.props.currentDatePoint.getFullYear()}</h3>
          <div className="btn-group">
            <button
              className={`btn ${this.props.mode === 'month' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => this.onSetMode('month')}>
              Month
            </button>
            <button
              className={`btn ${this.props.mode === 'week' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => this.onSetMode('week')}>
              Week
            </button>
          </div>
        </nav>
        <main>
          <div className="weekdays">
            {this.state.weekdays.map(day => <span key={day} className="name">{day}</span>)}
          </div>
          <div className="days">
            {this.state.currentViewWithEvents.map((day, dayIndex) => {
              return <div
                  className="day"
                  key={day.date.getTime()}
                  onClick={(e) => this.goToCreateEvent(e, day.date)}>
                  <span className={`badge ${day.date.getTime() === this.props.today.getTime() ? 'badge-primary' : 'badge-light'}`}>{day.date.getDate()}</span>
                  {day.events.map((item, eventIndex) => {
                    return <div
                      key={item._id}
                      className="badge badge-info mt-1 d-flex align-items-center"
                      onClick={(e) => this.goEditEvent(e, item)}>
                      <span>{item.name}</span>
                      <button
                        className="btn btn-sm btn-danger ml-auto"
                        type="button"
                        onClick={() => this.onDeleteEvent(item._id, eventIndex, dayIndex)}>
                        X
                      </button>
                    </div>
                  })}
                </div>
            })}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  today: state.calendar.today,
  currentDatePoint: state.calendar.currentDatePoint,
  currentView: state.calendar.currentView,
  mode: state.calendar.mode,
  events: state.events.items
});

const mapDispatchToProps = {
  initCalendar,
  setCalendarMode,
  moveTo,
  getEvents,
  setEditedEvent,
  deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar));
