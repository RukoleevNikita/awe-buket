import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";


export const registration = async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) return res.status(400).json(errors.array());
    
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
    
      const doc = new UserModel({
        email: req.body.email,
        passwordHash: hash,
        fullName: req.body.fullName,
      });
    
      const user = await doc.save();
  
      const token = jwt.sign({
        id: user._id,
      }, 'asdkNJqw23Ni_wn23nsk',
      {
        expiresIn: '30d'
      }
      );
  
      const {passwordHash, ...userData} = user._doc;
  
    
      res.json({
        ...userData,
        token
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Не удалось зарегистироваться' 
      });
    }
};

export const login = async (req, res) => {
    try {
      const user = await UserModel.findOne({
        email: req.body.email
      });

      console.log(req.useId);

  
      if (!user) return res.status(404).json({
        message: 'Неверный логин и пароль'
      });
  
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
  
      if (!isValidPass) return res.status(400).json({
        message: 'Неверный логин и пароль'
      });
  
      const token = jwt.sign({
        id: user._id,
      }, 'asdkNJqw23Ni_wn23nsk',
      {
        expiresIn: '30d'
      }
      );
  
      const {passwordHash, ...userData} = user._doc;
  
      res.json({
        ...userData,
        token
      });
    
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Не удалось авторизоваться' 
      });
    }
};

export const getMe = async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
  
      if (!user) return res.status(400).json({
        message: 'Пользователь не найден'
      });
  
      const {passwordHash, ...userData} = user._doc;
  
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Нет доступа' 
      });
    }
};