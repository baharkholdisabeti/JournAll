import React, {useState} from "react";
import './landing.css'
// import mood1 from '../res/mood-1.svg'
// import mood2 from '../res/mood-2.svg'
// import mood3 from '../res/mood-3.svg'
// import mood4 from '../res/mood-4.svg'
// import mood5 from '../res/mood-5.svg'
// import sleep from '../res/sleep.svg'
// import food from '../res/food.svg'
// import exersize from '../res/exersize.svg'
// import time from '../res/time.svg'
import logo from '../res/logo.svg'

const Signup = () => {
    const [state, setState] = useState({
        logged_in: localStorage.getItem('token') ? true : false,
        username: '',
        password: ''
    })

    const handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
        console.log(state)
        setState(state);
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/journal/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            localStorage.setItem('id', json.id);
            setState({
                logged_in: true,
                displayed_form: 'entry',
                username: json.username
            });
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
                    <p className="WelcomeBack"> <img className="LogoLogin" src={logo}/> Nice to Meet You! </p>
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
                            <div className="LoginButton" onClick={(e) => handle_signup(e, state)}>
                                Signup
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="HorizontalWrapper">
                    <a href="/login" className="SignupLink"> Been Here Before? Login!</a>
                </div>

            </div>
                  
        </div> 
    )
}

export default Signup;