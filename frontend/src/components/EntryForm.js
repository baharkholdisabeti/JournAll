import React, {useState, setState} from 'react';

const EntryForm = (props) => {

    const entries = {
        title: 'filler',
        entry: 'test test test',
        avgMood: -1,
        sleep: -1,
        exercise: -1,
        downTime:-1,
        healthyEating: -1,
    }

    const labels = {
        title: 'Title',
        entry: 'Entry',
        avgMood: 'Average Mood',
        sleep: 'Amount of Sleep',
        exercise: 'Exercise',
        downTime: 'Down Time',
        healthyEating: 'Healthy Eating',
    }

    const [state, setState] = useState(entries)

    const handle_change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
        console.log(state)
        setState(state);
    };
    
    const entryForm = () => {
        const inputs = Object.keys(entries).map( (name, i) => {
            const isNumber = !(labels[name] === 'Title' || labels[name] === 'Entry')
            const input = (
                <div key={i} className={name}>
                <label htmlFor={name}>{labels[name]}</label>
                <input
                type= {isNumber ? "number" :"text"}
                name={name}
                onChange={e=> handle_change(e)}
                /> 
                </div>
            )
            return input
        
        })
        return inputs
    };
    
    const handle_entry = (e) =>{
        e.preventDefault();
        /*
        const form = e.target; 
        Object.keys(entries).map( (name, i) => {
            //validate and stuff 
        });
        const inputs;*/
        submitForm(state);
    }


    const submitForm = (e) => {
        if (props.logged_in) {
            fetch('http://localhost:8000/journal/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(user => {
                console.log(user)
                e['user'] = 2;
                fetch('http://localhost:8000/journal/',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(e),
                });
            });
        } else {
            alert("please sign in");
        }
    }

    const entryInputs = entryForm();

    return (
      <form>
        <h4>Make a new entry</h4>
        {entryInputs}
        <button onClick={e => handle_entry(e)}> Submit</button> 
      </form>
    );
}

export default EntryForm;
