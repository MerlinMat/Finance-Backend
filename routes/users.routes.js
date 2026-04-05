const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

// Get all users
router.get("/", auth, allowRoles("ADMIN"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update role
router.patch("/:id/role", auth, allowRoles("ADMIN"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );

  res.json(user);
});

module.exports = router;