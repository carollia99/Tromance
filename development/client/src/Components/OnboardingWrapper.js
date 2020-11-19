import React, { Component } from 'react';
import Onboarding from '../Components/Onboarding';

function OnboardingWrapper(props) {
    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
            <Onboarding history={props.history}/>
        </div>
    )
}

export default OnboardingWrapper;