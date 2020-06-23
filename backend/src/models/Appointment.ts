import { uuid } from 'uuidv4';

class Appointment {
    id: string;
    provider: string;
    date: Date;

    //Omit = classe helper, importante para omitir argumentos que foram
    //declarados no tipo do objeto mas que não serão utilizados no construtor
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
