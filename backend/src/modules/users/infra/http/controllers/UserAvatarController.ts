import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UsersController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.excecute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    // delete user.password;
    user.password = '';
    return res.json(user);
  }
}
