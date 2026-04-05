const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

// Create (ADMIN)
router.post("/", auth, allowRoles("ADMIN"), async (req, res) => {
  try {
    const record = await Record.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all (ANALYST, ADMIN)

router.get("/summary", auth, async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0, expense = 0;

  result.forEach(r => {
    if (r._id === "INCOME") income = r.total;
    if (r._id === "EXPENSE") expense = r.total;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  });
});

router.get("/", auth, async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

// Update (ADMIN)
router.patch("/:id", auth, allowRoles("ADMIN"), async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(record);
});

// Delete (ADMIN)
router.delete("/:id", auth, allowRoles("ADMIN"), async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;