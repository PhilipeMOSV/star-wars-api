let mongoose = require("mongoose");

let planetSchema = mongoose.Schema({
    name: String,
    climate: String,
    terrain: String,
    movies: Number
});

module.exports = mongoose.model("Planet", planetSchema);

