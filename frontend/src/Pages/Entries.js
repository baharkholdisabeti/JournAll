import React, {useState} from "react";

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

    const [state, setState] =  useState({showModal: false, title: "", entryDate: "", entry: "", mood: 1, sleep: 1, exercise: 1, time: 1, food: 1})
    const launchModal = (title, mood, date, entry, exersize, sleep, food, time) => {
        setState({showModal: true, title: title, entryDate: date, entry: entry, mood: mood, sleep: sleep, exercise: exersize, time: time, food: food})
    }

    const moodIcons = [mood1, mood2, mood3, mood4, mood5]

    const renderCell = (date) => {
        const theTitle = "my day today"
        const theDate = "March 22"
        const theMood = 2
        const theEntry = "the text in the entry, the text in the entry, the text in the entry, the text in the entry, the text in the entry, the text in the entry, the text in the entry, the text in the entry"
        const theExersize = 5
        const theSleep = 3
        const theTime = 4
        const theFood = 1

        return (
            <div onClick={e=> launchModal(theTitle, theMood, theDate, theEntry, theExersize, theSleep, theFood, theTime)}>
                <img src={mood1} className="CalenderFace"/>
                <p className="CalenderCellTitle">Insert title of the journal entry</p>
            </div>
        )
    }
    console.log(state)

    return (
        <div className="">
            <Modal show={state.showModal}>
                <div className="EntryDisplayModal">
                    <div className="HorizontalWrapper">
                        <p className="ModalEntryTitle"> <img className="FaceIconEntryModal" src={moodIcons[state.mood-1]} /> {state.title} ~ {state.entryDate} </p>
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