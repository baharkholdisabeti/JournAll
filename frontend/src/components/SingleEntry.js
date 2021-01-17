import React, {useState, setState} from 'react'; 

class SingleEntry extends React.Component {
    constructor(props) {
        super(props);
        this.entries = {
            title: 'filler',
            entry: 'test test test',
            avgMood: -1,
            sleep: -1,
            exercise: -1,
            downTime:-1,
            healthyEating: -1,
        };
        this.labels = {
            title: 'Title',
            entry: 'Entry',
            avgMood: 'Average Mood',
            sleep: 'Amount of Sleep',
            exercise: 'Exercise',
            downTime: 'Down Time',
            healthyEating: 'Healthy Eating',
        }
        this.isNumber = (name) => {
            return !(name === 'title' || name === 'entry');
        }
        this.set = (name, value) => {
            this.entries[name] = value;
        }
    }
}

export default SingleEntry;
