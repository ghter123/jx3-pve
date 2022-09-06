import { GroupCard, Think, sequelize } from '../../repository/sequelize.js'

export default {
    'getGroupCard': async (groupCardName) => {
        const groupCard = await GroupCard.findOne({
            where: { name: groupCardName },
            include: Think
        })
        const thinks = groupCard.getDataValue('Thinks')
        const goodThinks = thinks.filter(t => t.type === '点赞')
        const badThinks = thinks.filter(t => t.type === '吐槽')
        return {
            '团名': groupCard.getDataValue('name'),
            '点赞数': goodThinks.length,
            '吐槽数': badThinks.length,
            '点赞': goodThinks.map(t => t.content),
            '吐槽': badThinks.map(t => t.content)
        }
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
        const groupCardInfos = await GroupCard.findByPk(groupCard.getDataValue('id'), {
            include: {
                model: Think,
                limit: 5,
                where: {
                    type: '点赞'
                }
            }
        })
        return {
            '团名': groupCardInfos.getDataValue('name'),
            '点赞': groupCardInfos.getDataValue('Thinks').map(t => t.content)
        }
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
        const groupCardInfos = await GroupCard.findByPk(groupCard.getDataValue('id'), {
            include: {
                model: Think,
                limit: 5,
                where: {
                    type: '吐槽'
                }
            }
        })
        return {
            '团名': groupCardInfos.getDataValue('name'),
            '吐槽': groupCardInfos.getDataValue('Thinks').map(t => t.content)
        }
    },
    'getBadGroupCards': async () => {
        const groupCards = await GroupCard.findAll({
            include: {
                model: Think,
                attributes: ['type'],
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
        return groupCards.map(gd => {
            return {
                '团名': gd.name,
                '吐槽数': gd.Thinks.length
            }
        })
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
        return groupCards.map(gd => {
            return {
                '团名': gd.name,
                '点赞数': gd.Thinks.length
            }
        })
    }
}