import React, { Component } from 'react';
import Nav from './components/Nav';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import './App.css';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
        if(this.state.logged_in){
            console.log(localStorage.getItem('token'));
        }
    }

    submitForm = (e) => {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/journal/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(user => {
                e['user'] = user
                fetch('http://localhost:8000/journal/',{
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(e),
                });
                alert(":D");
            });
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
    
    handle_login = (e, data) => {
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
            console.log( json );
            localStorage.setItem('token', json.token);
            this.setState({
                logged_in: true,
                displayed_form: '',
                username: json.user.username
            });
        });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
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
            console.log(json.token);
            this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
            });
        });
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
            default:
                form = <EntryForm />;
        }

        return (
            <div className="App">
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
            </div>
        );
    }
}

export default App;