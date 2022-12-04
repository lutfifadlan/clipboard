import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DummyUser } from "../config/dummy_user";

export class AuthController {
  login({ username, password }: { username: string; password: string }) {
    if (
      username === DummyUser.username &&
      bcrypt.compareSync(password, DummyUser.password)
    ) {
      const token = jwt.sign(
        {
          username,
          password,
        },
        "accesstoken",
        { expiresIn: "7d" }
      );

      return {
        username,
        full_name: DummyUser.full_name,
        access_token: token,
      };
    }

    return null;
  }
}
