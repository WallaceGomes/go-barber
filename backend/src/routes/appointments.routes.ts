import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentsRepository();

//Marca um agendamento com o profissional
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    //recebe a data em string e salva no formato correto no início na hora
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentRepository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentsRouter;
