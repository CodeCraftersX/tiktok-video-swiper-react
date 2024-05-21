/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import './MediaRange.css'

function MediaRange({ setValue, value, click, style}) {
  return (
    <div className='MediaRange' style={style}>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          className="slider"
          onChange={event => {
            setValue(event.target.valueAsNumber)
          }}
          onClick={click}
        />
        <div className="rest" style={{width: `calc(100% - (${value}%) + 5px)`}}></div>
        <div className="done" style={value<30?{width: `calc(${value}% + 10px)`}:{width: `${value}%`}}></div>
    </div>
  )
}

export default MediaRange