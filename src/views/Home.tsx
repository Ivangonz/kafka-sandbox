import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import { routes } from '../config/router';

const Home = () => {
    return (
        <div>
            Home test 123
            <Link to={"/test"}><button>To Test Page</button></Link>
        </div>
    )
}

export default Home
