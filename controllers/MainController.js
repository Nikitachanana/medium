const express = require("express")
const request = require("request")
const cheerio = require("cheerio")
const rp = require("request-promise")
const axios = require("axios")
const Data = require("../config/database")


const scrapeData = async (req,res)=>{
    console.log(req.body)
    const findData =await Data.findOne({where:{tag:req.body.tag}})
    console.log(findData)
   if(findData){
    //    for(i of ){
       
       res.json({
           data:JSON.parse(findData.dataValues.allPosts),
           relatedTags:findData.dataValues.relatedTags
       })
   }
   else{
    var url =  `https://medium.com/_/api/tags/${req.body.tag}/stream`
    axios.get(url).then(async response=>{
    var data = response.data
    var requiredData = JSON.parse(data.split(">")[1])
    var Post = requiredData.payload.references.Post
    var user = requiredData.payload.references.User
    var collection = requiredData.payload.references.Collection
    var relatedTags = requiredData.payload.relatedTags
    const userArray = [];
    const PostArray = []
    const collectionarray = []
    const relatedTagsArray = []
    const relatedTagss = []
    Object.keys(relatedTags).forEach(key => relatedTagsArray.push({
        data: relatedTags[key]
        }));
    Object.keys(user).forEach(key => userArray.push({
    data: user[key]
    }));
    Object.keys(Post).forEach(key => PostArray.push({
        data: Post[key]
        }));

    for(i of relatedTagsArray){
        var tag =  i.data.name
        relatedTagss.push(tag)
    }
    Object.keys(collection).forEach(key => collectionarray.push({
        data: collection[key]
        }));
    const tags =[] 
    const final = []
    for(i=0; i<PostArray.length; i++){
        var result = {
            creator:"",
            date:"",
            readTime:"",
            blogUrl:"",
            tags:[],
            title:"",
        }
        for(j of PostArray[i].data.virtuals.tags){
            tags.push(j.name)
        }
        result.creator = userArray[i].data.name
        result.title = PostArray[i].data.title,
        result.tags = tags
        result.date = new Date(PostArray[i].data.createdAt).toDateString()
        result.readTime = Math.round(PostArray[i].data.virtuals.readingTime)
        if(collectionarray[i]){
            url = "https://medium.com/"+collectionarray[i].data.name+"/"+changeString(PostArray[i].data.title,PostArray[i].data.id.toString())
            result.blogUrl = url
        }
        // console.log(result) 
        final.push(result)
    }
    await Data.create({
        tag:req.body.tag,
        allPosts:final,
        relatedTags:relatedTagss
    })
    
    res.json({
        data:final,
        relatedTags:relatedTagss
    })
}).catch(err=>{
    console.log("Error is", err)
    res.json({
        error:"No data found!"
    })
})
   }
}


var changeString = (string,id)=>{
    if(string.indexOf(".")>-1){
        string = string.split(".")[0]
    }
    const strArray = string.split(" ").join("-")
    var url = strArray +"-"+id
    return url;
}

console.log(changeString("5 Ways to animate a React app in 2019.","881b7d2fbded"))
module.exports = {
    scrapeData:scrapeData
}