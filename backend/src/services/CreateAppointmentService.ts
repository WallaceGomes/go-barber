import Appointment from './../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentRepository';

//continua sendo um DTO
interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    //dependency inversion

    private appointmentsRepository: AppointmentsRepository;

    constructor(AppointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = AppointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}
export default CreateAppointmentService;
