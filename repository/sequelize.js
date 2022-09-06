import { Sequelize } from 'sequelize';
import GroupCardModel from './groupCard/groupCard';
import ThinkModel from './groupCard/think';

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

(async () => await sequelize.sync({ alter: true }))();

const GroupCard = GroupCardModel(sequelize, DataTypes);
const Think = ThinkModel(sequelize, DataTypes);

Think.belongsTo(GroupCard, { foreignKey: "groupCardId" })
GroupCard.hasMany(Think, { foreignKey: 'groupCardId', sourceKey: "id" })

export {
    GroupCard,
    Think
}