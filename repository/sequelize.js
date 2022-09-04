import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: '0.0.0.0',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: "./db/database.sqlite"
});

sequelize.sync()

export default sequelize;