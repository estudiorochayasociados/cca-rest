const faker = require("faker");
const mongodb = require("../config/MongoDB");
const UserController = require("../controller/UserController");

for (let i = 0; i < 20; i++) {
  const user = UserController.create({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    password: "123456",
    avatar: { url: faker.image.imageUrl() },
    role: faker.random.arrayElement(["user", "company", "admin"]),
    company: faker.random.arrayElement([
      "61e57fa87903d21ef8f886ad",
      "61e6ce3a740ac513d41885a3",
      "61e6ce55740ac513d41885a7",
    ]),
  });
  console.log(user);
}
