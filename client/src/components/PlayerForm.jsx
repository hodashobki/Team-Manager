import React,{useState} from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
const styles = {
    paper: {
        width: "20rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}

const PlayerForm = (props) => {
const[name,setName]=useState("");
const[position,setPosition]=useState("");
const[nameError,setNameError]=useState("");
const[submitError,setSubmitError]=useState("");
const submitErrorMsg={
    noSubmit:"Your Submition is not allowed befor correcting the form"
  }
const nameValidation=(value)=>{
    setName(value);
    if(value.length < 1 && value.length!==0){
        setNameError("The Player must not be empty");
        return false;
    }
    else if(value.length < 2 && value.length!==0){
        setNameError("The Player must be 2 characters at least");
        return false;
    }
    else{
        setNameError("");
        return true;
    }
}
// handel Submit:
const handelSubmit=(e)=>{
    e.preventDefault();
    
    if(nameValidation(name)){
        axios.post("http://localhost:8000/api/players/new",{
            name,position
        })
        .then(res=>{
            setName("");
            setPosition("");
            navigate("/");
        })
        .catch(err=>{
            const errstr=err.response.data.error.errors.name.message;
            console.log( errstr);
            setSubmitError(errstr);
        })
    }
    else{
        setSubmitError(submitErrorMsg.nosubmit);
    }
};

    return (
        <div>
          <h1>Manage Players</h1> 
          <center>
          <Paper elevation={3} style={styles.paper}>
            <h2>Player Form</h2>
            <form onSubmit={handelSubmit}>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Player Name:</InputLabel>
                    <OutlinedInput type="text"  onChange={(e)=>{nameValidation(e.target.value)}} value={name}/>
                    {
                        nameError&&
                        <p style={{color:"red"}}>{nameError}</p>
                    }
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Preferred Position</InputLabel>
                    <OutlinedInput type="text"  onChange={(e)=>{setPosition(e.target.value)}} value={position}/>
                </FormControl>
               
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
                {
              submitError &&
              <p style={{color:"red"}}>{submitError}</p>
          }
            </form>
        </Paper>
        </center> 
        </div>
    )
}

export default PlayerForm
