import { executeQuery } from "../database/database.js";

//quary for adding network station's information in database
const createNetworkStation = async (x, y, reach) => {
  await executeQuery("INSERT INTO network_stations (x, y, reach) VALUES ($1, $2, $3);", 
  x, y, reach);
};

//quary for adding devices' information in database
const createDevices = async (x, y) => {
  await executeQuery("INSERT INTO devices (x, y) VALUES ($1, $2);", x, y);
};

//quary for deleting network station information in database
const deleteByIdNeworkStation = async (id) => {
  await executeQuery("DELETE FROM network_stations WHERE id = $1;", id);
};

//quary for deleting device information in database
const deleteByIdDevices = async (id) => {
  await executeQuery("DELETE FROM devices WHERE id = $1;", id);
};

//quary for finding all network stations information in database
const findAllNetworkStations = async () => {
  let result = await executeQuery(
    "SELECT * FROM network_stations;",
  );
  return result.rows;
};

//quary for finding all devices information in database
const findAllDevices = async () => {
  let result = await executeQuery(
    "SELECT * FROM devices;",
  );
  return result.rows;
};

export { createNetworkStation, createDevices, findAllNetworkStations, deleteByIdNeworkStation, deleteByIdDevices, findAllDevices };