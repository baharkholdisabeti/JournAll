import React, {useState} from "react";
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
    const numberDays = 75
    return (
        <div className="">
            <h3 className="SectionTitle">Your Stats</h3>
            <div className="HorizontalWrapper">
                <div className="LargeStats">
                    <div className="StatsLargeWrapper">
                        <p className="StoriesCount">
                            {numberDays}
                        </p>
                        <p className="StatsLabelLarge">
                            Days Recorded
                        </p>
                    </div>

                    <div className="StatsLargeWrapper">
                        <p className="MoodLabel"><img src={mood5} /> (4.7)</p>
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
                            <p className="StatsSmallLabel">4.5</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={exersize}/>
                            <p className="StatsSmallLabel">4.5</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={time}/>
                            <p className="StatsSmallLabel">4.5</p>
                    </div>
                    <div className="StatsSmallWrapper">
                            <img src={food}/>
                            <p className="StatsSmallLabel">4.5</p>
                    </div>
                </div>
                </div>
              
        </div> 
    )
}

export default Stats;