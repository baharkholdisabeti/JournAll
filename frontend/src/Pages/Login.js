import React, {useState} from "react";
import './Pages.css'
import mood1 from '../res/mood-1.svg'
import mood2 from '../res/mood-2.svg'
import mood3 from '../res/mood-3.svg'
import mood4 from '../res/mood-4.svg'
import mood5 from '../res/mood-5.svg'
import sleep from '../res/sleep.svg'
import food from '../res/food.svg'
import exersize from '../res/exersize.svg'
import time from '../res/time.svg'
import logo from '../res/logo.svg'
import {Redirect} from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState({
        logged_in: localStorage.getItem('token') ? true: false,
        username: '',
        password: ''
    })

    const handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
        setState(state);
    };

    const handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
            localStorage.setItem('token', json.token);
            localStorage.setItem('id', json.user.id);
            
            setState({...state, logged_in: true})
        });
    };

    if( state["logged_in"] == true){
        console.log("helloo")
        return (
            <Redirect to="/today" />
        )
    }

    return (
        <div className="LoginWrapper">

            <div className="LoginBox">
                <div className="HorizontalWrapper">
                    <p className="WelcomeBack"> <img className="LogoLogin" src={logo}/> Welcome Back! </p>
                </div>
                <div className="HorizontalWrapper">

                        <div className="FormWrapper">
                            <div className="InputWrapper">
                                Username
                                <input className="LoginSignupInput" name="username" onChange={handle_change}/>
                            </div>
                            
                            <div className="InputWrapper">
                                Password
                                <input type='password' className="LoginSignupInput" name="password" onChange={handle_change}/>
                            </div>

                            <div className="HorizontalWrapper">
                                <div className="LoginButton" onClick={(e) => handle_login(e, state)}>
                                    Login
                                </div>
                            </div>
                        </div>

                        
                    
                </div>

                <div className="HorizontalWrapper">
                    <a href="/signup" className="SignupLink"> New Here? Signup!</a>
                </div>
                

                
            </div>
                  
        </div> 
    )
}

export default Login;