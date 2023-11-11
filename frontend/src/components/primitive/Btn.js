import React from 'react'

const Btn = (props) => {
  return (
    <button className="bg-lime-800 text-white py-2 px-4 rounded hover:bg-lime-700">{props.label}</button>
  )
}


export default Btn
