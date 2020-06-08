let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();

chai.use(chaiHttp)

describe('Categories', () => {
  describe('/GET categories', () => {
    it('should GET all categories', async () => {
      let res = await chai.request(server)
        .get('/api/categories')
      res.should.have.status(200);
      res.body.should.be.an('array');
    })
  });

  describe('/POST categories', () => {
    it('should create a new Category object', async () => {
      let payload = {
        name: "Business"
      }
      let res = await chai.request(server)
        .post('/api/categories')
        .send(payload)
      res.should.have.status(200)
      res.body.should.have.property('name').eql('Business')
    })
  })

  describe('/PUT categories', () => {
    it('should update a category by ID', async () => {
      let payload = {
        name: "Leisure"
      }
      let category = await chai.request(server)
        .post('/api/categories')
        .send(payload)

      let updatePayload = {
        name: "Travel"
      }

      let res = await chai.request(server)
        .put(`/api/categories/${category.body.id}`)
        .send(updatePayload)
      res.should.have.status(200)
      res.body.should.have.property('name').eql('Travel')
    })

    it('should return an error if ID does not exist', async () => {
      let randomID = Math.floor(Math.random() * 1000000000)

      let updatePayload = {
        name: "Travel"
      }

      let res = await chai.request(server)
        .put(`/api/categories/${randomID}`)
        .send(updatePayload)
      res.should.have.status(404)
    })
  })
})
