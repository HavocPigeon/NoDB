const comments = [];
let id = 0;

module.exports = {
    create: (req, res) => {
    const {text} = req.body;
    id++
    comments.push({text, id})
    res.status(200).send(comments);
    },
    delete: (req, res) => {
    let commentId = req.query;
    let index = comments.findIndex(comment => comment.id == commentId)
    comments.splice(index, 1)
    res.status(200).send(comments);
    },
    read: (req, res) => {
        res.status(200).send(comments);
    },
    update: (req, res) => {
    const {text} = req.body;
    const {id} = req.params;
    comments.forEach(comment => {
        if (comment.id == id){
            comment.text = text;
        }
    })
    res.status(200).send(comments);
  } 
}