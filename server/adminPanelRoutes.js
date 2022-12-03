import express from 'express';

import { registerValidation, loginValidation } from './validation.js';
import { UserController, CardProductController, UploadController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors} from './utils/index.js';

let adminRoute = express.Router(); 

adminRoute.post('/login', loginValidation, handleValidationErrors, UserController.login);
adminRoute.post('/registration', registerValidation, handleValidationErrors, UserController.registration);

adminRoute.get('/getallproducts', CardProductController.getAllProducts); 

adminRoute.post('/createproduct', checkAuth, CardProductController.createProduct); 


adminRoute.post('/upload', checkAuth, UploadController.uploadHandler);


adminRoute.get('/getproduct/:id', checkAuth, CardProductController.getProduct); 
adminRoute.delete('/removeproduct/:id', checkAuth, CardProductController.remove); 
adminRoute.patch('/updateproduct/:id', checkAuth, CardProductController.update); 

adminRoute.get('/me', checkAuth, UserController.getMe);

export default adminRoute;