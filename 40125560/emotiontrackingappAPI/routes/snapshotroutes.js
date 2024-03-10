const express = require("express");
const controller = require('../controllers/snapshotcontroller');
const router = express.Router();

router.get("/history", controller.getSnapshotHistory);
router.get("/trends", controller.getTrends);
router.get("/viewsnapshot/:id", controller.getViewSnapshot);

router.post("/record", controller.postRecordSnapshot);
router.post("/updatesnapshot/:id", controller.postUpdateSnapshot);

router.delete("/deletesnapshot/:id", controller.deleteSnapshot);

module.exports = router;
