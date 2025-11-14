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
    
const addArticle = async (req, res) => {
        const {article , articleContent } = req.body;
        const temp = await counterModel.findOneAndUpdate(
            { seq_name: 'Article' },
            { $inc: { seq_value: 1 } });
        const counter = temp.seq_value;

        const newArticle = new model({
            id : counter,
            article : article,
            articleContent : articleContent
        })
        await newArticle.save();
        res.json({ message: "article inserted" });
}

export {
    getArticles,
    editArticle,
    addArticle
}