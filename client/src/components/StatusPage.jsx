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
    
    var class_name="default";

    useEffect(()=>{
        axios.get("http://localhost:8000/api/players")
        .then(res=>{
            setPlayer(res.data.players)
        })
    },[player])

    // buttons:
    // didn't work
    // const changetoyellow = (id) => {
      
    //     axios.get('http://localhost:8000//api/players/'+ id)
    //     .then(response =>{  setcolorYellow("primary");
    //         setcolorGreen("");
    //         setColorRed(""); })
    //      .catch(error => console.log("There was an issue: ", error))
    // }

    
    // didn't work:


// const changetoyellow=(e,j)=>{
//     const filteryellow=player.filter((play,i)=>{
//         return i===j;
//         });
//         setcolorYellow("primary");
//             setcolorGreen("");
//             setColorRed(""); 
// }

// didn't work:
    const changetoyellow=(id)=>{
        
        setcolorYellow("primary");
        setcolorGreen("");
        setColorRed("");
       
    }

    const changetored=(id,j)=>{    
        setcolorYellow("");
        setcolorGreen("");
        setColorRed("secondary");
    
}
    const changetogreen=(pid)=>{
        var arr=[];
        console.log(pid)
        arr=player.filter(player=>player._id ===pid);
        console.log(arr)
        console.log(arr[0].playerStatus)
        arr[0].playerStatus="playing";
        console.log(arr[0].playerStatus)
      
        setcolorYellow("");
        setcolorGreen("secondary");
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
        <tr key={play._id}>
            
        <td>{play.name}</td>
        {/* <td>{play._id}</td> */}
        <td>
    {/* <Button onClick={e => {deletePlayer(play._id)} } variant="contained" color="secondary"> */}
{/* <Button  className={class_name} onClick={e=>{changetogreen(play._id)}} variant="contained" color={colorgreen}>
   Playing
</Button>
<Button onClick={(e)=>{changetored(play._id)}} variant="contained" color={colorred}>
   NotPlaying
</Button>
<Button onClick={(e)=>{changetoyellow(play._id)}} variant="contained" color={coloryellow}>
   Undecided
</Button> */}

{
    play.playerStatus ==="Playing"?
    <>
            <Button  className={class_name} onClick={e=>{changetogreen(play._id)}} variant="contained" color="primary">
        Playing
        </Button>
        <Button onClick={(e)=>{changetored(play._id)}} variant="contained" color={colorred}>
        NotPlaying
        </Button>
        <Button onClick={(e)=>{changetoyellow(play._id)}} variant="contained" color={coloryellow}>
        Undecided
        </Button>
    </>
    :play.playerStatus ==="NotPlaying"? 
    <>
        <Button  className={class_name} onClick={e=>{changetogreen(play._id)}} variant="contained" color={colorgreen}>
        Playing
        </Button>
        <Button onClick={(e)=>{changetored(play._id)}} variant="contained" color="secondary">
        NotPlaying
        </Button>
        <Button onClick={(e)=>{changetoyellow(play._id)}} variant="contained" color={coloryellow}>
        Undecided
        </Button>
    </>
    :
    <>
        <Button  className={class_name} onClick={e=>{changetogreen(play._id)}} variant="contained" color={colorgreen}>
        Playing
        </Button>
        <Button onClick={(e)=>{changetored(play._id)}} variant="contained" color={colorred}>
        NotPlaying
        </Button>
        <Button onClick={(e)=>{changetoyellow(play._id)}} variant="contained" color={coloryellow}>
        Undecided
        </Button>
    </>

}
          
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
