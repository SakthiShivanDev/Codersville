import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkValue = (value) => {
  return value === "" || value === undefined;
};

export const generateToken = (payload, time) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time });
};

export const verfiyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return false;
    } else if (decoded === undefined) {
      return false;
    } else {
      return decoded;
    }
  });
};
