import React, {useState} from "react";
import './landing.css'

const Landing = () => {
    return (
        <div className="HorizontalWrapper">
            <div className="LandingWrapper">
            <p className="MeetText">Welcome to</p>
            <h1 className="Title">JournAll</h1>
            <div className="HorizontalWrapper">
            <p className="Description">A  journal designed to help you record
             the most important parts of your day, while
              giving Youtube suggestions:) </p>
              </div>
              <div className="HorizontalWrapper">
                <a className="GetStartedLink" href="/signup">Get Started </a>
              </div>
        </div> 
        </div>
    )
}

export default Landing;