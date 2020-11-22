import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Button, Avatar, Image } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Onboarding.css';

function Profile() {
    const history = useHistory();
    const [profile, setProfile] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [major, setMajor] = useState('');

    useEffect(() => {
      // Update the document title using the browser API
      const username = localStorage.getItem("currentUsername");
      console.log(username);
      axios.post(`http://localhost:5000/profile/${username}`, {
        username: username,
      })
      .then(function (response) {
        console.log(response);
        setProfile(response.data);
        setImgUrl(response.data.profilePicture);
        setFname(response.data.first);
        setLname(response.data.last);
        setAge(response.data.age);
        setBio(response.data.bio);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);

    return(
        <div style={{width: "100%", height: "100%"}}>
            <Navbar/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "column", marginTop: "32px"}}>
                <div className = "imageHolder">
                    <img src = {imgUrl} id = "profile_pic"/>
                </div>
                <div style={{margin: "32px", fontWeight: "bold", fontSize: 24}}>{fname} {lname} ({age})</div>
                <Button shape="round" type="default">Edit profile</Button>
                {/* <div style={{marginTop: "32px"}}>Major: MAJOR</div> */}
                <div style={{margin: "32px"}}>Bio: {bio}</div>
                <Button onClick={() => history.push("/")} shape="round" type="text" style={{color: "#FF6584"}}>Log out</Button>
            </div>
        </div>
    )
}

export default Profile;