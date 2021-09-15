import sinon from 'sinon';
import imageController from '../controllers/images.controller';
import apiResponse from './fixtures';
import nock from 'nock';
import probe from 'probe-image-size';

describe('Images Controller', function () {
    let req = {}, res = {};

    describe('get', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        it('should return images array', async () => {

            nock('https://dev-pb-apps.s3-eu-west-1.amazonaws.com')
                .get('/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json')
                .reply(200, apiResponse);
            sinon.stub(probe.prototype.default).returns({width: 10 , height: 10});
            await imageController(req, res);

        });
    });

});
