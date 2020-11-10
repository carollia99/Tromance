import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Button, Avatar, Image } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';

function Profile() {
    return(
        <div>
            <Navbar/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "column"}}>
                <img style={{width: "200px"}} src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"/>
                <div style={{margin: "32px", fontWeight: "bold", fontSize: 24}}>Username (Age)</div>
                <Button shape="round" type="default">Edit profile</Button>
                <div style={{marginTop: "32px"}}>Major: MAJOR</div>
                <div style={{margin: "32px"}}>Bio: BIO</div>
                <Button shape="round" type="text" style={{color: "#FF6584"}}>Log out</Button>
            </div>
        </div>
    )
}

export default Profile;