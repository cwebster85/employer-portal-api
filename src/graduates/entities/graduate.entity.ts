import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Graduate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    university: string;

    @Column()
    degree: string;

    @Column()
    graduationYear: number;

    @Column("text", { array: true })
    skills: string[];

    @Column({ nullable: true })
    portfolioUrl?: string;
}
