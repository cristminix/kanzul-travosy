// import React, { Component } from 'react'

const Spinner = ({ message, independent = false }) => {
  if (independent)
    return (
      <div className="spinner-wrapper independent">
        <div className="donut"></div>
        {message ? <p>{message}</p> : null}
      </div>
    )
  return (
    <div>
      <div className="spinner-wrapper">
        <div className="donut"></div>
        {message ? <p>{message}</p> : null}
      </div>
    </div>
  )
}

export default Spinner
