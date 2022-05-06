import React from 'react';
import '../App.css'

function LayoutDefault(props) {

  return (
    <div className="App">
      <div className="App-header">
        Edoso 2
      </div>

      <div className="App-container container">
        {props.children}
        <div></div>
      </div>
    </div>
  )

}
export default LayoutDefault;
