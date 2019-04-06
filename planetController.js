let Planet = require("./models/planetModel");
let request = require("request");

let url = "https://swapi.co/api/planets/?search=";

//Show all planets or planet by name
exports.index = (req, res) => {
    if (!req.query.name) {
        Planet.find({}, (err, planets) => {
            if (err) res.json(err);
            res.json({
                planets: planets
            });
        });
    } else {
        Planet.findOne({ name: req.query.name }, (err, planet) => {
            if (err) res.json(err);
            res.json({
                planet: planet
            });
        });
    }
};

//Create Route
exports.new = (req, res) => {
    let planet = new Planet();
    planet.name = req.body.name;
    planet.climate = req.body.climate;
    planet.terrain = req.body.terrain;
    let apiPlanetUrl = url + planet.name;
    request(apiPlanetUrl, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let planetApiFound = JSON.parse(body);
            if(planetApiFound.results.length != 0)
                planet.movies = planetApiFound.results[0].films.length;
            else
                planet.movies = 0;
        }
        planet.save(err => {
            if (err) res.json(err);
            res.json({
                planet: planet
            });
        });
    });

};

//Find Planet by Id
exports.view = (req, res) => {
    Planet.findById(req.params.planet_id, (err, planet) => {
        if (err) res.json(err);
        res.json({
            planet: planet
        });
    });
};

//Update Route
exports.update = (req, res) => {
    Planet.findByIdAndUpdate(req.params.planet_id, req.body, {new: true}, (err, planet) => {
        if (err) res.json(err);
        planet.save(err => {
            if (err) res.json(err);
            res.json({
                planet: planet
            });
        });
    });
};

//Delete Route
exports.delete = (req, res) => {
    Planet.findByIdAndDelete(req.params.planet_id, err => {
        if (err) res.json(err);
        res.redirect("/api");
    });
};
