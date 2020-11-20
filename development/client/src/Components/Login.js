import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
    const history = useHistory();
    
    return (
        <div className="wave-container" style={{width: "100%", height: "100%"}}>
            {/* <svg style={{position: "absolute", top: "51%", left: 0, zIndex: 1}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#FF6584" fill-opacity="1" d="M0,288L30,261.3C60,235,120,181,180,165.3C240,149,300,171,360,160C420,149,480,107,540,90.7C600,75,660,85,720,80C780,75,840,53,900,42.7C960,32,1020,32,1080,37.3C1140,43,1200,53,1260,48C1320,43,1380,21,1410,10.7L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg> */}
            <svg style={{position: "absolute", top: "60%", left: 0, zIndex: 1}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ff6584" fill-opacity="1" d="M0,128L80,128C160,128,320,128,480,112C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
 
            <div className="container" style={{padding: "64px", paddingBottom: "0", backgroundColor: "white"}}>
                <div className="topBar" style={{display: "flex", alignContent: "start", marginLeft: "64px", justifyContent: 'space-between', alignItems: "center"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img style={{height: "32px", marginRight: "16px"}} src="/tromance_logo.png" alt="image" />
                    </div>
                    {/* <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{cursor: "pointer", fontSize: "16px", color: "black"}}>Log in</div>
                        <div style={{cursor: "pointer", marginLeft: "16px", height: "45px", width: "100px", backgroundColor: "#6CA1FF", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", borderRadius: "10px", color: "white"}}>Sign Up</div>
                    </div> */}
                    
                </div>
                <div className="content" style={{display: "flex", margin: 0, width: "100%", justifyContent: "left"}}>
                    <div className="textContent" style={{textAlign: "left", width: "40%", margin: "64px"}}>
                        <div className="headerText" style={{color: "black", fontFamily: "Avenir", fontSize: "48px", fontWeight: "bold", lineHeight: "1.2em", marginTop: "80px"}}>
                            Find love on campus
                        </div>
                        <div className="button" style={{cursor: "pointer", height: "48px", width: "280px", backgroundColor: "#FF6584", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", marginTop: "48px"}}>
                            <div onClick={() => history.push("/onboarding")} style={{fontSize: "18px", color: "white"}}>Continue with USC email</div>
                        </div>
                    </div>
                    <img src="/splash_circles.png" style={{height: "540px", zIndex: 2}}/>
                </div>
                
            </div>
        </div>
    )
}

export default Login;