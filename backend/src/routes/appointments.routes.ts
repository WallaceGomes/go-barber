import { Router } from 'express';
import { startOfHour, parseISO, parse } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentRepository';
import CreateAppointmentService from './../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

//Retorna todos os agendamentos
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

//Marca um agendamento com o profissional
appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        //recebe a data em string e salva no formato correto no início na hora
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default appointmentsRouter;
