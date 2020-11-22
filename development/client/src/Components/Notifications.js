import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Button, Avatar, Image } from 'antd';

function NotificationItem() {
    return(
        <div style={{display: "flex", borderBottom: "2px solid #ecf0f1", padding: "32px"}}>
            <Avatar
                size={96}
                src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            />
            <div style={{display :"flex", alignItems: "start", flexDirection: "column", justifyContent: "center", marginLeft: "32px"}}>
                <div style={{fontWeight: "bold", fontSize: 20}}>NAME liked you!</div>
                <div style={{fontWeight: "bold", fontSize: 16, color: "#FF6584"}}>email@usc.edu</div>
            </div>
        </div>
    )
}

function Notifications() {
    useEffect(() => {
      // Update the document title using the browser API
      const username = localStorage.getItem("currentUsername");
      console.log(username);
      axios.get(`http://localhost:5000/feed`, {
        username: username,
      })
      .then(function (response) {
        console.log(response);
        const matchData = response.data;
        matchData.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)); 
        setMatchDb(response.data);
      //   setProfile(response.data);
      //   setImgUrl(response.data.profilePicture);
      //   setFname(response.data.first);
      //   setLname(response.data.last);
      //   setAge(response.data.age);
      //   setBio(response.data.bio);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);
    return(
        <div>
            <Navbar/>
            <h1>Notifications</h1>
            <div style={{margin: "64px", display: "flex", flexDirection: "column"}}>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
                <NotificationItem/>
            </div>
        </div>
    )
}

export default Notifications;