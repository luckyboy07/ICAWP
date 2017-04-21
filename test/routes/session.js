var supertest = require('supertest'),
	should = require('should'),
	env = process.env.NODE_ENV || 'development',
	config = require('./../../config/environment/' + env),
	API_URL = config.api_host_url + config.api_version;

describe('Session Routes', function () {
	var app = require('./../../index');
	var data = {
		gamename: 'NoGame' + Date.now(),
		password: 'weeee'
	};

	describe('/api/v1/session', function () {
		it('POST', function (done) {
			this.timeout(10000);
			supertest(app)
				.post('/api/v1/session')
				.set('Content-type', 'application/x-www-form-urlencoded')
				.send(data)
				.expect(200)
				.end(function finish(err, result){
					should.not.exist(err);
					result.body.should.have.property('status', 'success');
					done();
				});
		});

		it('GET existing session', function (done) {
			supertest(app)
				.get('/api/v1/session/' + data.gamename)
				.expect(200)
				.end(function finish(err, result){
					should.not.exist(err);
					result.body.should.have.property('status', 'success');
					done();
				});
		});

		it('GET non-existing session', function (done) {
			supertest(app)
				.get('/api/v1/session/NoGame1407822262438')
				.expect(400)
				.end(function finish(err, result){
					should.not.exist(err);
					result.body.should.have.property('status');
					done();
				});
		});
	});
});
