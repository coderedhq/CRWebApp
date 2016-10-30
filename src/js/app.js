'use strict'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Preferences from './components/preferences'
import House from './components/house'
import Recognition from './components/recognition'
import NoMatch from './components/nomatch'

class App extends Component
  {
    constructor(props) {
      super(props)
      this.state = {
          authenticated: false,
          uid: '',
      }
    }
    componentDidMount() {
        $.ajax({
            method: 'POST',
            url: '/web/login',
            data: {email: 'ryandbump@gmail.com', password: 'Beaver1!'},
            dataType: 'json',
            success: (result) => {
                console.log(result)
                this.setState({authenticated: true, uid: result.uid})
            },
            error: function(err) {
                console.error(err)
            }
        })
    }

    render() {
      return(
          <div className="container">
                <h2 style={{textAlign: 'center'}}>Home Manager</h2>
                <div className="col-md-4" style={{textAlign: 'center'}}>
                    <Link className="btn btn-large btn-default" to={`/preferences/${this.state.uid}`} activeStyle={{background: 'darkgrey'}}>Personal Preferences</Link>
                </div>
                <div className="col-md-4" style={{textAlign: 'center'}}>
                    <Link className="btn btn-large btn-default" to={`/house/${this.state.uid}`} activeStyle={{background: 'darkgrey'}}>House Settings</Link>
                </div>
                <div className="col-md-4" style={{textAlign: 'center'}}>
                    <Link className="btn btn-large btn-default" to="/recognition" activeStyle={{background: 'darkgrey'}}>Facial Recognition</Link>
                </div>
                <div className="col-md-12">
                    {this.props.children}
                </div>
          </div>
      )
    }
  }

  ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="preferences/:uid" component={Preferences}/>
      <Route path="house/:uid" component={House}/>
      <Route path="recognition" component={Recognition}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
