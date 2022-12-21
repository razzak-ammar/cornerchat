const jwt = require('jsonwebtoken');

exports.checkAuth = (authToken) => {
  const token = authToken;
  let result = false;
  // Verify Token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.log(
          'SocketIO: Token processing has failed in the JWT Verify process'
        );
        result = false;
      } else {
        console.log(
          'SocketIO: Token processing has passed in JWT Verify process'
        );
        result = { result: true, decodedToken: decodedToken.user };
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    console.error(err.message);
    result = { result: false };
  }

  return { result };
};
