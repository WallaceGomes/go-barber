import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';
import AuthUserService from '../../../services/AuthUserService';

export default class SessionsController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUser = container.resolve(AuthUserService);

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    user.password = '';

    return res.json({ user, token });
  }
}
