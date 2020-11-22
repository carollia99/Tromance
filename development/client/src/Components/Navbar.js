import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import { Bell, User, Home } from 'react-feather';

function Navbar() {
    const history = useHistory();
    return(
        <div style={{"backgroundColor": "white"}}>
            <div className="topBar" style={{display: "flex", alignContent: "start", justifyContent: 'space-between', padding: "32px", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <img style={{height: "32px", marginRight: "16px"}} src="/logo.png" alt="image" />
                    <h1 style={{fontWeight: "bold", margin: 0, color: "#FF6584", fontSize: 24}}>Tromance</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "8%", marginRight: "32px"}}>
                    <Home onClick={() => history.push("/match")} color="#FF6584" size={24} />
                    <Bell onClick={() => history.push("/notifications")}color="#FF6584" size={24} />
                    <User onClick={() => history.push("/profile")} color="#FF6584" size={24} />
                </div>
            </div>
        </div>
    )
}

export default Navbar;