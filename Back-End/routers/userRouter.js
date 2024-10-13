import express from "express"; //افضل من الريكواير 

import { getUsers ,singup ,login} from "../controllers/userController.js";
import { addBook } from "../controllers/bookContoller.js";
const router = express.Router();
router.post("/register", singup);
router.post("/login", login);
router.get("/user/:id", getUsers);

//add book 
router.post("/addbook",addBook)

export default router;