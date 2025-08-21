import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET ; 

export function authenticate(authorization) {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.slice('Bearer '.length).trim();

  try {
    // Verify signature + expiry
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256'], 
    });

    return {
      tokenValid: true,
      userId: decoded.userId
    };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error("❌ Token expired at:", err.expiredAt);
    } else {
      console.error("❌ Token invalid:", err.message);
    }
    return null;
  }
}

