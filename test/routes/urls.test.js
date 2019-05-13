import '@babel/polyfill'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../app';
import truncate from '../truncate';
import models, { sequelize } from '../../models/index'
import seed from '../seed'

chai.use(chaiHttp);

describe('urls API', () => {
  before(async () => {
    await truncate();
    await sequelize.sync({ force: true, match: /urlshortener_test$/, logging: false });
    seed(models);
  });

  describe('/GET/:url_code', () => {
    it('should redirect shortened to full url', async () => {
      let urlRecord = await models.Url.findOne({ where: {}, order: [['createdAt', 'DESC' ]]});
      chai.request(app)
      .get(`/${urlRecord.url_code}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.redirects).to.have.lengthOf(1);
        expect(res).to.redirectTo(urlRecord.original_url)
      });
    });
  });

  describe('/GET/urls/:url_code', () => {
    it('it should retrieve shortened URL info by url_code endpoint', async () => {
      let urlRecord = await models.Url.findOne({ where: {}, order: [['createdAt', 'DESC' ]]});
      chai.request(app)
      .get(`/urls/${urlRecord.url_code}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('shortened_url');
        expect(res.body).to.have.property('original_url');

        expect(res.body.id).to.equal(urlRecord.id)
        expect(res.body.shortened_url).to.equal(urlRecord.shortened_url)
        expect(res.body.original_url).to.equal(urlRecord.original_url)
      });
    });
  });

  describe('/POST/urls', () => {
    it('it should takes a url as input, stores the full and shortened url in the db and returns a JSON payload', async () => {
      let data = {
        originalUrl: 'https://www.paybyphone.com'
      }
      chai.request(app)
      .post(`/urls`)
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('shortened_url');
      });
    })
  })
});
