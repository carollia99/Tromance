import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import './Onboarding.css';

function Onboarding() {
    const [stage, setStage] = useState('email');
    const [email, setEmail] = useState("");
    
    const history = useHistory();
    function emailDone() {
        setStage("bio");
    }
    if(stage === "email") {
        return(
            <div>
                <h1>What’s your USC email?</h1>
                <div>Verify that you are a USC student by entering your usc.edu email</div>
                <div>Email</div>
                <input></input>
                <button onClick={emailDone}>Next</button>
            </div>
        );
    }
    else {
        return (
            <div>Done with email.</div>
        )
        
    }
}

export default Onboarding;