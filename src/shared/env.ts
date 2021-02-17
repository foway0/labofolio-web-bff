export default Object.freeze({
  SERVICE_PORT: Number(process.env.SERVICE_PORT),
  SERVICE_MODE: String(process.env.SERVICE_MODE),
  MOCK_MODE: String(process.env.MOCK_MODE) === 'on',
});
