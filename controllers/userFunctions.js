import {model} from "../model/schema.js";


const getArticles = async (req, res) => {
    const page = +req.query['page'];

    const articles = await model.find({},{_id : 0,__v: 0}).skip(page * 10).limit(10);
    res.json({ articles });
}
    
const getOneArticle =  async(req, res) => {
        const articleId = req.params['id'];
        const article = await model.find(
            { _id: articleId },
            {
                _id: 0,
                __v: 0,
                creationDate: 0,
            }
        );
        console.log(articleId);
        res.json(article);
}

export {
    getArticles,
    getOneArticle
}