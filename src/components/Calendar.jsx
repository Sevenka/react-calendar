import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekdays: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ]
    }
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
        <main className="border">
          <div className="weekdays">
            {this.state.weekdays.map(day => <span key={day} className="name">{day}</span>)}
          </div>
        </main>
      </div>
    );
  }
}

export default Calendar;
