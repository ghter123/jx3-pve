import cmdHandleRoute from "./cmdHandle/cmdHandleRoute";

/**
 * 
 * @param {Event} data 
 */
export default async function (data) {
    switch (data.post_type) {
        case "message": {
            if (data.message_type === 'group') {
                await cmdHandleRoute(data.message);
            }
        }
        default:
    }
}
