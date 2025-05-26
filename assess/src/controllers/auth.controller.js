import { json } from "express";
import { users } from "../models/user.model.js";
import { checkValue, generateToken } from "../utils/common.utils.js";
import { v4 as uuid } from "uuid";

export class AuthController {
  static register(req, res) {
    try {
      const { name, role, email, password } = req.body;
      if (checkValue(name)) {
        res.json({ success: false, message: "Invalid name value" });
        return;
      }
      if (checkValue(email)) {
        res.json({ success: false, message: "Invalid email value" });
        return;
      }
      if (checkValue(password)) {
        res.json({ success: false, message: "Invalid password value" });
        return;
      }
      if (checkValue(role)) {
        res.json({ success: false, message: "Invalid role value" });
        return;
      }
      if (role !== "user" && role !== "agent") {
        return res.json({ success: false, message: "invalid role type" });
      }

      const user = users.filter((e) => e.email === email);
      if (user.length > 0) {
        return res.json({ success: false, message: "email already exist" });
      } else {
        users.push({
          id: uuid(),
          name,
          email,
          role,
          password,
        });
        return res.json({
          success: true,
          message: "successfully registerd !",
        });
      }
    } catch (err) {
      res.json({ success: false, message: err });
    }
  }
  static login(req, res) {
    try {
      const { email, password } = req.body;
      if (checkValue(email)) {
        res.json({ success: false, message: "Invalid email value" });
        return;
      }
      if (checkValue(password)) {
        res.json({ success: false, message: "Invalid password value" });
        return;
      }
      const user = users.filter((e) => e.email);
      if (user.length > 0) {
        if (user[0].password === password) {
          const accessToken = generateToken(
            {
              email,
              id: user[0].id,
              role: user[0].role,
            },
            "15d"
          );
          const refreshToken = generateToken(
            {
              email,
              id: user[0].id,
              role: user[0].role,
            },
            "30d"
          );
          return res.json({
            success: true,
            accessToken,
            refreshToken,
            user: {
              email,
              id: user[0].id,
              role: user[0].role,
              name: user[0].name,
            },
          });
        }
      }
      else{
        return res.json({success:false,message:"user not found"})
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: err });
    }
  }
  static profile(req,res){
    try{
      const {id} =req.user
      console.log(req.user)
      if(checkValue(id)){
        return res.json({success:false,message:"invalid token"})
      }

      const user =users.filter(e=>e.id===id)
      if(user.length>0){
        return res.json({success:true,user:{name:user[0].name,email:user[0].email,role:user[0].role}})
      }
    }
    catch(err){
      return res.json({success:false,message:err})
    }
  }
}
