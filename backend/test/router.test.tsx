const chai = require('chai');
const sinon = require('sinon');
const nodeMocksHttp = require('node-mocks-http');
const { handleQuery } = require('../src/Routes.tsx');
const mongoose_test = require('mongoose');

const expect_test = chai.expect;

describe('Router Tests', () => {
  let req, res, mockFind, db;

  beforeEach(() => {
    req = nodeMocksHttp.createRequest({
      method: 'GET',
      url: '/query',
      query: {
        search: 'testQuery'
      }
    });
    res = nodeMocksHttp.createResponse();

    db = {
      collection: sinon.stub().returnsThis(),
      find: sinon.stub().returnsThis(),
      toArray: sinon.stub().resolves([])
    };

    sinon.stub(mongoose_test, 'connection').value({ db: db });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should query for published and accepted articles based on search', async () => {
    await handleQuery(req, res);
    expect_test(res._getStatusCode()).to.equal(200);

    db.toArray.resolves([{ Title: 'Test Article' }]);

    await handleQuery(req, res);
    
    expect_test(res._getJSONData()).to.deep.equal([{ Title: 'Test Article' }]);
  });

  it('should return "No article found" message when no articles are found', async () => {

    db.toArray.resolves([]);

    await handleQuery(req, res);
    
    expect_test(res._getJSONData().message).to.equal("No article found, please change a keyword");
  });

  it('should handle errors gracefully', async () => {
    db.toArray.rejects(new Error('Test error'));

    await handleQuery(req, res);
    
    expect_test(res._getStatusCode()).to.equal(500);
    expect_test(res._getJSONData().error).to.equal('Internal server error');
  });
});