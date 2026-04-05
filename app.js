const express = require("express");
const app = express();

require("./db");

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/records", require("./routes/records.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});