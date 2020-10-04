import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuth from '../../../../users/infra/http/middlewares/ensureAuth';

const appointmentsRouter = Router();
const appointmentController = new AppointmentsController();

appointmentsRouter.use(ensureAuth);

//Retorna todos os agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

//Marca um agendamento com o profissional
appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
