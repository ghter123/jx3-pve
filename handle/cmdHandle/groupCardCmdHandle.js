import GroupCard from '../../repository/groupCard/groupCard'
import Think from '../../repository/groupCard/think'

export default {
    'getGroupCard': async (groupCardName) => {
        const groupCard = await GroupCard.findOne({
            where: { name: groupCardName },
            include: Think
        })
        return groupCard
    },
    'putGroupCardThink': async (groupCardName, type, content) => {
        let [groupCard] = await GroupCard.findOrCreate({
            where: {
                name: groupCardName
            }
        })
        await Think.create({
            groupCardId: groupCard.getDataValue('id'),
            type,
            content
        })
        return await GroupCard.findByPk(groupCard.getDataValue('id'), { include: Think })
    }
}