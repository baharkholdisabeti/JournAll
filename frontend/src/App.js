import React, { Component } from 'react';
import Nav from './components/Nav';
import EntryForm from './components/EntryForm';
import './App.css';
import axios from "axios";

//const InputEntries = () => {
class App extends Component {
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

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form = <EntryForm handle_entry={this.handle_entry} />;
        return (
            <div className="App">
                {form}
            </div>
        );
    }
}

export default App;
