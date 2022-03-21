import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectsService from "../services/projectsService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as network_station from "../network_station.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

//function for deleting network station
const deleteNetworkStation = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];

  await projectsService.deleteByIdNeworkStation(id);
  return requestUtils.redirectTo("/projects");
};

//function for deleting device
const deleteDevices = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];

  await projectsService.deleteByIdDevices(id);
  return requestUtils.redirectTo("/projects");
};

//function for adding network station
const addNetworStation = async (request) => {
  const formData = await request.formData();
  const x = formData.get("x");
  const y = formData.get("y");
  const reach = formData.get("reach");


  await projectsService.createNetworkStation(x, y, reach);

  return requestUtils.redirectTo("/projects");
};

//function for adding device
const addDevice = async (request) => {
  const formData = await request.formData();
  const x = formData.get("x");
  const y = formData.get("y");

  await projectsService.createDevices(x, y);

  return requestUtils.redirectTo("/projects");
};

//function for viewing network stations, devices from database and finding best relations between them
const viewProjects = async (request) => {
  const data = {
    network_stations: await projectsService.findAllNetworkStations(),
    devices: await projectsService.findAllDevices(),
    res: await network_station.FindingBest()
  };

  return new Response(await renderFile("projects.eta", data), responseDetails);
};

export { addNetworStation, viewProjects, deleteNetworkStation, deleteDevices, addDevice,  };