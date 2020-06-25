import Appointment from './../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  //precisa explicitar o tipo de retorno que essa função terá: Appointment ou null
  //como este método é async o tipo retornado sempre será uma promise
  //mas a tipagem da promise também pode ser setado como abaixo
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null;
  }

}

export default AppointmentsRepository;
