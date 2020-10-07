import { uuid } from 'uuidv4';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => appointment.date === date,);

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    //Também pode ser feito com o Object.assign
    // Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
