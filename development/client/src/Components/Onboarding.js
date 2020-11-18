import React, { Component } from 'react';
import './Onboarding.css';
import axios from 'axios';

class Onboarding extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: '',
            age: '',
            major: '',
            bio: '',
            personality: 'hello',
            error: '',
            image: null,
            imageurl: '',
            loaded: false,
            stage: 'email'
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
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
        axios.post('http://localhost:5000/api/users/register', {username: this.state.email, password: this.state.password})
            .then(result =>{
                console.log(result.data);
            });
        return this.setState({ error: '', stage: 'bio' });
    }
    handleBioSubmit(evt) {
        evt.preventDefault();
        axios.post('http://localhost:5000/updateprofile', {username: this.state.email, first: this.state.fname, last: this.state.lname, age: this.state.age, bio: this.state.bio})
            .then(result =>{
                console.log(result.data);
            });
        return this.setState({ stage: 'profile' });
    }
    handleImageSubmit(evt) {
        evt.preventDefault();
        axios.post('http://localhost:5000/updateprofile', {username: this.state.email, profilePicture: this.state.imageurl})
            .then(result =>{
                console.log(result.data);
            });
        return this.setState({ stage: 'personality' });
    }
    handlePersonalitySubmit(evt) {
        this.setState({
            personality: evt.target.id,
        });
        axios.post('http://localhost:5000/updateprofile', {username: this.state.email, personality: this.state.personality})
            .then(result =>{
                console.log(result.data);
            });
        return this.setState({ stage: 'explore'});
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };
    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value,
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
    handleAgeChange(evt) {
        this.setState({
            age: evt.target.value,
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
            imageurl: evt.target.value,
        });
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
                        <h1>Continue with USC email</h1>
                        <input type="text" id = "input" data-test="email" placeholder= {'Email'} value={this.state.email} onChange={this.handleEmailChange} />
                        {
                            this.state.error &&
                            <h3 id = "error" data-test="error">
                                {this.state.error}
                            </h3>
                        }
                        <div>
                            <input type="password" id = "input" data-test="password" placeholder= {'Password'} value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
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
                        <input type="text" data-test="fname" id = "input" placeholder= {'First Name'} value={this.state.fname} onChange={this.handleFnameChange} />
                        {
                            this.state.error &&
                            <h3 data-test="error" onClick={this.dismissError}>
                                {this.state.error}
                            </h3>
                        }
                        <div>
                            <input type="text" id = "input" data-test="lname" placeholder= {'Last Name'} value={this.state.lname} onChange={this.handleLnameChange} />
                        </div>
                        <div>
                            <input type="text" id = "input"data-test="phone" placeholder= {'Age'} value={this.state.age} onChange={this.handleAgeChange} />
                        </div>
                        <div>
                            <input type="text" id = "input" data-test="major" placeholder= {'Major'} value={this.state.major} onChange={this.handleMajorChange} />
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
                            <img src = {this.state.imageurl} id = "profile_pic" style={imageStyle} onLoad={this.handleImageLoaded.bind(this)} />
                        </div>
                        <div className = "fileUpload">
                            <div className= "inputFile">
                                <div>
                                    <input type="text" id = "input" data-test="imageurl" placeholder= {'image URL'} value={this.state.imageurl} onChange={this.handleImageChange} />
                                </div>
                            </div>
                            <button class = "btn" onClick = {this.handleImageSubmit}>Upload</button>
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
                    <h2>Select your personality type. If you do not know it, take the <a id = "link" href="https://www.16personalities.com/free-personality-test" target="_blank">Myers-Briggs test</a>.</h2>
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
                <div className="Explore">
                    <img src="tromance_logo.png" id="logo"></img>
                    <h1>Explore</h1>
                </div>
            );
        }
    }
}
export default Onboarding;