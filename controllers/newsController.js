const articles = require("../models/newsModel");
const { request } = require("express");
const newsController = {


    everything: async (req, res) => {
        await articles.find({}, function(err,data){
                if(err) console.log(err)
                // Check if query parameter is there
                if(req.query.q){
                    data = data.filter((item)=>{
                        if(item.content.toLowerCase().indexOf(req.query.q.toLowerCase()) != -1){
                            return item;
                        }
                        
                    })
                }
                
                res.json({status:"ok",totalResults:data.length,"articles":data});
              });
        
    },
    addNews:async (req, res) => {
        const {source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content} = req.body;
        const article = await articles.findOne({"source.id":source.id});
        if(article){
            return res.status(400).json({msg:"article exists"});
        }
        const addNews = new articles({
            source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content
        })
        await addNews.save();
    },
    updateNews:async (req, res) => {
        const {source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content} = req.body;
        await articles.findOneAndUpdate({_id:req.params.id},{
            source,
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content
        })
        res.json({msg:"getin contrller"});
    },
    deleteNews: async (req, res) => {
        await articles.findByIdAndDelete(req.params.id);
        res.json({msg:"getin contrller"});
    },
    getSpecificNews: async (req, res) => {
        const article = await articles.findById(req.params.id)
        res.json(article);
    }
}
module.exports = newsController;