/**
 * Monest configuration interface.
 * It's the configuration type for the Monest server.
 * This configuration is used in every service in monest-server.
 */
export interface MonestConfig {
  /**
   * information about the hosting server
   */
  hosting: {
    /**
     * the url of the hosting server
     * @default cyrilserver.ddns.net
     */
    url: string;
    /**
     * the port of the hosting server
     * @default 25565
     */
    port: number | string;
  };
  /**
   * MQTT configuration
   */
  mqtt: {
    /**
     * true, set to false to receive QoS 1 and 2 messages while offline
     * @default true
     */
    clean: boolean;
    /**
     * Connection timeout in milliseconds
     */
    connectTimeout: number;
    /**
     * reconnect period in milliseconds
     */
    reconnectPeriod: number;
  };
  /**
   * Database configuration
   */
  database: {
    /**
     * the url of the database
     * @default postgres
     * @default localhost
     */
    url: string;
  };
}
