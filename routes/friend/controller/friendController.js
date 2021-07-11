const Friend = require("../model/Friend");
const User = require("../../user/model/User");

const getAllFriends = async (req, res) => {
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
    res.json(payload); //the payload is then only the friend information
  } catch (e) {
    res.status(500).json({ e: e, message: e.message });
  }
};

const createFriend = async (req, res) => {
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
    res.status(500).json({ e: e, message: e.message });
  }
};

const editFriend = async (req, res) => {
  let { id } = req.params;
  let { firstName, lastName, mobileNumber } = req.body;
  try {
    let editedFriend = await Friend.findByIdAndUpdate(
      { _id: id },
      { firstName: firstName, lastName: lastName, mobileNumber: mobileNumber },
      {
        new: true,
      }
    );
    res.json({ message: "success", payload: editedFriend });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
};

const deleteFriend = () => {};

module.exports = {
  getAllFriends,
  createFriend,
  editFriend,
  deleteFriend,
};
