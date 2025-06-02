import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Reminder {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field()
  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Field()
  @CreateDateColumn()
  CreatedAt?: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt?: Date;

}
