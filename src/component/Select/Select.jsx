/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import './Select.css'

export class Select extends Component {

    
    constructor() {
        super()
    }


    option({value, children}){
        return (
            <div className='option'>{children}</div>
          )
    }
  render() {
    return (
      <div className='Select'>Select
        <div className="selected"></div>
        {this.props.children}
      </div>
    )
  }
}
export default Select