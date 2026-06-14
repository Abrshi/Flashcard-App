import express from "express";
import { addquestion, addsubject, getsubjects } from "../../controller/admin/admin.controller.js";


const router = express.Router();


router.post("/addsubject", addsubject);
router.post("/addquestion", addquestion);
router.get("/subjects", getsubjects);


// Example protected route

export default router;