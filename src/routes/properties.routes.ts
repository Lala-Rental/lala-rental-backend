import express from "express";
import * as PropertiesController from "../controllers/properties.controller";

const router = express.Router();

router.get('/', PropertiesController.listProperties);
router.get('/:id', PropertiesController.showProperty);
router.post('/', PropertiesController.storeProperty);
router.put('/:id', PropertiesController.updateProperty);
router.delete('/:id', PropertiesController.deleteProperty); 

export default router;