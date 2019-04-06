let router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        project: "Star Wars API",
        author: "Philipe Matheus"
    });
});

let planetController = require("./planetController");

router.route("/planets")
    .get(planetController.index)
    .post(planetController.new);

router.route("/planets/:planet_id")
    .get(planetController.view)
    .patch(planetController.update)
    .put(planetController.update)
    .delete(planetController.delete);

module.exports = router;