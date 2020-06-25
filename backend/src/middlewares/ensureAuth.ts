import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT Token is missing');
  }

  //Bearer token
  //divide a string no espaço e pega apenas o token
  //que está na posição [1] do array que retorna

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    //setando o tipo do token "forçado", se não não é possivel fazer a desestruturação
    const { sub } = decodedToken as TokenPayload;

    //só é possível utilizar o user dentro do request pois na pasta
    //@types essa tipagem foi anexada
    //agora toda rota que utilizar esse middleware terá esse id na request
    request.user = {
      id: sub,
    }

    return next();

  } catch (err) {
    throw new Error('Invalid JWT token');
  }

}
