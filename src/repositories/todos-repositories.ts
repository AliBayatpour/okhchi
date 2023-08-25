import pool from "../pool";
import { rowsParser } from "../utils/to-camel-case";

class TodosRepositories {
  getTodosByUserId = async (userId: string) => {
    let result;
    try {
      const { rows } = await pool.query(
        `SELECT * FROM todo WHERE user_id = $1;`,
        [userId]
      );
      result = rows;
    } catch (err) {
      console.log(err);
      throw new Error("get diary by id failed!");
    }
    return rowsParser(result);
  };

  createTodo = async (todo: any) => {
    let result;
    try {
      const { rows } = await pool.query(
        `INSERT INTO todo (user_id, title, description, state, due_date, sort) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [
          todo.userId,
          todo.title,
          todo.description,
          todo.state,
          todo.dueDate,
          todo.sort,
        ]
      );
      result = rows;
    } catch (error) {
      console.log(error);
      throw new Error("creating diary failed!");
    }

    return rowsParser(result);
  };

  updateTodo = async (todo: any) => {
    let result;
    try {
      const { rows } = await pool.query(
        `UPDATE todo SET updated_at = CURRENT_TIMESTAMP, title = $1, description = $2 ,state = $3, due_date = $4, sort = $5 WHERE user_id = $6 AND id = $7 RETURNING *;`,
        [
          todo.title,
          todo.description,
          todo.state,
          todo.dueDate,
          todo.sort,
          todo.userId,
          todo.id,
        ]
      );
      result = rows;
    } catch (error) {
      console.log(error);
      throw new Error("updating diary failed!");
    }
    return rowsParser(result);
  };

  deleteTodo = async (id: string, userId: string) => {
    let result;
    try {
      const { rows } = await pool.query(
        `DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *;`,
        [id, userId]
      );
      result = rows;
    } catch (error) {
      console.log(error);
      throw new Error("deleting diary failed!");
    }
    return rowsParser(result);
  };
}

export default new TodosRepositories();
