import React, {useState, useEffect} from "react";
import './landing.css'
import mood1 from '../res/mood-1.svg'
import mood2 from '../res/mood-2.svg'
import mood3 from '../res/mood-3.svg'
import mood4 from '../res/mood-4.svg'
import mood5 from '../res/mood-5.svg'
import sleep from '../res/sleep.svg'
import food from '../res/food.svg'
import exersize from '../res/exersize.svg'
import time from '../res/time.svg'

const Stats = () => {

    const moods = [mood1, mood2, mood3, mood4, mood5]

    const [state, setState] = useState({
        'sleep': 0, 
        'exercise': 0, 
        'down_time': 0, 
        'avg_mood': 0, 
        'healthy_eating': 0, 
        'numberDays': 0
    })

    useEffect(() => {
        setState(state)
    });

    const calculateAverage = (arrayInputs, arrayNames) => {
        console.log(arrayInputs)
        if( !arrayInputs) {
            return;
        }
        if( !Array.isArray(arrayInputs) ){
           // window.location.replace("http://localhost:3000/login");
            return;
        }
        if (arrayInputs.detail) {
            console.log("here")
            return;
        }
        let count = 0
        
        let ret = new Object();

        arrayNames.forEach( (name, index ) => {
            ret[name] = 0;
        })
        
        console.log(arrayInputs)
        arrayInputs.forEach( (obj, inputIndex) => {
            arrayNames.forEach( (name, index ) => {
                if( !isNaN( Number(obj[name])) ){
                    ret[name] += +obj[name]
                }
            })
            count++ 
        })

        if( count > 0 ){
            arrayNames.forEach( (name ) => {
                state[name] = (ret[name] / count).toFixed(2);
                ret[name] = (ret[name] / count).toFixed(2);
            })
            setState(state);
        }  

        state['numberDays'] = count;
        setState(state)
        console.log("state", state);
        return ret;
    }
    let ex = 1
    const getAvg = () => {
        fetch('http://localhost:8000/journal/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            calculateAverage(json, 
            ['avg_mood', 'healthy_eating', 'exercise', 'sleep', 'down_time']);
        });
    }
    
    getAvg();
    const moodImg = moods[ Math.min( Math.max( Math.round(state.avg_mood)-1, 0), 4) ]
    console.log(Math.min( Math.max( Math.round(state.mood_avg)-1, 0), 4))
    console.log(state.avg_mood)

    return (
        <div className="">
            <h3 className="SectionTitle">Your Stats</h3>
            <div className="HorizontalWrapper">
                <div className="LargeStats">
                    <div className="StatsLargeWrapper">
                        <p className="StoriesCount">
                            {state.numberDays}
                        </p>
                        <p className="StatsLabelLarge">
                            Days Recorded
                        </p>
                    </div>

                    <div className="StatsLargeWrapper">
                        <p className="MoodLabel"><img src={moodImg} />{state.mood_avg}</p>
                        <p className="StatsLabelLarge">
                            Average Mood
                        </p>
                    </div>
                </div>
                
            </div>
                        
                <div className="HorizontalWrapper">
                    <div className="SpaceBetweenWrapper">
                    <div className="StatsSmallWrapper">
                            <img src={sleep}/>
                            <p className="StatsSmallLabel">{state.sleep}</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={exersize}/>
                            <p className="StatsSmallLabel">{state.exercise}</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={time}/>
                            <p className="StatsSmallLabel">{state.down_time}</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={food}/>
                            <p className="StatsSmallLabel">{state.healthy_eating}</p>
                    </div>
                </div>
                </div>
              
        </div> 
    )
}

export default Stats;