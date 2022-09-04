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
        allowNull: null
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

Think.associations = function (models) {
    Think.belongsTo(models.GroupCard, {
        foreignKey: "groupCardId"
    })
}

export default Think