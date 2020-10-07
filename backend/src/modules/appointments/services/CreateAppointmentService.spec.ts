import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositories';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12335252323',
    })

    expect(appointment.provider_id).toBe('12335252323');
  });


  // it('should not be able to create two appointments in the same time', () => {
  //   expect(1+ 2).toBe(3);
  // });


})
