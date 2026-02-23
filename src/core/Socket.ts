import { io } from "socket.io-client";
import { backend } from "../../settings";

export const backsocket = io(backend, {});
