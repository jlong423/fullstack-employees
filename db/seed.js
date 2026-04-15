import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ mode: "age", min: 18, max: 50 }),
      salary: faker.number.int({ min: 90000, max: 250000 }),
    };
    await createEmployee(employee);
  }
}
