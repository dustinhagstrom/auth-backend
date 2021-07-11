const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");
const {
  createFriend,
  getAllFriends,
  editFriend,
} = require("./controller/friendController");

router.get("/get-all-friends", jwtMiddleware, getAllFriends);

router.post("/create-friend", jwtMiddleware, createFriend);

router.put("/edit-friend/:id", jwtMiddleware, editFriend);

module.exports = router;
