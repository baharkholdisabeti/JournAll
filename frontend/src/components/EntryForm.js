import React, {useState, setState} from 'react';
import SingleEntry from './SingleEntry';

const EntryForm = (props) => {
    const entry = new SingleEntry(); 
    const entries = entry.entries;
    const [state, setState] = useState(entries);

    const handle_change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
        console.log(state)
        setState(state);
    };
    
    const entryForm = () => {
        const inputs = Object.keys(entries).map( (name, i) => {
            const isNumber = entry.isNumber(name);
            const input = (
                <div key={i} className={name}>
                <label htmlFor={name}>{entry.labels[name]}</label>
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


    const submitForm = (state) => {
        if (props.logged_in) {
            state['user'] = localStorage.getItem('id');
            fetch('http://localhost:8000/journal/', {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state),
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
            .catch(e=>{console.log(e)});
        }
        else {
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
