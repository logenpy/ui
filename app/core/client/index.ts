import type { ClientSocket } from "../types";

export function registerClientSocket(client: ClientSocket, rid: string) {
  client.on("connect", () => {
    client.emit("joinRoom", rid);
  });

  client.on("disconnect", () => {
    window.location.href = "/game";
  });
}