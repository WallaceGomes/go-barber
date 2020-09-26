import Appointment from '../entities/Appointment';
import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  //precisa explicitar o tipo de retorno que essa função terá: Appointment ou null
  //como este método é async o tipo retornado sempre será uma promise
  //mas a tipagem da promise também pode ser setado como abaixo
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
