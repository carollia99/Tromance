import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import MatchCard from '../Components/MatchCard';
import Navbar from '../Components/Navbar';

const db = [
    {
        id: 0,
        name: "Anna",
        age: 21,
        major: "Computer Science",
        image: "",
        matchPercent: 64
    },
    {
        id: 1,
        name: "Bobby",
        age: 21,
        major: "Computer Science",
        image: "",
        matchPercent: 64
    },
    {
        id: 2,
        name: "Carl",
        age: 21,
        major: "Computer Science",
        image: "",
        matchPercent: 64
    },
    {
        id: 3,
        name: "Diana",
        age: 21,
        major: "Computer Science",
        image: "",
        matchPercent: 64
    }
]

let dbState = db

function Matching() {
    const [matchDb, setMatchDb] = useState(db);

    useEffect(() => {
        console.log(matchDb);
    }, [matchDb]);

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
      }
      
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
        dbState = dbState.filter(match => match.id != myIdentifier)
        setMatchDb(dbState)
      }

    return(
        <div style={{width: "100%", height: "100%"}}>
            <Navbar/>
            {/* <div className="topBar" style={{display: "flex", alignContent: "center", justifyContent: 'center', alignItems: "center", margin: "64px"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <img style={{height: "32px", marginRight: "16px"}} src="/logo.png" alt="image" />
                    <h1 style={{fontWeight: "bold", margin: 0, color: "#FF6584"}}>Tromance</h1>
                </div>
            </div> */}
            {/* <div style={{display: "flex", alignItems: 'center', justifyContent: "center", height: "100%"}}>
                <div style={{width: "90vw", maxWidth: "260px", height: "300px"}}>
                    <TinderCard style={{textAlign: "center", display: "flex"}} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
                        <MatchCard/>
                    </TinderCard>
                    <TinderCard style={{textAlign: "center", display: "flex"}} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
                        <MatchCard/>
                    </TinderCard>
                </div>
            </div> */}
            {
                matchDb.length > 0 && matchDb.map((match, index) => {
                    // console.log(match);
                    return <div style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
                        <TinderCard style={{textAlign: "center", display: "flex", position: "absolute", left: "50%", top: "50%"}} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(match.id)} preventSwipe={['top', 'bottom']}>
                            <MatchCard name={match.name} age={match.age} major={match.major} image={match.image} matchPercent={match.matchPercent}/>
                        </TinderCard>
                    </div>
                })
            }

            {
                matchDb.length == 0 && 
                    <div>
                        No more matches remaining.
                    </div>
            }
        </div>
        
        
    )
}

export default Matching;