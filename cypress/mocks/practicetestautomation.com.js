// Mocks for https://practicetestautomation.com

module.exports = {
  login: {
    success: {
      statusCode: 200,
      body: {
        message: 'Congratulations',
        user: {
          username: 'student',
          token: 'mock-token-123'
        }
      }
    },
    failure: {
      statusCode: 401,
      body: {
        error: 'Invalid username or password'
      }
    }
  }
};
