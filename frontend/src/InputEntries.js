import React, { Component } from 'react';
import Nav from './components/Nav';
import EntryForm from './components/EntryForm';
import './App.css';
import axios from "axios";

const InputEntries = () => {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
        };
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

    return (
        <div className="App">
            <Nav
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handle_logout={this.handle_logout}
            />
            <EntryForm />
            <h3>
                {this.state.logged_in
                    ? `Hello, ${this.state.username}`
                    : 'Please Log In'}
            </h3>
        </div>
    );
}

export default InputEntries;
