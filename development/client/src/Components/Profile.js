import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function Profile() {
    return(
        <div>
            <Navbar/>
            <div>Profile</div>
        </div>
    )
}

export default Profile;