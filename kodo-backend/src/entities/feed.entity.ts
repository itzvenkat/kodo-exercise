import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('feed')
export class FeedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column('text')
    description: string;

    @Column()
    dateLastEdited: string;
}