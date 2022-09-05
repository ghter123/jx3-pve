import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const Think = sequelize.define('Think', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    groupCardId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.ENUM(['吐槽', '点赞'])
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

});

export default Think