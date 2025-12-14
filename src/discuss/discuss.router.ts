import { Router } from "express";
import { discussController } from "./discuss.controller";

const discussRouter = Router();

discussRouter.get('/discuss', discussController.showDiscussPage.bind(discussController));

export default discussRouter;