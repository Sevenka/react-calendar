import React from 'react';
import { connect } from 'react-redux';
import {
  initCalendar,
  moveTo
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
      ]
    }
  }

  onMoveTo(direction) {
    this.props.moveTo(direction);
  }

  componentDidMount() {
    this.props.initCalendar();
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
          <button className="btn btn-light">Month</button>
        </nav>
        <main>
          <div className="weekdays">
            {this.state.weekdays.map(day => <span key={day} className="name">{day}</span>)}
          </div>
          <div className="days">
            {this.props.currentView.map(day => {
              return <div className="day" key={day.getTime()}>
                  <span className={`badge ${day.getTime() === this.props.today.getTime() ? 'badge-primary' : 'badge-light'}`}>{day.getDate()}</span>
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
  currentView: state.calendar.currentView
});

const mapDispatchToProps = {
  initCalendar,
  moveTo
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
