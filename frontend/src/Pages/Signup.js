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

    const handle_login = (e, data) => {
        e.preventDefault();
        console.log( data )
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
            console.log(state)
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
                            <input className="LoginSignupInput"/>
                        </div>
                        
                        <div className="InputWrapper">
                            Password
                            <input type='password' className="LoginSignupInput"/>
                        </div>

                        <div className="HorizontalWrapper">
                            <div className="LoginButton">
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