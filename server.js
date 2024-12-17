const express = require("express");
const { responseBack } = require("./util/functions");
const route = require("./api/routes/route");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./dist/")));

app.get("/api/test", (req, res) => {
  try {
    responseBack(200, null, "Server running", res);
  } catch (error) {
    responseBack(500, error, "Server stopped", res);
  }
});

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
