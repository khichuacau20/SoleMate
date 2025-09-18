import request from 'supertest';
import express from 'express';

const app = express();

describe('Sample Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should respond to health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});
