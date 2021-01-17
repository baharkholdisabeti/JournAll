import React, {useState} from "react";
import './Pages.css'
import Step1 from '../res/step1.svg'
import Step1A from '../res/step1Active.svg'
import Step2 from '../res/step2.svg'
import Step2A from '../res/step2Active.svg'
import Step3 from '../res/step3.svg'
import Step3A from '../res/step3Active.svg'
import completeIcon from '../res/complete.svg'
import currentIcon from '../res/arrow.svg'
import {Modal, Row, Slider, SelectPicker } from 'rsuite'
import mood1 from '../res/mood-1.svg'
import mood2 from '../res/mood-2.svg'
import mood3 from '../res/mood-3.svg'
import mood4 from '../res/mood-4.svg'
import mood5 from '../res/mood-5.svg'
import arrow from '../res/nextArrow.svg'
import videoIcon from '../res/video.svg'
import 'rsuite/dist/styles/rsuite-default.css';


const CustomSlider = ({val, onChange}) => {
    const handleStyle = {
        color: 'e1ad9c',
        width: 0,
        height: 0,
      };
  
    const moods = ["Terrible", "Not Super Great", "Average", "Great", "Amazing"]
    const images = [mood1, mood2, mood3, mood4, mood5]
    const renderSmtg = () => {
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}><img className="SliderImg" src={images[val-1]}/></div>
    }
    const node = renderSmtg()
    
    return (
        <div>
            <div className="HorizontalWrapper">
            <div className="SliderContainer">
        <Slider
        min={1}
        max={5}
        value={val}
        barClassName="SliderBar"
        className="custom-slider"
        handleStyle={handleStyle}
        graduated
        tooltip={false}
        handleTitle={renderSmtg()}
        onChange={v => {
          onChange(v);
        }}
      />
        </div>
        </div>

        <div className="HorizontalWrapper SliderMood">
            {val} - {moods[val-1]}
        </div>

        
        </div>
        
        
    )
}



const Today = () => {
    const videosArr = [{title: "The movie", link:"https://www.youtube.com/watch?v=W9BjUoot2Eo&ab_channel=DennisIvy"},
    {title: "The movie", link: "https://www.youtube.com/watch?v=W9BjUoot2Eo&ab_channel=DennisIvy"},
    {title: "The movie", link: "https://www.youtube.com/watch?v=W9BjUoot2Eo&ab_channel=DennisIvy"} ]

    const [state, setState] = useState({activeStep: 1, mood: 3, entry: "", sleep: 3, exersize: 3, time: 3, food: 3, title: "", showModal: false, videos: videosArr})
    console.log(state)
    const is1Active = state.activeStep === 1
    const is2Active = state.activeStep === 2
    const is3Active = state.activeStep === 3
    const is4Active = state.activeStep === 4
    console.log(is1Active)

    const updateMood = (val) => {
        setState({...state, mood: val})
    }

    
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

    const launchModal = (type) => {
        if (type === 1 && is1Active) {
            setState({...state, showModal: true})
        } else if (type === 2 && is2Active) {
            setState({...state, showModal: true})
        } else if (type === 3 && is3Active) {
            setState({...state, showModal: true})
        }
    }

    const dataValues = [{value: '1', label: '1-Not at all'},
                        {value: '2', label: '2-Not really'},
                        {value: '3', label: '3-It was ok'},
                        {value: '4', label: '4-Great'},
                        {value: '5', label: '5-Amazing'},
                        ]

    const getVideos= () => {
        const videos = state.videos.map((v, index) => {

        const vid = (
        <div className="VideoWrapper" key={index}>
            <p className="VideoName">{v.title} </p> <a target="_blank" href={v.link}><img className="VideoIcon" src={videoIcon}/> </a>
        </div>
        )
        return vid
    })
    return videos
    }
    
    const videos = getVideos()

    return (
        <div>
            <Modal show={state.showModal && state.activeStep ===1}>
            <div className="ModalContentWrapper">
                <p className="ModalTitle">How did you feel overall today?</p>
                <CustomSlider val={state.mood} onChange={updateMood}/>
                <img className="ModalNextArrow" onClick={e=> setState({...state, showModal: false, activeStep: 2})} src={arrow}/>
            </div>
            </Modal>
            <Modal show={state.showModal && state.activeStep ===2}>
            <div className="ModalContentWrapper2">
                <p className="ModalTitle">What happened today?</p>
                <input className="JournalEntry" onChange={e=> setState({...state, entry: e.target.value})}/>
                <img className="ModalNextArrow" onClick={e=> setState({...state, showModal: false, activeStep: 3})} src={arrow}/>
            </div>
        </Modal>

        <Modal show={state.showModal && state.activeStep === 3}>
            <div className="ModalContentWrapper3">
                <p className="ModalTitle">Record some Stats for the Day</p>
                <div className="QuestionsWrapper">
                    <p className="HealthStatQuestionPre"> How happy are you with how...</p>
                    <div className="QuestionWrapper2">
                        <p className="HealthStatQuestion">much you exercised today?</p> <SelectPicker searchable={false} size="md" data={dataValues} cleanable={false} onChange={v=> setState({...state, exersize: Number(v)})}/>
                    </div>
                    <div className="QuestionWrapper2">
                        <p className="HealthStatQuestion">much downtime you had today?</p> <SelectPicker searchable={false} size="md" data={dataValues} cleanable={false} onChange={v=> setState({...state, time: Number(v)})}/>
                    </div>
                    <div className="QuestionWrapper2">
                        <p className="HealthStatQuestion">you ate today?</p> <SelectPicker searchable={false} size="md" data={dataValues} cleanable={false} onChange={v=> setState({...state, food: Number(v)})}/>
                    </div>
                    <div className="QuestionWrapper">
                        <p className="HealthStatQuestion">How energized did you feel after waking up?</p> <SelectPicker searchable={false} size="md" data={dataValues} cleanable={false} onChange={v=> setState({...state, sleep: Number(v)})}/>
                    </div>
                </div>
                
                
                <img className="ModalNextArrow" onClick={e=> setState({...state, showModal: false, activeStep: 4})} src={arrow}/>
            </div>
        </Modal>

        
            <h3 className="SectionTitle">Today</h3>
            <div className="HorizontalWrapper">
                <div className="StepsWrapper">
                    <div className="StepWrapper">
                    <img src={is1Active ? Step1A : Step1}/><p onClick={e=>launchModal(1)} className={`StepText ${is1Active && "HighLightStep"}`}>Overall Mood</p> {is1Active && <img className="CurrentIcon" src={currentIcon} />}
                    </div>

                    <div className="StepWrapper">
                    <img src={is2Active ? Step2A : Step2}/><p onClick={e=>launchModal(2)} className={`StepText ${is2Active && "HighLightStep"}`}>Journal Entry</p> {is2Active && <img className="CurrentIcon" src={currentIcon} />}
                    </div>

                    <div className="StepWrapper">
                    <img src={is3Active ? Step3A : Step3}/><p onClick={e=>launchModal(3)} className={`StepText ${is3Active && "HighLightStep"}`}>Health Stats</p> {is3Active && <img className="CurrentIcon" src={currentIcon} />}
                    </div>
                </div>
            </div>
                        
              <div className="HorizontalWrapper">
                  <input placeholder="Give Your Day a Title" onChange={e=> setState({...state, title: e.target.value})} className={`EntryName ${is4Active && "EntryStep"}`}/>
                <a href="/about" > <img className="CompeleteIcon" onClick={e=> handle_entry(e)} src={completeIcon}/></a>
              </div>

              { state.videos.length && <div className="HorizontalWrapper">
                        
            <div className="VideosWrapper">
                <p className="RecosTitle">Based on what we got from you, here are some video suggestions...</p>
                {videos}
            </div>
            
            </div> }     
           
        </div> 
    )

}

export default Today;