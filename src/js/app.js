'use strict'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component
  {
    constructor(props) {
      super(props)
    }
    render() {
      return(
          <div>
              Working...
          </div>
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'))
