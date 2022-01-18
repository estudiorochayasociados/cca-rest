const faker = require("faker");
const mongodb = require("../config/MongoDB");
const VehicleController = require("../controller/VehicleController");
const item = {};
for (let i = 0; i < 20; i++) {
    item.color = faker.random.arrayElement(["ROJO", "NEGRO", "BLANCO", "AZUL", "ROSADO", "VIOLETA", "MARINO", "AMARILLO", "GRIS", "VERDE", "ANARANJADO",]);
    item.description = faker.lorem.words(25);
    item.direction = faker.random.arrayElement([
        "ASISTIDA",
        "HIDRÁULICA",
        "MECÁNICA",
    ]);
    item.transmission = faker.random.arrayElement(["MANUAL", "AUTOMÁTICO"]);
    item.status = faker.random.arrayElement(["NUEVO", "USADO"]);
    item.status_publication = faker.random.arrayElement(["ENABLED", "DISABLED"]);
    item.brand = "FIAT";
    item.model = faker.random.arrayElement([
        "147",
        "500",
        "ARGO",
        "BARCHETTA",
        "BRAVO",
        "BRIO",
        "DUCATO",
        "DUNA",
        "FIORINO",
        "GRAND SIENA",
        "IDEA",
        "LINEA",
        "MAREA",
        "MAREA WEEKEND",
        "MOBI",
        "PALIO",
        "PALIO WEEKEND",
        "PUNTO",
        "QUBO",
        "REGATA",
        "SIENA",
        "SPAZIO",
        "STILO",
        "STRADA",
        "STRADA ADVENTURE",
        "TEMPRA",
        "TIPO",
        "TORO",
        "UNO",
        "VIVACE",
        "125",
        "128",
        "132",
        "133",
        "1500",
        "1600",
        "128 SUPER EUROPA",
        "UNO WAY",
        "COUPE",
        "128 EUROPA",
        "BRAVA",
        "UNO FIRE",
        "OGGI",
        "PANORAMA",
        "PREMIO",
        "SPIDER",
        "PANDA",
        "600",
        "SCUDO",
        "1300",
        "CROMA",
        "850",
        "TALENTO",
        "ULYSSE",
        "1100",
        "150",
        "CARGO",
        "UNO NOVO",
        "124",
        "EVO",
        "851",
        "145",
        "146",
        "750",
        "MULTICARGA",
        "673",
        "619",
        "DOBLO",
        "DOBLO CARGO",
        "CRONOS",
        "FREEMONT"
      ]);
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
    item.company = faker.random.arrayElement(["61e57fa87903d21ef8f886ad", "61e6ce3a740ac513d41885a3", "61e6ce55740ac513d41885a7"]);
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
