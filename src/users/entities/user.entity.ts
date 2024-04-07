import { 
    Column,
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { UserRole } from "../dto/create-user.dto";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;
}
