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
router.post("/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { text, post_id } = req.body;
  posts
    .findById(postId)
    // this would take it out of array so it can
    .first()
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
        if (!text) {
          //status(400)
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        } else {
          // insertComment(comment)
          posts.insertComment(req.body);
          return then(comment => {
            //status(201)
            res.status(201).json(comment);
          });
        }
      }
    })
    .catch(err => {
      res
        //status(500)
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//status(400)

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
    // this would take it out of array so it can
    .first()
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
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  posts
    // findPostComments(postId)
    .findPostComments(postId)
    // .first()
    .then(post => {
      if (postId > post) {
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
        .json({ error: "The comments information could not be retrieved." });
    });
});

//DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  // remove(id)
  posts
    .remove(postId)
    .then(post => {
      if (!post) {
        res
          //status(404)
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "Gone", post });
      }
    })
    .catch(err => {
      //status(500)
      res.catch(500).json({ error: "The post could not be removed" });
    });
});

//PUT /api/posts/:id
router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const { title, contents } = req.body;

  // update(id, post)
  posts
    .update(postId, { title, contents })
    .then(updated => {
      if (!updated) {
        //status(404)
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
          updated
        });
      } else {
        if (!title || !contents) {
          //status(400)
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
          });
        } else {
          //status(200)
          res.status(200).json({ message: "OK" });
        }
      }
    })
    .catch(err => {
      res
        //status(500)
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

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
