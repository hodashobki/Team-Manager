import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { Button } from '@material-ui/core';
import "./style.css"

const MainPage = (props) => {
const [player, setPlayer]=useState([]);    
   
    useEffect(()=>{
        axios.get("http://localhost:8000/api/players")
        .then(res=>{
            setPlayer(res.data.players)
        })
    },[player])

    
const deletePlayer=(id)=>{
    console.log(id);
    alert("do you wana delete this player");
    axios.delete('http://localhost:8000/api/players/delete/'+id)
    .then(res=>{
        // navigate("/");
    })

}
    return (
        <div>
          <h1>Manage Players  |
            <Link to="/manage">Manage Player Status</Link></h1>  
        <div>
            <h2>List |<Link to="/create">Add Player</Link></h2>
            <Link to="/status">Game Status</Link>
        </div>
        <hr></hr>
        <center>
 <table >
  <thead>
      <tr>
        <th>Team Name</th>
        <th>Preffered Position</th>
        <th>Actions</th>
      </tr>
    
  </thead> 
  <tbody>
   {player.map((play)=>{
    return(
        <tr key={play._id}>
        <td>{play.name}</td>
        <td>{play.position}</td>
        <td>
       
<Button onClick={e => {deletePlayer(play._id)} } variant="contained" color="secondary">
   Delete
</Button>
          
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

export default MainPage
