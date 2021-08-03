const Player = require("../models/player.model");

module.exports.findAllPlayers = (req, res) => {
  Player.find()
    .then(allPlayers => res.json({ players: allPlayers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSinglePlayer = (req, res) => {
	Player.findOne({ _id: req.params.id })
		.then(oneSinglePlayer => res.json({ player: oneSinglePlayer }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewPlayer = (req, res) => {
  Player.create(req.body)
    .then(newlyCreatedPlayer => res.json({ player: newlyCreatedPlayer }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingPlayer = (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedplayer => res.json({ player: updatedplayer }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingPlayer = (req, res) => {
  Player.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
