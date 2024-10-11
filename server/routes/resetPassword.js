const express = require("express");
const router = express.Router();
const {
  sendMailForresetPasswordForUser,
  changePasswordByMailForUser,
  sendMailForresetPasswordForInventory,
  changePasswordByMailForInventory,
  sendMailForresetPasswordForAdmin,
  changePasswordByMailForAdmin,
} = require("../controller/userResetPassword");
router.post("/user", sendMailForresetPasswordForUser);
router.post("/user/changepasswordbytoken", changePasswordByMailForUser);
router.post("/inventory-manager", sendMailForresetPasswordForInventory);
router.post("/inventory-manager/changepasswordbytoken", changePasswordByMailForInventory);
router.post("/admin",sendMailForresetPasswordForAdmin);
router.post("/admin/changepasswordbytoken", changePasswordByMailForAdmin);

module.exports = router;
