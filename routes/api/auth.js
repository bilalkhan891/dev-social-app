const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const {
  authValidation,
  validationResult,
} = require("../../validations/login-validation");
const jwd = require("jsonwebtoken");
const config = require("config");

// @route   GET api/auth
// @desc    Auth user
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/", [authValidation], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Invalid Credentials!" }] });
    }

    const isPwdMatch = await bcrypt.compare(password, user.password);

    if (!isPwdMatch) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Invalid Credentials!" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwd.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
