import { Router } from "express";
import UserControllers from "../controellers/users-controllers";

const router = Router();

router.post('/signup', UserControllers.signup)
router.post('/login', UserControllers.login)


export default router;