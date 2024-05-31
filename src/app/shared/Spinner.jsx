import React, { Component } from 'react'

const Spinner =({message})=>{
    return (
      <div>
        <div className="spinner-wrapper">
          <div className="donut"></div>
          {message?<p>{message}</p>:null}
        </div>
      </div>
    )
}

export default Spinner
