import React from 'react';
import Btn from "../primitive/Btn";

const Nav = (props) => {
  return (
    <div className='Container flex justify-between'>
        <div className='LeftChildContainer flex basis-1/2 h-20 items-center justify-between ml-24'>
            <p className="text-2xl text-green-800">{props.title}</p>
        </div>
        <div className='RightChildContainer flex basis-1/3 h-20 items-center justify-between mr-24'>
            <p>Search</p>
            <p>Today's Recipe</p>
            <Btn label={"Basket (3)"}/>
        </div>
    </div>
  )
}

export default Nav