import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: '../db/jx3pve',
    operatorsAliases: false
});

export default sequelize;