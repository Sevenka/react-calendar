import React from 'react';

class Day extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="day">
        <p className="number"></p>
        <div className="events">
          <div className="event"></div>
        </div>
      </div>
    )
  }
}

export default Day;
