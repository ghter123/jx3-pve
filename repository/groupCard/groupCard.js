import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const GroupCard = sequelize.define('GroupCard', {
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
        allowNull: false
    },
    tiebaUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    // Other model options go here
});

export default GroupCard