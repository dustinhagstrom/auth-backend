const Friend = require("../model/Friend");
const User = require("../../user/model/User");

const getAllFriends = async (req, res, next) => {
  try {
    const { decodedJwt } = res.locals;

    let payload = await User.findOne({ email: decodedJwt.email })
      .populate({
        //populate works by going to path "friends" in User schema, grabbing _id and underneath the hood going to "Friend" db and Friend.findByID(_id) and getting all Friend data
        path: "friends", //from User schema
        model: Friend, //Friend schema
        select: "-__v", //this is the versionKey that is automatically given to saved data. by having this field and a '-' we don't display the version.
      })
      .select("-email -password -firstName -lastName -__v -_id -username"); //this removes all the user information from the payload.
    res.json({ payload }); //the payload is then only the friend information
  } catch (e) {
    next(e);
  }
};

const createFriend = async (req, res, next) => {
  try {
    const { firstName, lastName, mobileNumber } = req.body;

    const newFriend = new Friend({
      firstName,
      lastName,
      mobileNumber,
    });

    const savedNewFriend = await newFriend.save(); //this saves the new friend in the database

    //we need to tie this friend to the user who made it. we can do this by using the jwt token we have for that user
    const { decodedJwt } = res.locals; //we stored the decoded token in res.locals for the purpose of making this friend.
    const foundTargetUser = await User.findOne({ email: decodedJwt.email }); //the email is tied to the decodedJwt obj. => we can extract the email from it.

    foundTargetUser.friends.push(savedNewFriend._id); //this pushes the friend's _id to the array in the User

    await foundTargetUser.save(); //this saves the user in the database with the now added friend _id.
    res.json(savedNewFriend);

    //
  } catch (e) {
    next(e);
  }
};

const editFriend = async (req, res, next) => {
  let updateObj = {}; //make empty obj
  let body = req.body; //the req obj which are
  for (let key in body) {
    updateobj;
    if (body[key] !== "") {
      //if there blanks in firstName, lastName, or mobileNumber input field then don't put into updateObj
      updateObj[key] = body[key];
    }
  }
  console.log(updateObj);

  try {
    let editedFriend = await Friend.findByIdAndUpdate(
      req.params.id,
      updateObj,
      {
        new: true,
      }
    ).select("-__v");
    res.json({ message: "success", payload: editedFriend });
  } catch (e) {
    next(e);
  }
};

const deleteFriend = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedFriend = await Friend.findByIdAndRemove({ _id: id });

    const { decodedJwt } = res.locals;

    let foundUser = await User.findOne({ email: decodedJwt.email });

    let foundUserArray = foundUser.friends;

    let filteredFriendsArray = foundUserArray.filter(
      (id) => deletedFriend._id.toString() !== id.toString()
    );

    foundUser.friends = filteredFriendsArray;

    await foundUser.save();
    res.json({ message: "success", payload: deletedFriend });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllFriends,
  createFriend,
  editFriend,
  deleteFriend,
};
