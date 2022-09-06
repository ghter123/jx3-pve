import { GroupCard, Think, sequelize } from '../../repository/sequelize.js'

export default {
    'getGroupCard': async (groupCardName) => {
        const groupCard = await GroupCard.findOne({
            where: { name: groupCardName },
            include: Think
        })
        return groupCard
    },
    'putGoodGroupCardThink': async (groupCardName, content) => {
        let groupCard = await GroupCard.findOne({
            where: {
                name: groupCardName
            }
        })
        if (!groupCard) {
            groupCard = await GroupCard.create({
                name: groupCardName
            })
        }
        await Think.create({
            groupCardId: groupCard.getDataValue('id'),
            type: '点赞',
            content
        })
        return await GroupCard.findByPk(groupCard.getDataValue('id'), { include: Think })
    },
    'putBadGroupCardThink': async (groupCardName, content) => {
        let [groupCard] = await GroupCard.findOrCreate({
            where: {
                name: groupCardName
            }
        })
        await Think.create({
            groupCardId: groupCard.getDataValue('id'),
            type: '吐槽',
            content
        })
        return await GroupCard.findByPk(groupCard.getDataValue('id'), {
            include: Think
        })
    },
    'getBadGroupCards': async () => {
        const groupCards = await GroupCard.findAll({
            include: {
                model: Think,
                attributes: [],
                where: {
                    type: '吐槽'
                },
                group: 'type',
                order: [
                    [sequelize.fn('count', sequelize.col('type')), 'desc']
                ]
            },
            limit: 10
        })
        return groupCards
    },
    'getGoodGroupCards': async () => {
        const groupCards = await GroupCard.findAll({
            include: {
                model: Think,
                attributes: ['type'],
                where: {
                    type: '点赞'
                },
                group: 'type',
                order: [
                    [sequelize.fn('count', sequelize.col('type')), 'desc']
                ]
            },
            limit: 10
        })
        return groupCards
    }
}