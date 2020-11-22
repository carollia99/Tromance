import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Button, Avatar, Image } from 'antd';
import axios from "axios";

function NotificationItem(props) {

    return(
        <div style={{display: "flex", borderBottom: "2px solid #ecf0f1", padding: "32px"}}>
            <Avatar
                size={96}
                src={<Image src={props.imgUrl}/>}
            />
            <div style={{display :"flex", alignItems: "start", flexDirection: "column", justifyContent: "center", marginLeft: "32px"}}>
                <div style={{fontWeight: "bold", fontSize: 20}}>{props.liker} liked you!</div>
                <div style={{fontWeight: "bold", fontSize: 16, color: "#FF6584"}}>{props.liker}@usc.edu</div>
            </div>
        </div>
    )
}

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [profilePictures, setProfilePictures] = useState([]);

    useEffect(() => {
      // Update the document title using the browser API
      const username = localStorage.getItem("currentUsername");
      console.log(username);
      console.log(username.split("@")[0]);
      axios.get(`http://localhost:5000/feed`, {
        params: {
            username: username.split("@")[0],
        }
      })
      .then(function (response) {
        console.log(response);
        setNotifications(response.data.results);
        
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
                {
                    notifications.length > 0 && notifications.map((notification, index) => {
                        // console.log(match);
                        if(notification.likerProfilePic != undefined && notification.liker != undefined) {
                            return <NotificationItem liker={notification.liker} imgUrl={notification.likerProfilePic} />
                        }
                        
                    })
                }

                {
                    notifications.length == 0 && 
                        <div>
                            No notifications.
                        </div>
                }
            </div>
        </div>
    )
}

export default Notifications;