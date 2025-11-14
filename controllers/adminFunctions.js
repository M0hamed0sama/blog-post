import { model } from "../model/schema.js";

const getArticles = async (req, res) => {
        const articles = await model.find(
            {},
            {
                _id : 0,
                article :1
            })
        res.json({ articles });
}

const editArticle  = async(req, res) => {
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
    
const addManyArticles = async (req,res) =>{
    let articles = req.body;
    articles = articles.data;
    await model.insertMany(articles)
    .then((data)=>{
        console.log('data inserted!\n');
        console.log(data);
    })
    .catch((err)=>{
        console.error(err);
    });
    res.json({ message: "data inserted!"});
}

export {
    getArticles,
    editArticle,
    addManyArticles
}