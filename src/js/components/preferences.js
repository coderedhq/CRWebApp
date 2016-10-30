'use strict'
import React, { Component, PropTypes } from 'react'

export default class Preferences extends Component
  {
    constructor(props) {
      super(props)
      this.state = {
          houseId: '',
          name: '',
          admin: false,
          preferences: null,
          temp: '',
          range: ''
      }
    }
    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: `/api/data/house/${this.props.params.uid}`,
            dataType: 'json',
            success: (result) => {
                this.setState({houseId: result.houseId}, () => {
                    this.getUserData()
                })
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    getUserData() {
        $.ajax({
            method: 'GET',
            url: `/api/data/user/${this.state.houseId}/${this.props.params.uid}`,
            dataType: 'json',
            success: (result) => {
                this.setState({
                    name: result.name,
                    admin: result.admin,
                    preferences: result.preferences,
                    temp: result.preferences.temp,
                    range: result.preferences.range
                }, () => {
                    console.log(this.state.preferences)
                })
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    updatePrefs(){
      $.ajax({
          method: 'PUT',
          url: '/api/data/user/update',
          data: {uid: this.props.params.uid, houseId: this.state.houseId, },
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
    handleChange(event){
        this.setState({
            temp: event.target.value
        })
    }
    handleSelect(event){
      this.setState({
        range: event.target.value
      })
    }

    showUserData() {
        if (this.state.name !== '') {
            return (
                <div className="container">
                    <div className="col-md-6">
                        <h2>{this.state.name}</h2>
                        {this.adminMarker()}
                    </div>
                    <div className="col-md-6">
                        <p><strong>Temperature Preferences</strong></p>
                        <input type="text" value={this.state.temp} onChange={::this.handleChange}/>
                        <select value={this.state.range} onChange={::this.handleSelect}>
                            <option value='+'>Keep Above</option>
                            <option value='-'>Keep Below</option>
                            <option value='range'>Keep between</option>
                        </select>
                        <button onClick={this.updatePrefs}>Submit</button>
                    </div>
                </div>
            )
        }
    }
    adminMarker() {
        if (this.state.admin) {
            return (
                <span>
                    <span className="glyphicon glyphicon-tower" aria-hidden="true"></span> Admin
                </span>
            )
        }
    }
    displayTempPrefs() {
        var descriptor = ''
        if (this.state.preferences.range === '+') {
            descriptor = 'Keep Above'
        } else if (this.state.preferences.range === '-') {
            descriptor = 'Keep Below'
        } else {
            descriptor = 'Keep Within ' + this.state.preferences.range + ' Degrees Of'
        }

        return (
            <p>
                {descriptor + ' ' + this.state.preferences.temp}
            </p>
        )
    }
    render() {
      return(
          <div className="jumbotron">
              <h3>Personal Preferences</h3>
              {this.showUserData()}
          </div>
      )
    }
  }
