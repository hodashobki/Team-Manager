const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	name: {type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"]},
    position:{type:String}		
	
},{timestamps:true});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;