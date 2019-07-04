import React from 'react';

class Calendar extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Calendar</h1>
        </header>
        <nav className="controls">
          <button className="btn btn-primary">Today</button>
          <div className="swith">
            <button className="btn btn-light switch-previous">
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button className="btn btn-light switch-next">
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
          <h3>July 2019</h3>
          <button className="btn btn-light">Month</button>
        </nav>
        <main>
        </main>
      </div>
    );
  }
}

export default Calendar;
