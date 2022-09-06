export default (sequelize, DataTypes) => sequelize.define('GroupCard', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tiebaUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {});