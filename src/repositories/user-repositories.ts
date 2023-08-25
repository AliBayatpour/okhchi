import pool from "../pool";
import { rowsParser } from "../utils/to-camel-case";

class UserRepo {
  findByEmail = async (email: string) => {
    let result;

    try {
      const { rows } = await pool.query(
        `
            SELECT * FROM users WHERE email = $1;
          `,
        [email]
      );
      result = rows;
    } catch (error) {
      console.log(error);
      throw new Error("getting email failed!");
    }

    return rowsParser(result);
  };

  insert = async (createdUser: any) => {
    let result;
    try {
      const { rows } = await pool.query(
        `
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING *;
          `,
        [createdUser.name, createdUser.email, createdUser.password]
      );
      result = rows;
    } catch (error) {
      console.log(error);
      throw new Error("creating user failed!");
    }
    return rowsParser(result);
  };
}
export default new UserRepo();
