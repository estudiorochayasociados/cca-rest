const faker = require("faker");
const mongodb = require("../config/MongoDB");
const VehicleController = require("../controller/VehicleController");
const item = {};
for (let i = 0; i < 25; i++) {
    item.color = faker.random.arrayElement(["ROJO", "NEGRO", "BLANCO", "AZUL", "ROSADO", "VIOLETA", "MARINO", "AMARILLO", "GRIS", "VERDE", "ANARANJADO",]);
    item.description = faker.lorem.words(25);
    item.direction = faker.random.arrayElement([
        "ASISTIDA",
        "HIDRÁULICA",
        "MECÁNICA",
    ]);
    item.transmission = faker.random.arrayElement(["MANUAL", "AUTOMÁTICO"]);
    item.status = faker.random.arrayElement(["USADO", "NUEVO"]);
    item.status_publication = faker.random.arrayElement(['PUBLICADO', 'NO PUBLICADO', 'EN REVISIÓN']);
    item.brand = "PRUEBA 2";
    item.model = faker.random.arrayElement(["MOTOMEL", "YAMAHA"]);
    item.regularPrice = faker.random.number({ min: 600000, max: 10000000 });
    item.resellerPrice = faker.random.number({
        min: item.regularPrice,
        max: 10000000,
    });
    item.kilometers = faker.random.number({
        min: 0,
        max: 100000,
    });
    item.doors = faker.random.arrayElement(["2", "3", "4", "5"]);
    item.fuel = faker.random.arrayElement(["NAFTA", "GASOIL", "DIESEL", "HÍBRIDO", "ELÉCTRICO"]);
    item.company = faker.random.arrayElement(["61ea981f259f3d1f20a99c25", "61ea9be535432c3994580408", "61ea9c3835432c399458040b", "61ea9c7235432c399458040e", "61ea9d1d35432c3994580411"]);
    item.images = [
        {
            url: faker.image.imageUrl(),
        },
        {
            url: faker.image.imageUrl(),
        },
        {
            url: faker.image.imageUrl(),
        },
        {
            url: faker.image.imageUrl(),
        },
    ];

    VehicleController.create(item).then(() => {
        console.log("CARGADO " + (i + 1))
    });

}
