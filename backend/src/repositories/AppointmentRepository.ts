import Appointment from './../models/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );
        //se encontrar retorna findAppointment se não retorna null
        return findAppointment || null;
    }

    //precisa explicitar o tipo de retorno que essa função terá: Appointment
    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
