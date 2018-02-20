/**
 * If the string is JSON, print it nicely
 * @param  {String} json Possibly JSON
 * @return {String}
 */
module.exports = (json) => {
    try {
        return JSON.stringify(JSON.parse(json), null, 4);
    } catch (error) {
        return json;
    }
}
