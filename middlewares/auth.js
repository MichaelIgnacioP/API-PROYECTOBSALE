const User = require('../models/user');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment.locale('es');

const isAuthenticated = async (req, res, next) => {
  if (!req?.headers?.authorization) {
    return res.status(400).json({ message: 'No se introdujo el token' });
  }

  const bearerToken = req.headers.authorization;
  const bearerTokenSplit = bearerToken.split(' ');

  if (bearerTokenSplit.length !== 2 || bearerTokenSplit[0] !== 'Bearer') {
    return res.status(400).json({ message: 'Autorización inválida, recuerde colocar el Bearer seguido del token' });
  }

  const token = bearerTokenSplit[1];

  try {
    const tokenData = await jwt.verify(token, process.env.SECRET_KEY);

    const { id: userId } = tokenData;
    const user = await User.findOne({ _id: userId });

    req.user = user;

    next();
  } catch (error) {
    console.log(JSON.stringify(error, null, 4));

    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: `(${error.name}) El token expiró ${moment(error.expiredAt).fromNow()}` });
    } else {
      return res.status(403).json({ message: 'Token incorrecto' });
    }
  }
};

module.exports = isAuthenticated;
