const express = require("express");

const channelsRouter = require("./channels/channels-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", channelsRouter);

server.get("/", (req, res) => {
  const queryParameters = req.query;
  res.status(200).json({ message: "howdy", queryParameters });
});

server.listen(8000, () =>
  console.log("\nNo one API should have so much power!\n")
);
