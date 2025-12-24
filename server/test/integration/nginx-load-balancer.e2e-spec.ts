import * as request from 'supertest';

describe('Nginx Load Balancer Integration', () => {
  const instancesCount: Record<string, number> = {};

  test('Распределение нагрузки между app и app2', async () => {
    const requestsCount = 20;

    for (let i = 0; i < requestsCount; i++) {
      const res = await request('http://localhost').get('/');
      // Предположим, backend добавляет заголовок 'X-App-Instance' с именем 'app' или 'app2'nginx-load-balancer.e2e-spec.t
      const instance = res.headers['x-app-instance'] || 'unknown';

      instancesCount[instance] = (instancesCount[instance] || 0) + 1;
    }

    console.log('Распределение запросов:', instancesCount);

    const total = Object.values(instancesCount).reduce((a, b) => a + b, 0);
    expect(total).toBe(requestsCount);

    // Ожидаем, что из-за балансировки обе копии отвечают
    expect(Object.keys(instancesCount).length).toBeGreaterThan(1);

    // Дополнительные проверки: например, инстанс не может быть "unknown"
    expect(instancesCount['unknown']).toBeUndefined();
  });
});