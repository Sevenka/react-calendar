import React from 'react';
import { connect } from 'react-redux';
import { initCalendar } from '../actions';

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

  componentDidMount() {
    this.props.initCalendar();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Calendar</h1>
        </header>
        <nav className="controls">
          <button className="btn btn-primary">Today</button>
          <div className="swith">
            <button className="btn btn-light previous">
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button className="btn btn-light next">
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
          <h3>July 2019</h3>
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
  currentView: state.calendar.currentView
});

const mapDispatchToProps = {
  initCalendar
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);