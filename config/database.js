const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage : "path_to_database.sqlite",
  path : "../config",
});
const Data = sequelize.define('data', {
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

sequelize
.sync().then(()=>{
    console.log("Tables creates succesfully!")
}).catch((err)=>{console.log(err)});

module.exports = Data

