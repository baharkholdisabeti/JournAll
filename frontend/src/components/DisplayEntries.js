import React, {useState, setState} from 'react';
import SingleEntry from './SingleEntry';

const DisplayEntries = (props) => {
    const getMonth = (month, year) => {
        fetch('http://localhost:8000/journal/?month=' + month + "&year=" + year, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
    }

    const getDay = (day, month, year) => {
        fetch('http://localhost:8000/journal/?day=' + day + '&month=' + month + "&year=" + year, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
    }

    const calculateAverage = (arrayInputs, arrayNames) => {
        let count = 0
        
        let ret = new Object();

        arrayNames.forEach( (name, index ) => {
            ret[name] = 0;
        })
        
        arrayInputs.forEach( ( obj ) => {
            arrayNames.forEach( (name, index ) => {
                ret[name] += +obj[name]
            })
            count++ 
        })

        if( count > 1 ){
            arrayNames.forEach( (name ) => {
                ret[name] = ret[name] / count 
            })
        }  
        
        return ret;
        
    }

    const getAvg = (month, year) => {
        fetch('http://localhost:8000/journal/?month' + month + "&year=" + year, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            
            //const average_mood = Object.avg_mood(json)
            //.reduce((avg, { avg_mood }, _, { length }) => avg + avg_mood / length, 0);
            //console.log(average_mood);
        });
    }


    const handleOnSubmit =  (e) =>{
        e.preventDefault();
        const month = document.getElementById("month").value 
        const day = document.getElementById("day").value 
        const year = document.getElementById("year").value
        getAvg( month, year );
    }
    

    return (
        <form id="theform">
            Month<input name="month" id="month"></input>    
            Day<input name="day" id="day"></input>
            Year<input name="year" id="year"></input>   
            <button onClick={e => handleOnSubmit(e)}> Submit</button>      
        </form>
    )
}

export default DisplayEntries;
