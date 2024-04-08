import { 
    Column,
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { UserRole } from "../dto/create-user.dto";
import { Cat } from "../../cats/entities/cat.entity";

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

    @ManyToMany(() => Cat, (cat) => cat.users)
    @JoinTable()
    favorites: Cat[]
}
