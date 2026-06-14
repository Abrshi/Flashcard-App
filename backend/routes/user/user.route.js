import express from "express";
import { getquestion, getsubjects } from "../../controller/user/user.controller.js";


const router = express.Router();

router.get("/getsubjects", getsubjects);
router.get("/getquestion", getquestion)


// Example protected route

export default router;