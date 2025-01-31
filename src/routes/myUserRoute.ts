// myUserRoute.ts
import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRequestMiddleware } from "../middleware/validation";

const router = express.Router();


// Get /myUser
router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser);


// Post /myUser
router.post("/", jwtCheck, MyUserController.createCurrentUser);

// Put /myUser
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateRequestMiddleware,
  MyUserController.updateCurrentUser
);



export default router;
