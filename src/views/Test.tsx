import React from 'react'
import { Link } from 'react-router-dom'

const Test = () => {
    return (
        <div>
            Test page 123
            <Link to={"/"}><button>To Home Page</button></Link>
        </div>
    )
}

export default Test
