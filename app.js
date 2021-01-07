const express = require('express')
const app = express()
const mainRoutes = require("./routes/MainRouter")
const path = require("path")
require('dotenv').config()
const port = 5000
const db = require("./config/database")
app.use(express.json());
app.use("/api", mainRoutes)
if(process.env.NODE_ENV ==="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client',"build",'index.html'))
    })
}

app.listen(port, () => console.log(`App is running on  ${port}!`))
// db.authenticate().then(() => {
//     console.log("Connected to db");
//   })


