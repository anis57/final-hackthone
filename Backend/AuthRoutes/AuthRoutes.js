import express from 'express';
import { AddAllApplicationData, ForgotPasswordController, GetApplications, LoginController, LogoutController, SignupController } from '../Controller/AuthController/AuthController.js';

export const AuthRoute = express.Router();

AuthRoute.post('/signup', SignupController)
AuthRoute.post('/login', LoginController)
AuthRoute.post('/logout', LogoutController);
AuthRoute.post('/forgot-password', ForgotPasswordController);
AuthRoute.post('/reset-password/:token', ForgotPasswordController);


AuthRoute.get('/all-application', GetApplications)
AuthRoute.post('/add-application-data', AddAllApplicationData)
