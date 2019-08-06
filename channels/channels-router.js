const router = require("express").Router();

const posts = require("../data/db.js");

//esm dependency that allows "imports" es6 style

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
          error: "There was an error while saving the post to the database"
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
router.get("/", (req, res) => {
  posts
    //find()
    .find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      //status(500)
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//GET /api/posts/:id
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  console.log(req.params.id);
  //findById(id)
  posts
    .findById(postId)
    .first()
    // this would take it out of array so it can
    .then(post => {
      //   if (postId > post) {
      if (!post) {
        return (
          res
            //status(404)
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        );
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        //status(500)
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//GET /api/posts/:id/comments
// findPostComments(postId)
//status(404)
//status(500)

//DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  // remove(id)
  posts
    .remove(postId)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "Gone", post });
      }
    })
    .catch(err => {
      res.catch(500).json({ error: "The post could not be removed" });
    });
});
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
