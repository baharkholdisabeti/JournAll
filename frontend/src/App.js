import React, { Component } from 'react';
import Nav from './components/Nav';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import DisplayEntries from './components/DisplayEntries';
import './App.css';
import axios from "axios";
import {Route, BrowserRouter as Router } from 'react-router-dom'
import logo from './res/logo.svg'
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Today from './Pages/Today'
import EntriesPage from './Pages/Entries'
import Stats from './Pages/Stats'
 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
        if(this.state.logged_in){
            this.state.displayed_form = 'entry';
        }
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/journal/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ username: json.username });
            });
        }
    }
    
    handle_logout = (e) => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, displayed_form:'', username: '' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup} />;
                break;
            case 'entry':
                form = <DisplayEntries/>//<EntryForm logged_in={this.state.logged_in}/>;
                break;
            default:
                form = null;
        }

        console.log(EntriesPage)
        return (
            <Router>
            <div className="NavBarWrapper">
        <div className="Inline">
          <a href="/" className=" NavLogo">
            <img src={logo} className="LogoImage"/>
            JournAll
          </a>
        </div>
        {this.state.logged_in ? 
            <div className="Inline">
                <a href="/today"  className="NavItem">
                    Today
                </a>
                <a href="/stats"  className="NavItem">
                    Stats
                </a>
                <a href="/entries"  className="NavItem">
                    Entries
                </a>
                <a href='/' onClick={this.handle_logout} className="NavItem">
                    Log out
                </a>
            </div>
            : 
         <div className="Inline">
            <a href='/login' className="NavItem">
              Login
            </a>
            <a href="/signup" className="NavItem">
              Signup
            </a>
        </div>}
      </div>
            {/* <div className="App">
                <Nav
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handle_logout={this.handle_logout}
                />
                {form}
                <h3>
                {this.state.logged_in
                    ? `Hello, ${this.state.username}`
                    : 'Please Log In'}
                </h3>
                
            </div> */}

            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/today" component={Today} />
            <Route path="/entries" component={EntriesPage} />
            <Route path="/stats" component={Stats} />

            </Router>
        );
    }
}

export default App;