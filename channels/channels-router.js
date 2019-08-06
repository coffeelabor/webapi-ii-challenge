const router = require("express").Router();

const posts = require("../data/db.js");

//POST /api/posts
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      //status(400)
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    // insert(post)
    posts
      .insert(req.body)
      .then(post => {
        //status(201)
        res.status(201).json(post);
      })
      .catch(err => {
        //status(500)
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          error: err
        });
      });
  }
});

//POST /api/posts/:id/comments
// insertComment(comment)
//status(404)
//status(400)
//status(400)
//status(201)
//status(500)

//GET /api/posts
//find()
//status(500)

//GET /api/posts/:id
//findById(id)
//status(404)
//status(500)

//GET /api/posts/:id/comments
// findPostComments(postId)
//status(404)
//status(500)

//DELETE /api/posts/:id
// remove(id)
//status(404)
//status(500)

//PUT /api/posts/:id
// update(id, post)
//status(404)
//status(400)
//status(500)
//status(200)

// router.get("/:id", (req, res) => {
//   db.get({})
//     .then(item => {
//       res.status(200).json(item);
//     })
//     .catch(err => {
//       res.status(404).json({ error: err });
//     });
// });

// router.post("/post", (req, res) => {
//   const data = req.data;
//   db.post(data)
//     .then(item => {
//       res.status(200).json(item);
//     })
//     .catch(err => {
//       res.status(404).json({ error: err });
//     });
// });

module.exports = router;

// findCommentById(id)
// insert(post)
