import React, { Component } from 'react';
import './Onboarding.css';

class Onboarding extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            fname: '',
            lname: '',
            phone: '',
            major: '',
            bio: '',
            personality: 'hello',
            error: '',
            image: null,
            loaded: false,
            stage: 'email'
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleBioSubmit = this.handleBioSubmit.bind(this);
        this.handlePersonalitySubmit = this.handlePersonalitySubmit.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }
    dismissError() {
        this.setState({ error: '' });
    }
    handleEmailSubmit(evt) {
        evt.preventDefault();
        if (!this.state.email) {
            return this.setState({ error: 'Please enter a valid USC email.' });
        }
        else if((this.state.email).substr(this.state.email.length - 7) != 'usc.edu'){
            return this.setState({ error: 'Please enter a valid USC email.' });
        }
        return this.setState({ error: '', stage: 'bio' });
    }
    handleBioSubmit(evt) {
        evt.preventDefault();
        return this.setState({ stage: 'profile' });
    }
    handleImageSubmit(evt) {
        evt.preventDefault();
        return this.setState({ stage: 'personality' });
    }
    handlePersonalitySubmit(evt) {
        this.setState({
            personality: evt.target.id,
        });
        return this.setState({ stage: 'explore'});
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };
    handleFnameChange(evt) {
        this.setState({
            fname: evt.target.value,
        });
    };
    handleLnameChange(evt) {
        this.setState({
            lname: evt.target.value,
        });
    };
    handlePhoneChange(evt) {
        this.setState({
            phone: evt.target.value,
        });
    };
    handleMajorChange(evt) {
        this.setState({
            major: evt.target.value,
        });
    };
    handleBioChange(evt) {
        this.setState({
            bio: evt.target.value,
        });
    };
    handleImageChange(evt) {
        this.setState({
            image: URL.createObjectURL(evt.target.files[0])
        })
    }
    handleImageLoaded(evt) {
        this.setState({
            loaded: true
        })
    }

    render() {
        if(this.state.stage === 'email'){
            return (
                <div className="Email">
                    <img src="tromance_logo.png" id="logo"></img>
                    <form onSubmit={this.handleEmailSubmit}>
                        <h1>What’s your USC email?</h1>
                        <h2>Verify your usc.edu email</h2>
                        <input type="text" data-test="email" placeholder= {'Email'} value={this.state.email} onChange={this.handleEmailChange} />
                        {
                            this.state.error &&
                            <h3 data-test="error">
                                {this.state.error}
                            </h3>
                        }
                        <div>
                            <input type="image" value = "Continue" src="continue_button.png" name="nextButton" id="nextButton"
                                   onClick={this.handleEmailSubmit}/>
                        </div>
                        <div>
                            <img src="progress1.png" id="progress_bar1"></img>
                        </div>
                    </form>
                </div>
            );
        }
        else if(this.state.stage === 'bio'){
            return (
                <div className="Bio">
                    <img src="tromance_logo.png" id="logo"></img>
                    <form onSubmit={this.handleBioSubmit}>
                        <h1>A little bit more about you</h1>
                        <input type="text" data-test="fname" placeholder= {'First Name'} value={this.state.fname} onChange={this.handleFnameChange} />
                        {
                            this.state.error &&
                            <h3 data-test="error" onClick={this.dismissError}>
                                {this.state.error}
                            </h3>
                        }
                        <div>
                            <input type="text" data-test="lname" placeholder= {'Last Name'} value={this.state.lname} onChange={this.handleLnameChange} />
                        </div>
                        <div>
                            <input type="text" data-test="phone" placeholder= {'Phone'} value={this.state.phone} onChange={this.handlePhoneChange} />
                        </div>
                        <div>
                            <input type="text" data-test="major" placeholder= {'Major'} value={this.state.major} onChange={this.handleMajorChange} />
                        </div>
                        <div>
                            <textarea type="text" data-test="bio" id = "largeInput" placeholder= {'Short Bio'} value={this.state.bio} onChange={this.handleBioChange} />
                        </div>
                        <div>
                            <input type="image" value = "Continue" src="continue_button.png" name="nextButton" id="nextButton"
                                   onClick={this.handleBioSubmit}/>
                        </div>
                        <div>
                            <img src="progress2.png" id="progress_bar2"></img>
                        </div>
                    </form>
                </div>
            );
        }
        else if(this.state.stage === 'profile'){
            const { loaded } = this.state;
            const imageStyle = !loaded ? { display: "none" } : {};
            return (
                <div className="Profile">
                    <form onSubmit={this.handleImageSubmit}>
                        <img src="tromance_logo.png" id="logo"></img>
                        <h1>Upload a profile picture</h1>
                        <div className = "imageHolder">
                            {!loaded && <img src="profile_placeholder.png" id="profile_placeholder"></img> }
                            <img src = {this.state.image} id = "profile_pic" style={imageStyle} onLoad={this.handleImageLoaded.bind(this)} />
                        </div>
                        <div className = "fileUpload">
                            <div className= "inputFile">
                                <input type = "file" onChange={this.handleImageChange}/>
                                <label htmlFor="file" id = "inputFile">Choose an image</label>
                            </div>
                            <button class = "btn" onCLick = {this.handleImageSubmit}>Upload</button>
                        </div>
                        <div>
                            <img src="progress3.png" id="progress_bar3"></img>
                        </div>
                    </form>
                </div>
            );
        }
        else if(this.state.stage === 'personality'){
            return (
                <div className="Profile">
                    <img src="tromance_logo.png" id="logo"></img>
                    <h1>Personality</h1>
                    <h2>Select your personality type. If you do not know it, take the <a href="https://www.16personalities.com/free-personality-test" target="_blank">Myers-Briggs test</a>.</h2>
                    <div className="dropdown">
                        <button className="dropbtn">Select personality type<img src="down_arrow.png" id="arrow"></img></button>
                        <div className="dropdown-content">
                            <a href="#" id="Adventurer" onClick = {this.handlePersonalitySubmit}>Adventurer</a>
                            <a href="#" id="Advocate" onClick = {this.handlePersonalitySubmit}>Advocate</a>
                            <a href="#" id="Architect" onClick = {this.handlePersonalitySubmit}>Architect</a>
                            <a href="#" id="Campaigner" onClick = {this.handlePersonalitySubmit}>Campaigner</a>
                            <a href="#" id="Commander" onClick = {this.handlePersonalitySubmit}>Commander</a>
                            <a href="#" id="Debater" onClick = {this.handlePersonalitySubmit}>Debater</a>
                            <a href="#" id="Defender" onClick = {this.handlePersonalitySubmit}>Defender</a>
                            <a href="#" id="Entertainer" onClick = {this.handlePersonalitySubmit}>Entertainer</a>
                            <a href="#" id="Entrepreneur" onClick = {this.handlePersonalitySubmit}>Entrepreneur</a>
                            <a href="#" id="Executive" onClick = {this.handlePersonalitySubmit}>Executive</a>
                            <a href="#" id="Logician" onClick = {this.handlePersonalitySubmit}>Logician</a>
                            <a href="#" id="Logistician" onClick = {this.handlePersonalitySubmit}>Logistician</a>
                            <a href="#" id="Mediator" onClick = {this.handlePersonalitySubmit}>Mediator</a>
                            <a href="#" id="Protagonist" onClick = {this.handlePersonalitySubmit}>Protagonist</a>
                            <a href="#" id="Virtuoso" onClick = {this.handlePersonalitySubmit}>Virtuoso</a>
                        </div>
                    </div>
                    <div>
                        <img src="progress4.png" id="progress_bar4"></img>
                    </div>
                </div>
            );
        }
        else if(this.state.stage === 'explore'){
            return (
                <div className="Profile">
                    <img src="tromance_logo.png" id="logo"></img>
                    <h1>Personality</h1>
                    <h2>{this.state.personality}</h2>
                </div>
            );
        }
    }
}
export default Onboarding;