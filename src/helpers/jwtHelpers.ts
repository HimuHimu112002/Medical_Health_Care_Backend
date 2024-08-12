import jwt = require("jsonwebtoken");
export const generateToken = (
  payload: any,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

export const verifyToken = (token: string, secret: jwt.Secret) =>{
  return jwt.verify(token, secret) as jwt.JwtPayload;
}