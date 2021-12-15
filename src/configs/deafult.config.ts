import { MonestConfig } from 'src/@types/MonestConfig';

/**
 * /!\ DO NOT MODIFY THIS FILE
 * This is the basic configuration file for the Monest server.
 */
const config: MonestConfig = {
  hosting: {
    url: 'cyrilserver.ddns.net',
    port: '25565',
  },
  // MQTT configuration
  mqtt: {
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  },
  // Database configuration
  database: {
    url: 'postgres',
  },
};

export default config;
