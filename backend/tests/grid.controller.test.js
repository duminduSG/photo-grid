import sinon from 'sinon';
import gridController from '../controllers/grid.controller';
import GridModel from '../models/grid.model.js';


describe('Grid Controller', function () {
    let req = {
        body: [
            {id:204900001,'src':'https://placeimg.com/2560/2560/any','width':2000,'height':2000,'isSelected':false},
            {id:204900002,'src':'https://placeimg.com/2560/2560/any','width':2000,'height':2000,'isSelected':false}
        ]
    },
    error = new Error('Unexpected Error'),
    res = {}, expectedResult;

    describe('save', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
        afterEach(function () {
            GridModel.prototype.save.restore(); // Unwraps the spy
        });
        it('should return created grid object', async () => {
            expectedResult = req.body;
            sinon.stub(GridModel.prototype, 'save').yields(null, expectedResult);
            await gridController(req, res);
            sinon.assert.calledWith(GridModel.prototype.save);
        });
        it('should return status 500 on server error', async () => {
            sinon.stub(GridModel.prototype, 'save').yields(error);
            await gridController(req, res);
            sinon.assert.calledWith(GridModel.prototype.save);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

});
