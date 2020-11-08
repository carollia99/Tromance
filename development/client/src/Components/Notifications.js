import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function Notifications() {
    return(
        <div>
            <Navbar/>
            <div>Notifications</div>
        </div>
    )
}

export default Notifications;