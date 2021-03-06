const express = require('express')
const router = express.Router()
const MainController = require("../controllers/MainController")

router.route("/scrape").post(MainController.scrapeData)

module.exports = router;