import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');
process.env.STRIPE_KEY =
  'sk_test_51OnDVXAMZ9NfggEaOUx7P7EwY2LF0VXCQYFilZoVDZMtxhqohZ2mcpBF4EvB15D8D3zyj3d2bu2vqWh6jyus9MwT00CJK0o2Oe';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'testkey';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session obj {jwt: MY_JWT}
  const session = {
    jwt: token,
  };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string tahts the cookie with the encoded data
  return [`session=${base64}`];
};
