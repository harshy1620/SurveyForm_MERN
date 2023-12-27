const { Signup, Login, isAdmin } = require("../controllers/UserControllers");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/isAdmin/:token", isAdmin);

module.exports = router;
