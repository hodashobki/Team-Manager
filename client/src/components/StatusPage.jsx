import { Link, navigate } from '@reach/router';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import "./style.css"

const StatusPage = (props) => {
    const [player, setPlayer]=useState([]); 
    const [colorgreen,setcolorGreen]=useState("");
    const[colorred,setColorRed]=useState("");
    const[coloryellow,setcolorYellow]=useState("");
    const [playerId,seplayerId]=useState("");

    useEffect(()=>{
        axios.get("http://localhost:8000/api/players")
        .then(res=>{
            setPlayer(res.data.players)
        })
    },[player])

    // buttons:
    // const deletePlayer=(id)=>{
    //     console.log(id);
    //     axios.delete('http://localhost:8000/api/players/delete/'+id)
    //     .then(res=>{
    //         // navigate("/");
    //     })
    
    // }

    const changetoyellow=(id,j)=>{
        
        setcolorYellow("primary");
        setcolorGreen("");
        setColorRed("");
       
    }

    const changetored=(id,j)=>{    
        setcolorYellow("");
        setcolorGreen("");
        setColorRed("secondary");
    
}
    const changetogreen=(id,j)=>{
        setcolorYellow("");
        setcolorGreen("green");
        setColorRed("");
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
    {/* <Button onClick={e => {deletePlayer(play._id)} } variant="contained" color="secondary"> */}
<Button ocClick={e=>{changetogreen(play._id,i+1)}} variant="contained" color={colorgreen}>
   Playing
</Button>
<Button onClick={(e)=>{changetored(play._id,i+1)}} variant="contained" color={colorred}>
   NotPlaying
</Button>
<Button onClick={(e)=>{changetoyellow(play._id,i+1)}} variant="contained" color={coloryellow}>
   Undecided
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

export default StatusPage
