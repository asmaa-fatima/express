const express = require("express");
const router = express.Router();
const User = require("../models/User");

// router.get("/", (req, res) => {
//   res.send("User List");
// });

// router.get("/new", (req, res) => {
//   res.send("New User");
// });

// router.post("/", (req, res) => {
//   res.send("Create User ");
// });

router
  .route("/")
  .post(async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.json({ message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted" });
    } catch (error) {
      res.json({ message: error.message });
    }
  });

const users = [{ name: "Maya" }, { name: "Rumi" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

// router.get("/:id", (req, res) => {
//   req.params.id;
//   res.send(`Got User with ID ${req.params.id}`);
// });
// router.put("/:id", (req, res) => {
//   req.params.id;
//   res.send(`Update User with ID ${req.params.id}`);
// });
// router.delete("/:id", (req, res) => {
//   req.params.id;
//   res.send(`Got User with ID ${req.params.id}`);
// });

module.exports = router;
