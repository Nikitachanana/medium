const Sequelize = require('sequelize')
const db = require('../config/database');
const Data = db.define('data', {
    tag:{
        type:Sequelize.STRING
    },
    allPosts:{
        type: Sequelize.TEXT, 
        get: function() {
            return JSON.parse(this.getDataValue('allPosts'));
        }, 
        set: function(val) {
            return this.setDataValue('allPosts', JSON.stringify(val));
        }
    },
    relatedTags:{
        type:Sequelize.ARRAY(Sequelize.TEXT)
    }
})

db
.sync().then(()=>{
    console.log("Tables creates succesfully!")
}).catch((err)=>{console.log(err)});

module.exports = Data