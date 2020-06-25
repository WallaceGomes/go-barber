import { Router } from 'express';
import { startOfHour, parseISO, parse } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();


//Retorna todos os agendamentos
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

//Marca um agendamento com o profissional
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    //recebe a data em string e salva no formato correto no início na hora
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentsRouter;
