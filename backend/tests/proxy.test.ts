// @ts-ignore
import request from 'supertest';
import app from '../src/app';

describe('Proxy API', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('should return history', async () => {
    const res = await request(app).get('/api/v1/history');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return stats', async () => {
    const res = await request(app).get('/api/v1/stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalRequests');
  });

  it('should proxy a valid GET request', async () => {
    // Using a reliable public API for testing
    const res = await request(app)
      .post('/api/v1/proxy')
      .send({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET'
      });
    
    expect(res.status).toBe(200);
    expect(res.body.body.id).toBe(1);
  });

  it('should block local resources', async () => {
    const res = await request(app)
      .post('/api/v1/proxy')
      .send({
        url: 'http://localhost:3000',
        method: 'GET'
      });
    
    expect(res.status).toBe(403);
    expect(res.body.error).toContain('forbidden');
  });
});
