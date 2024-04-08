import { Knex } from "knex";
import { UserRole } from "src/users/dto/create-user.dto";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").truncate();

    await knex("users").insert([
        { email: "admin@gmail.com", firstName: "admin", lastName: "admin", password: "123456", role: UserRole.Admin }
    ]);
}