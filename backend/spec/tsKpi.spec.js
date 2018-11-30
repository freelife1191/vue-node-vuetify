const request = require('supertest');
const should = require('should');
const m = require('moment');
const app = require('../app')
const { sequelize, TsKpi } = require('../models');

const testData = [
  {
    broadDate: m().subtract(4,'days').toDate(),
    prdNm: '퍼실 세제(Persil-Detergent)',
    dealNo: '11111111',
  },
  {
    broadDate: m().subtract(2,'days').toDate(),
    prdNm: 'LG건조기(LG Dryer)',
    dealNo: '22222222',
  },
  {
    broadDate: m().toDate(),
    prdNm: '캘리포니아 멜론(Melon)',
    dealNo: '33333333',
  },
];

// 테스트 시에는 app.js 의 sync를 주석처리

describe('GET /api/echo', ()=> {

  // before(()=>sequelize.sync({force: true}));
  before(()=> TsKpi.bulkCreate(testData));

  describe('성공시', ()=> {
    it('TS KPIs 리스트 호출 ', (done)=> {
      request(app)
        .get('/api/echo')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          res.body.forEach(data=> {
            // console.log(data);
            data.should.have.property('id');
          });
          done()
        })
    })
  })
})


/*

describe('GET /api/testInfo/:id', ()=> {
  before(()=>sequelize.sync({force: true}));
  before(()=> TestInfo.bulkCreate(testData));

  describe('성공시', ()=> {
    it('특정 가설 항목 가져오기 ', (done) => {
      request(app)
        .get('/api/testInfo/1')
        .end((err, res) => {
          res.body.should.have.instanceOf(Object);
          done()
        })
    })
  })
})


const testMappingData = [
  { significanceOfCtr: true, testInfoId: 1, broadProgramId: 1},
  { significanceOfCtr: false, testInfoId: 2, broadProgramId: 2},
  { testInfoId: 3, broadProgramId: 3}
];
const broadProgramData = [
  {
    test: 'K',
    control: 'S',
    startDatetime: '2018-10-14 14:01',
    endDatetime: '2018-10-14 15:01',
  },
  {
    test: 'K',
    control: 'S',
    startDatetime: '2018-10-15 13:01',
    endDatetime: '2018-10-15 14:01',
  },
  {
    test: 'K',
    control: 'S',
    startDatetime: '2018-10-16 13:01',
    endDatetime: '2018-10-16 12:01',
  }
];
const productData = [
  {
    prdId: '330110',
    categoryName: 'food',
    prdNm: '된장찌개',
    broadPrice: 30000,
    broadProgramId: 1
  },
  {
    prdId: '330120',
    categoryName: 'fashion',
    prdNm: '트랜치코트',
    broadPrice: 170000,
    broadProgramId: 2
  },
  {
    prdId: '330130',
    categoryName: 'food',
    prdNm: '갈매기살',
    broadPrice: 100000,
    broadProgramId: 3
  }
];
describe.only('POST /api/testInfo', ()=> {
  before(()=>sequelize.sync({force: true}));
  before(()=> TestInfo.bulkCreate(testData));
  before(()=> BroadProgram.bulkCreate(broadProgramData));
  before(()=> TestInfoMapping.bulkCreate(testMappingData));
  before(()=> Product.bulkCreate(productData));

  describe('성공시', ()=> {
    const dummy = { area: '영역', detailArea: '세부영역', hypothesis: '가설 등록테스트', hashtag: ['사랑','용서','자비','죽음'] };
    dummy.broadPrograms = [
      {
        test: 'K',
        control: 'S',
        startDate: '2018-10-17',
        startTime: '13:01',
        endTime: '14:01',
        products: [
          {
            prdId: '330330',
            categoryName: 'baby',
            prdNm: '애기1',
            broadPrice: 110000
          },
          {
            prdId: '330331',
            categoryName: 'baby2',
            prdNm: '애기2',
            broadPrice: 120000
          }
        ]
      },
      {
        test: 'K',
        control: 'S',
        startDate: '2018-10-17',
        startTime: '14:01',
        endTime: '15:01',
        products: [
          {
            prdId: '330332',
            categoryName: 'shark1',
            prdNm: '상어1',
            broadPrice: 110000
          },
          {
            prdId: '330333',
            categoryName: 'shark2',
            prdNm: '상어2',
            broadPrice: 120000
          }
        ]
      },
      {
        test: 'K',
        control: 'S',
        startDate: '2018-10-17',
        startTime: '15:01',
        endTime: '16:01',
        products: [
          {
            prdId: '330334',
            categoryName: 'dance1',
            prdNm: '춤1',
            broadPrice: 50000
          }
        ]
      },
    ];

    let body;
    before(done => {
      request(app)
        .post('/api/testInfo')
        .send(dummy)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done()
        })
    });
    it('생성된 유저 객체를 반환한다', ()=>{
      body.should.have.property('id');
    });
    it('입력한 hypothesis을 반환한다', ()=> {
      body.should.have.property('hypothesis', dummy.hypothesis)
    })
  })

})


describe('DELETE /api/testInfo', ()=> {
  before(()=>sequelize.sync({force: true}));
  before(()=> TestInfo.bulkCreate(testData));

  describe('성공시', ()=> {
    it('204를 응답한다', (done)=>{
      request(app)
        .delete('/api/testInfo/1')
        .expect(204)
        .end(done);
    })
  });
  describe('실패시', ()=> {
    it('id가 숫자가 아닐경우 400으로 응답한다', done=>{
      request(app)
        .delete('/api/testInfo/a')
        .expect(400)
        .end(done);
    })
  });
})
*/
