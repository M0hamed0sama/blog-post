import {model} from "../model/schema.js";
const getArticles = async (req, res) => {
        const articles = await model.find(
            {},
            {
                _id : 0,
                article :1
            })
        res.json({ articles });
}
    
const getOneArticle =  async(req, res) => {
        const articleid = req.params['id'];
        const article = await model.find(
            { id: articleid },
            {
                _id: 0,
                __v: 0,
                creationDate: 0,
                id: 0
            }
        );
        console.log(articleid);
        res.json(article);
    }

export {
    getArticles,
    getOneArticle
}