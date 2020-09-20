import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
