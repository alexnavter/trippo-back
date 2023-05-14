import createDebug from "debug";
import { type CustomError } from "../CustomError/CustomError";
import { app } from "./index.js";

const debug = createDebug("trippo:");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      const errorMessage = "Error on starting the server";

      if (error.code === "EADDRINUSE") {
        debug(`The port number ${port} is already in use`);
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
