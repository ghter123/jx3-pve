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

const GroupCard = GroupCard(sequelize, DataTypes);
const Think = VideoModel(sequelize, DataTypes);

export const Owner = Think.belongsTo(GroupCard, {
    foreignKey: "groupCardId"
})

export default sequelize;