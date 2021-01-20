import redis from 'ioredis';
export class RedisService {
  client = new redis(49154, '127.0.0.1', {db: 0});
  async setMessageTemplate(messageId: string, payload: string) {
    return await this.client.set(messageId, payload);
  }
  async getMessageTempelate(messageId: string) {
    let message = await this.client.get(messageId);
    console.log(message);
    return message;
  }
}
