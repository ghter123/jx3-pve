export default async function (data) {
    /** @type {Event} event */
    const event = JSON.parse(data.toString());
    switch (event.post_type) {
        case "message": {

        }
        default:
    }
}
