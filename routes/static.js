const express = require('express');
const path = require('path');
const router = express.Router();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static(path.join(__dirname, 'public')));
router.use("/css", express.static(path.join(__dirname, 'public/css')));
router.use("/js", express.static(path.join(__dirname, 'public/js')));
router.use("/images", express.static(path.join(__dirname, 'public/images')));

router.get("/trigger-error", (req, res, next) => {
  next(new Error("Intentional 500 error for testing"));
});

module.exports = router;



