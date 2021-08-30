import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../components/buttons/Buttons'

const Test = () => {
    return (
        <div>
            
            <Link to={"/"}><button>To Home Page</button></Link>

        <Buttons/>
        

        </div>
    )
}

export default Test
