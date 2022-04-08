module.exports.successResponse = function (result) {
    return {
        status: 'success',
        response: result
    }
};
module.exports.failResponse = function (result) {
    return {
        status: 'failed',
        response: result
    }
};