import { Router } from 'express';
import { startOfHour, parseISO, parse } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAuth from '../../../../users/infra/http/middlewares/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

//Retorna todos os agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

//Marca um agendamento com o profissional
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  //recebe a data em string e salva no formato correto no início na hora
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
