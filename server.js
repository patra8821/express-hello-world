require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fileUpload = require("./function/fileUpload");

const app = express();
app.use(cors());
app.use(express.json({ limit: "500mb", extended: false }));
// app.use(
//   express.urlencoded({
//     limit: "250mb",
//     extended: true,
//     parameterLimit: 5000000,
//   })
// );

const port = process.env.PORT || 5000;

// const upload = multer({ dest: "/tmp/", limits: "250mb" });

app.use(
  "/file-upload",
  fileUpload.single("file"),
  require("./function/sendToMega")
);

app.use(express.static(path.join(__dirname, "/public")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
