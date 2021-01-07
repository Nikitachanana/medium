const express = require('express')
const app = express()
const mainRoutes = require("./routes/MainRouter")
require('dotenv').config()
const port = process.env.PORT || 5656
const db = require("./config/database")
app.use(express.json());
app.use("/api", mainRoutes)

app.listen(port, () => console.log(`App is running on  ${port}!`))
// db.authenticate().then(() => {
//     console.log("Connected to db");
//   })


