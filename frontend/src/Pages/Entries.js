import React, {useState, useEffect} from "react";
import 'rsuite/dist/styles/rsuite-default.css';
import mood1 from '../res/mood-1.svg'
import mood2 from '../res/mood-2.svg'
import mood3 from '../res/mood-3.svg'
import mood4 from '../res/mood-4.svg'
import mood5 from '../res/mood-5.svg'
import sleep from '../res/sleep.svg'
import food from '../res/food.svg'
import exersize from '../res/exersize.svg'
import time from '../res/time.svg'

import { Calendar , Modal} from 'rsuite';

const EntriesPage = () => {
    const now = new Date(Date.now());
    const month = now.getMonth() +1;
    const year = now.getFullYear();
    const [state, setState] =  useState({showModal: false, title: "", entryDate: "", entry: "", mood: 1, sleep: 1, exercise: 1, time: 1, food: 1, allEntries: [], month: month, year: year})
    const launchModal = (title, mood, date, entry, exersize, sleep, food, time) => {
        setState({showModal: true, title: title, entryDate: date, entry: entry, mood: mood, sleep: sleep, exercise: exersize, time: time, food: food, allEntries: state.allEntries, month: state.month, year: state.year})
    }
    const moodIcons = [mood1, mood2, mood3, mood4, mood5];
    const renderCell = (date) => {
        let myDate = new Date(Date.parse(date)); 

        let theTitle = ""
        let theDate = ""
        let theMood = 0
        let theEntry = ""
        let theExersize = 0
        let theSleep = 0
        let theTime = 0
        let theFood = 0
        
        for(const entry of state.allEntries){
            const entryDate = new Date(Date.parse(entry.date))
            console.log(entryDate.toDateString())
            console.log(myDate.toDateString())
            if( entryDate.toDateString() == myDate.toDateString() ){ // same day
                theTitle = entry.title;
                theDate = myDate.toDateString();
                theMood = entry.avg_mood;
                theExersize = entry.exercise;
                theSleep = entry.sleep;
                theTime = entry.down_time;
                theFood = entry.healthy_eating;
                theEntry = entry.entry;
                return (
                    <div onClick={e=> launchModal(theTitle, theMood, theDate, theEntry, theExersize, theSleep, theFood, theTime)}>
                        <img src={moodIcons[Math.min( Math.max( Math.round(theMood)-1, 0), 4)]} className="CalenderFace"/>
                        <p className="CalenderCellTitle">{theTitle}</p>
                    </div>
                )
            }
        }
    }
    console.log(state)

    const getMonth = (month, year) => {
        fetch('http://localhost:8000/journal/?month=' + month + "&year=" + year, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            console.log("json" , json);
            state.allEntries = json;
            setState(state)
        });
    }

    getMonth(state.month, state.year)

    return (
        <div className="">
            <Modal show={state.showModal}>
                <div className="EntryDisplayModal">
                    <div className="HorizontalWrapper">
                        <p className="ModalEntryTitle"> <img className="FaceIconEntryModal" src={moodIcons[Math.min( Math.max( Math.round(state.mood)-1, 0), 4)]} /> {state.title} ~ {state.entryDate} </p>
                    </div>
                    <div className="HealthStatWrapper">
                       <div className="SingleHeathDisplay"><img className="HealthStatIconDisplay" src={sleep}/>  <p className="HealthStatTextDisplay"> {state.sleep} </p> </div> 
                       <div className="SingleHeathDisplay"><img className="HealthStatIconDisplay" src={exersize}/>  <p className="HealthStatTextDisplay"> {state.exercise} </p> </div> 
                       <div className="SingleHeathDisplay"><img className="HealthStatIconDisplay" src={time}/>  <p className="HealthStatTextDisplay"> {state.time} </p> </div> 
                       <div className="SingleHeathDisplay"><img className="HealthStatIconDisplay" src={food}/>  <p className="HealthStatTextDisplay"> {state.food} </p> </div> 
                    </div>
                    <div className="ModalEntry">
                        {state.entry}
                    </div>
                    <div className="CloseButtonWrapper">
                        <button className="CloseButton" onClick={e=> setState({...state, showModal: false})}>close</button>
                    </div>
                </div>
            </Modal>
            <h3 className="SectionTitle">Your Entries</h3>
            <div className="HorizontalWrapper">
                <Calendar bordered renderCell={renderCell}/>
            </div>       
        </div> 
    )
}

export default EntriesPage;