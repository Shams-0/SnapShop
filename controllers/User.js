const User = require("../models/User");

exports.getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    const tempUser = {
      id: user._id, firstName: user.name, lastName: user.lastName,
      email: user.email, phoneNumber: user.phoneNumber, gender: user.gender,
      city: user.city, state: user.state, country: user.country, bio: user.bio
    }

    res.status(200).json({ message: "Endpoint hit!", tempUser })
  } catch (error) {
    console.log(error);
  }

}

exports.postEditProfile = async (req, res, next) => {

  try {
    const id = req.params.id;
    const { name, lname, number, gender, city, state, country, bio } = req.body;
    const user = await User.findById(id).populate("order");
    console.log(user);
    if (user) {
      user.name = name;
      user.lastName = lname;
      user.phoneNumber = number;
      user.gender = gender;
      user.city = city;
      user.state = state;
      user.country = country;
      user.bio = bio;

      await user.save();
      res.status(200).json({ message: "User successfully updated!" });
    } else {
      res.status(400).json({ error: "User not updated!" });
    }

  } catch (error) {
    console.log(error);
  }
}