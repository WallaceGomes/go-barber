import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  //Omit = classe helper, importante para omitir argumentos que foram
  //declarados no tipo do objeto mas que não serão utilizados no construtor
  /*
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
      this.id = uuid();
      this.provider = provider;
      this.date = date;
  }
  */
}

export default Appointment;
