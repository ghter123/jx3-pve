import GroupCard from '../../repository/groupCard/groupCard.js'
import Think from '../../repository/groupCard/think.js'
import { Owner } from '../../repository/groupCard/think.js'

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
        return await GroupCard.findByPk(groupCard.getDataValue('id'), { include: Owner })
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
            include: Owner
        })
    }
}