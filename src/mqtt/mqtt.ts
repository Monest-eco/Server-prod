import * as mqtt from 'mqtt';
import config from 'src/configs/deafult.config';

/**
 * generic MQTT client
 */
export class MqttController {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(
      `mqtt://${config.hosting.url}:${config.hosting.port}`,
      {
        clean: config.mqtt.clean,
        connectTimeout: config.mqtt.connectTimeout,
        reconnectPeriod: config.mqtt.reconnectPeriod,
      },
    );
  }

  /**
   * Connect to MQTT broker
   * @param callback function to trigger when connected
   */
  public onConnect(callback: () => void) {
    this.client.on('connect', callback);
  }

  /**
   * trigger when message received
   * @param callback function to trigger when message received
   */
  public onMessage(callback: (topic: string, payload: Buffer) => void) {
    this.client.on('message', callback);
  }

  /**
   * trigger when you subscribe to a topic
   * @param topics array of topics to subscribe
   * @param callback function to trigger when subscribed
   */
  public subscribe(topics: string[], callback: () => void) {
    this.client.subscribe(topics, callback);
  }
}
