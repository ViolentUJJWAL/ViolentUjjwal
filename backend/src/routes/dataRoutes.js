const express = require("express");
const router = express.Router();
const { addData, updateData, deleteData } = require("../controllers/dataController"); 
const upload = require("../../middlewares/multer");
const jwtToken = require("../../middlewares/jwtToken");

// type can be 'project', 'experience', or 'skill'

router.post("/:type", jwtToken, upload.single("file"), addData);
router.put("/:type/:id", jwtToken, upload.single("file"), updateData);
router.delete("/:type/:id",jwtToken, deleteData);

module.exports = router;