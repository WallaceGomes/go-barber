import Appointment from './../models/Appointment';
import { isEqual } from 'date-fns';

// Data Transfer Object
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    //precisa explicitar o tipo de retorno que essa função terá: Appointment
    public all(): Appointment[] {
        return this.appointments;
    }

    //precisa explicitar o tipo de retorno que essa função terá: Appointment ou null
    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );
        //se encontrar retorna findAppointment se não retorna null
        return findAppointment || null;
    }

    //precisa explicitar o tipo de retorno que essa função terá: Appointment
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
