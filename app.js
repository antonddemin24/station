import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectsController from "./controllers/projectsController.js";
import * as requestUtils from "./utils/requestUtils.js";
import * as network_station from "./network_station.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

//routing requests
const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return requestUtils.redirectTo("/projects");
  } else if (url.pathname === "/network_station" && request.method === "POST") {
        return await projectsController.addNetworStation(request);
  } else if (url.pathname === "/device" && request.method === "POST") {
        return await projectsController.addDevice(request);
  } else if (url.pathname === "/projects" && request.method === "GET") {
        return await projectsController.viewProjects(request);
  } else if (request.method === "POST" && url.pathname.match("network_station/[0-9]+")) {
        return await projectsController.deleteNetworkStation(request);
  } else if (request.method === "POST" && url.pathname.match("device/[0-9]+")) {
        return await projectsController.deleteDevices(request);
  } else {
      return new Response("Not found", { status: 404 });
  }
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

listenAndServe(`:${port}`, handleRequest);