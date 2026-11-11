import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import optionalAuthentication from "../middlewares/optionalAuthentication.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(optionalAuthentication,getJobById);

export default router;
