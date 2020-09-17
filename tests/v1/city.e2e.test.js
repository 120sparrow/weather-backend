const _ = require('lodash');
const sinon = require('sinon');
const superTest = require('../index');

describe('Users', () => {
    let stub;
    before(() => {
        stub = sinon.stub(Date, 'now');
        stub.returns(1599350400000);
    });
    after(() => stub.restore());

    it('should get city temperature data by city name', async () => {
        const response = await superTest
            .get('/weather/Berlin')
            .expect(200)

        return _.isEqual(
            response.body,
            {
                'today': 5,
                'yesterday': 4,
                'week-average': 12
            }
        )
    })
});