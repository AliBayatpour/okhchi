import keys from "../keys";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepositories from "../repositories/user-repositories";

const JWT_KEY = keys.jwtKey!;

const expiresInHour = 1;
const expiresInHourStr = expiresInHour + "h";
const expiresInMili = expiresInHour * 3600000;

class UserService {
  signup = async ({ name, email, password }: any) => {
    let existingUser = null;
    existingUser = (await userRepositories.findByEmail(email))[0];
    console.log(existingUser);

    if (existingUser) {
      throw new Error("user already exists");
    }
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      throw new Error("hashing password failed");
    }

    const newUser = {
      id: "",
      name,
      email,
      password: hashedPassword,
    };
    const createdUser = (await userRepositories.insert(newUser))[0];

    let token;
    try {
      token = jwt.sign(
        { sub: createdUser.id, email: createdUser.email },
        JWT_KEY,
        { expiresIn: expiresInHourStr }
      );
    } catch (error) {
      throw new Error("signing token failed");
    }

    return {
      sub: createdUser.id,
      access_token: token,
      exp: expiresInMili + new Date().getTime(),
    };
  };

  login = async ({ email, password }: any) => {
    let existingUser = null;
    const queryRes = await userRepositories.findByEmail(email);
    existingUser = queryRes?.length && queryRes[0];
    if (!existingUser) {
      throw new Error("user doesn't exists");
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      console.log(error);
      throw new Error("wrong credentials");
    }

    if (!isValidPassword) {
      throw new Error("wrong credentials");
    }

    let token;
    try {
      token = jwt.sign(
        { sub: existingUser.id, email: existingUser.email },
        JWT_KEY,
        { expiresIn: expiresInHourStr }
      );
    } catch (error) {
      throw new Error("signing token failed");
    }
    return {
      sub: existingUser.id,
      access_token: token,
      exp: expiresInMili + new Date().getTime(),
    };
  };
}

export default new UserService();
