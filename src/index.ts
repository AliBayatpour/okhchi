import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users-routes";
import keys from "./keys";
import HttpError from "./models/http-error";
import pool from "./pool";
import todoRoutes from "./routes/todos-routes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use(() => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

pool
  .connect()
  .then(() => {
    app.listen(keys.port, () => {
      console.log(`Example app listening on port ${keys.port}`);
    });
  })
  .catch((err: Error) => console.log(err));

// SOME REFERENCES FOR THE FRONT-END CODE
// const response = await axios.get<{ items: Item[] }>(
//   `${process.env.REACT_APP_BACK_END_URL}/items/`,
//   {
//     headers: {
//       Authorization: `Bearer ${getAccessToken()}`,
//     },
//   }
// );

// export const getAccessToken = (): string | null => {
//   return localStorage.getItem("access_token");
// };
