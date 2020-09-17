class BaseController {

    __processErrors(e, res) {
        if (e.response && e.response.body && e.response.body.code) {
            return res.status(e.response.statusCode).json(e.response.body);
        }

        throw e;
    }

}

module.exports = BaseController;