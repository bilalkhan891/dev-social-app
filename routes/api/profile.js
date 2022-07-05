const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../../middleware/auth.js");
const Users = require("../../models/User.js");
const Profile = require("../../models/Profile.js");
const {
  profileValidation,
  validationResult,
} = require("../../validations/profile-validation.js");
const {
  experienceValidation,
} = require("../../validations/experience-validation.js");
const {
  educationValidation,
} = require("../../validations/education-validation.js");

// @route   GET api/prfile
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    console.log(profiles);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/prfile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user." });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "No profile for this user." });
    res.status(500).send("Server Error");
  }
});

// @route   POST api/prfile/me
// @desc    Get user profile by JWT
// @access  private
router.post("/me", auth, async (req, res) => {
  try {
    // Find user in user collection
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      console.log("No profile in DB!");
      return res.status(404).json({ error: "No profile in DB!" });
    }

    return res.json(profile);
  } catch (err) {
    res.status(500).send("Server error!");
  }
});

// @route   POST api/profile
// @desc    Update or create profile
// @access  private
router.post("/", [auth, profileValidation], async (req, res) => {
  const errors = validationResult(req);
  console.log("POST api/profile");
  if (!errors.isEmpty()) return res.status(400).send({ err: errors.array() });

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  console.log(req.body);

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (typeof skills === "object") {
    profileFields.skills = skills[0].split(",").map((skill) => skill.trim());
  } else if (typeof skills === "string") {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  // build social object
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (youtube) profileFields.social.youtube = youtube;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      console.log(req.user.id);
      return res.json(profile);
    }

    // create
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route   DELETE api/prfile
// @desc    Delete profile, user, and posts
// @access  private
router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users posts
    // Find user in user collection
    await Profile.findOneAndDelete({ user: req.user.id });
    await Users.findOneAndDelete({ _id: req.user.id });

    return res.json({ msg: "User removed!" });
  } catch (err) {
    res.status(500).send("Server error!");
  }
});

// @route   post api/prfile/experience
// @desc    Add experience based on auth
// @access  private
router.put("/experience", [experienceValidation, auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    // Find user in user collection
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    profile = await profile.save();

    return res.json({ msg: "experience saved!", profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

// @route   DELETE api/prfile/experience
// @desc    Delete experience based on auth experience_id
// @access  private
router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    // Find user in user collection
    const expId = req.params.experience_id;
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter((exp) => {
      return exp._id.toString() !== expId;
    });

    profile.save();
    return res.json({ msg: "Experience Deleted!", profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

// @route   post api/prfile/education
// @desc    Add education based on auth
// @access  private
router.put("/education", [educationValidation, auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const {
    school,
    degree,
    fieldofstudy,
    location,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    // Find user in user collection
    let profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    profile = await profile.save();

    return res.json({ msg: "education saved!", profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

// @route   DELETE api/prfile/education
// @desc    Delete education based on auth and education_id
// @access  private
router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    // Find user in user collection
    const eduId = req.params.education_id;
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter((exp) => {
      return exp._id.toString() !== eduId;
    });

    profile.save();
    return res.json({ msg: "Education Deleted!", profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

// @route     GET api/profile/github/:username
// @desc      Get user repos from Github
// @access    Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, _response, body) => {
      if (error) console.log(error);
      if (_response.statusCode !== 200) {
        console.log(_response.statusCode);
        return res.status(404).json({ msg: "No Github profile found!" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
