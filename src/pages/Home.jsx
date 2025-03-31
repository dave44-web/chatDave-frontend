import React from 'react'
import avatar from '../assets/Avatar.png'
import avatar2 from '../assets/Avatar2.gif'
import blob from '../assets/blob.gif'
import note from '../assets/note.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Home'>
        <h1 className='header'>Chat DAVE</h1>
        <div className="section1">
            <div className="row1">
                <h1>Level Up your learning Curve With AI. <br />Helps you learn faster and better.</h1>
                <Link className='link' to='/login'>Try It Out</Link>
            </div>
            <div className="row2">
                <img src={avatar2} alt="" />
            </div>
        </div>
        <div className="section2">
            <div className="row1">
                <img src={note} alt="" />
            </div>
            <div className="row2">
                <h1>Take Note during classes or study sessions,<br />For future purposes</h1>
            </div>
        </div>
    </div>
  )
}

export default Home