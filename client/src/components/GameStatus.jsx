import { Link, navigate } from '@reach/router';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import "./style.css"

const GameStatus = (props) => {

    const [player, setPlayer]=useState([]); 
    const [updatedPlayer, setUpdatedPlayer] = useState([]);
    const [buttonColor, setButtonColor] = useState({bgColor: "whitesmoke"});



    useEffect(()=>{
        axios.get("http://localhost:8000/api/players")
        .then(res=>{
            setPlayer(res.data.players)
        })
    },[player])

    const colorChanger= () => {
        document.getElementById("btn1").style.backgroundColor = "#bab86";
        document.getElementById("btn2").style.backgroundColor = "#f14444";
        document.getElementById("btn3").style.backgroundColor = "#ffff00";
    }

    const StatusChange = (e,id,name,position,playerStatus) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/player/'+ id, {
            name,
            position,
            playerStatus
        })
        .then(response => setUpdatedPlayer((response.data)))
        .catch(error => console.log("There was an issue: ", error))
    }
    
    const green = (playerStatus) => {
        if (playerStatus === "Playing")
            return "#bab86";
    }

    const red = (playerStatus) => {
        if (playerStatus === "Not Playing")
            return "#f14444";
    }

    const yellow = (playerStatus) => {
        if (playerStatus === "Undecided")
            return "#ffff00";
    }



    return (
        <div>
          <h1>Manage Players  |
            <Link to="/manage">Manage Player Status</Link></h1>
            <Link to="/">Home</Link>
            <center>
 <table >
  <thead>
      <tr>
        <th>Team Name</th>
        
        <th>Actions</th>
      </tr>
    
  </thead> 
  <tbody>
   {player.map((play,i)=>{
    return(
        <tr key={i}>
        <td>{play.name}</td>
        <td>
     <button onClick={(e) => StatusChange(e, play._id, play.name, play.position, play.playerStatus,"Playing")} style={{background:  green(play.playerStatus),margin: "10px"}} id="btn1" type="button" class="btn btn-outline ">Playing</button>
                            <button onClick={(e) => StatusChange(e, play._id, play.name, play.position, play.playerStatus,"Not Playing")} style={{background:  red(play.playerStatus),margin: "10px"}} id="btn2" type="button" class="btn btn-outline ">Not Playing</button>
                            <button onClick={(e) => StatusChange(e, play._id, play.name, play.position, play.playerStatus,"Undecided")} style={{background:  yellow(play.playerStatus),margin: "10px"}} id="btn3" type="button" class="btn btn-outline ">Undecided </button>
          
        </td>
    </tr>
    );
  })} 
  </tbody>
  </table>
  </center>

        </div>
    )
}

export default GameStatus
