const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");
const {
  createFriend,
  getAllFriends,
  editFriend,
  deleteFriend,
} = require("./controller/friendController");

router.get("/get-all-friends", jwtMiddleware, getAllFriends);

router.post("/create-friend", jwtMiddleware, createFriend);

router.put("/edit-friend/:id", jwtMiddleware, editFriend);

router.delete("/delete-friend/:id", jwtMiddleware, deleteFriend);

module.exports = router;
