# 11장 노드 서비스 테스트하기

## 테스트 준비하기
- nodebird 서비스에 테스팅 적용하여 실습. 개발자나 QA들은 실제 서비스를 개발 완료한 후, 자신이 만든 서비스가 제대로 동작하는지 테스트함. 이 때 테스트를 자동화해 프로그램이 프로그램을 테스트하도록 할 수 있음.
- 테스트를 철저하게 해도 오류를 아예 막을 수는 없음. 에러는 보통 예상하지 못한 케이스에서 발생하기 때문. 이번 장에서는 여러 가지 테스트 기법을 살펴봄.
- jest: 페이스북에서 만든 오픈 소스 패키지. 테스팅에 필요한 툴들을 대부분 갖추고 있음. 9장의 nodebird 프로젝트에 jest 패키지를 설치하여 실습함.
```
$ npm i -D jest
```
- package.json에는 test라는 명령어를 등록하면 명령어를 실행할 때 jest가 실행 됨.
```
//package.json
{
	"name": "nodebird",
    "version":...
    ...,
    "scrpits":{
    	"start":...,
        "test":"jest"
    },
    ...
}
```
- 이후 middlewares 폴더 안에 index.test.js를 만든다.
- 테스트용 파일은 파일명과 확장자 사이에 test나 spec을 넣으면 된다.
- npm test라는 명령어는 테스트 코드를 실행하는데, 파일명에 test나 spec이 들어간 파일들을 찾아 모두 실행함.

- 테스트 성공 예시 (PASS)
- 기대한 값과 실제 결과가 정확히 일치할 때의 모습이다.

```
test('문자열 합치기 테스트', () => {
    const hello = "Hello";
    const world = "World";
    
    // "Hello"와 "World"를 더하면 "HelloWorld"가 될 것이라고 기대함
    expect(Hello + world).toEqual("HelloWorld");
});
```
```
실행결과: 

PASS  middlewares/index.test.js
  ✓ 문자열 합치기 테스트 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
...
```

- 테스트 실패 예시 (FAIL)
- 기대한 값과 실제 결과가 다를 때 나타나는 모습. Jest는 어떤 부분에서 실패했는지 시각적으로 보여줌.

```
test('일부러 틀려보는 테스트', () => {
    const result = 10 + 20;
    
    // 결과는 30이지만, 일부러 50이라고 기대값을 설정
    expect(result).toEqual(50);
});
```

실행결과: 

FAIL  middlewares/index.test.js
  ✕ 일부러 틀려보는 테스트 (5 ms)

  ● 일부러 틀려보는 테스트

    expect(received).toEqual(expected) 

    Expected: 50
    Received: 30

      15 |     
      16 |     // 결과는 30이지만, 일부러 50이라고 기대값을 설정
    > 17 |     expect(result).toEqual(50);
         |                    ^

## 유닛 테스트

- 유닛(단위) 테스트: 작은 단위의 함수/모듈이 의도된 대로 정확히 작동하는지 테스트함. 테스트 코드도 기존 코드가 업데이트 되면 따라서 업데이트해야함.
- 모킹(mocking): 가짜 객체, 가짜 함수를 만들어 넣는 행위.
- 테스트의 역할은 코드나 함수가 제대로 실행되는지, 값이 일치하는지 검사하는 것. 즉, 테스트 코드의 객체가 실제 익스프레스 객체가 아니어도 됨.
- 실제 테스트 실행 전에만 모킹된 객체를 선언하면 됨.
- isLoggedIn 테스트: req, res, next를 모킹해야 함. 함수를 모킹할 때는 Jest의 jest.fn() 메서드를 활용.

- 특히 res 객체의 경우, 실제 코드에서 res.status(403).send('...')와 같이 메서드를 이어서 사용하는 '메서드 체이닝'이 빈번하게 발생한다. 이를 재현하기 위해 res.status 가짜 함수가 실행된 후 다시 res 객체 자신을 반환하도록 jest.fn(() => res) 형태로 정의하여야 함.

```

//middlewares.test.js
const { isLoggedIn,isNotLoggedIn} = require("./middlewares");

describe('isLoggedIn',()=>{
    const res={
        status:jest.fn(()=>res),
        send:jest.fn(),
    };
    const next = jest.fn();

    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함',()=>{
        const req={
            isAuthenticated:jest.fn(()=>true),
        };
        isLoggedIn(req,res,next);
        expect(next).toBeCalledTimes(1);
    });
    
    test('로그인되어 있지 않으면 isLoggedIn이 에러를 응답해야 함',()=>{
        const req={
            isAuthenticated:jest.fn(()=>false),
        };
        isLoggedIn(req,res,next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
    });
});
```
- 첫 번째 테스트 케이스: 로그인 성공 시나리오
req.isAuthenticated가 true를 반환하도록 설정한 뒤, 다음 단계로 넘어가는 next 함수가 정상적으로 호출되는지 검증

- 두 번째 테스트 케이스: 로그인 실패 시나리오
해당 함수가 false를 반환하도록 조작하여, next 대신 상태 코드 403과 에러 메시지가 정확히 응답되는지 확인함
- 이러한 모킹 방식은 외부 환경(DB, 세션)에 의존하지 않고 미들웨어 내부의 분기 로직만 독립적으로 검증할 수 있게 함.
- 미들웨어 테스트: 미들웨어를 유닛 테스트하기 위해서는 라우터 핸들러 내부에 익명 함수로 작성하는 대신, 별도의 파일로 로직을 분리해야 함. 그래야 테스트 코드에서 해당 함수를 직접 require하여 독립적으로 검증할 수 있기 때문임.

## 테스트 커버리지

- 전체 코드 중 어떤 부분이 테스트되고 어떤 부분이 테스트되지 않는지 궁금해짐. 
- coverage 기능: 전체 코드 중 테스트되고 있는 코드의 비율과 그렇지 않은 코드의 위치를 알려주는 jest의 기능.
- 테스트 커버리지가 100%여도 실제로 모든 코드를 테스트한 것은 아닐 수 있음.
```
//package.json
{
    ...
    "test": "jest",
    "coverage": jest --coverage"
    ...
}
```
```
$ npm run coverage
```
- 테스트 결과가 출력되고, 추가적으로 표 하나가 더 출력 됨.

```
% Stmts
//구문 비율

% Branch
//if문 등의 분기점 비율

% Funcs
//함수 비율

% Lines
//코드 줄 수 비율

Uncovered Line #s
//커버되지 않은 줄 위치
(퍼센티지가 높을 수록 많은 코드가 테스트 되었다는 뜻)
```

## 통합 테스트

- 하나의 라우터를 통째로 테스트 함.
- routes 폴더에 auth.test.js 작성.
- 하나의 라우터에는 여러 개의 미들웨어가 붙어 있고, 다양한 라이브러리가 사용됨. 이런 것들이 모두 유기적으로 잘 작동하는지 테스트 할 수 있음.
```
$ npm i -D supertest
// 테스트를 위해 supertest를 설치함
```
- supertest를 사용하기 위해서는 app 객체를 모듈로 만들어 분리해야 함.
- app.js파일에서 app객체를 모듈로 만든 후, server.js에서 불러와 listen 함.
- server.js는 app의 포트 리스닝만 담당한다.
```
  "scripts": {
    "start":"nodemon server",
    "test": "jest",
    "coverage":"jest --coverage"
  },
// 테스트용 데이터베이스 설정
```
```
// routes/auth.test.js
const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async ()=>{
	await sequilize.sync();
});

describe('POST /login',()=>{
	test('로그인 수행', (done)=>{
    	request(app)
        .post('/auth/login')
        .send({
        	"email":"zerohch@gmail.com",
            "password":"nodejsbook"
        })
        .expect('Location','/')
        .expect(302, done);
    });
});
// Supertest를 이용해 실제 서버에 요청을 보내고 응답을 확인하는 통합 테스트
```

- 준비 (beforeAll): 테스트 시작 전 DB 테이블을 실제 모델과 똑같이 만듦.
- 요청 (request): /auth/login 경로로 이메일과 비밀번호를 담아 POST 요청을 보냄.
- 검증 (expect): 상태 코드가 302(리다이렉트)인지, 로그인 성공 후 메인 페이지(/)로 이동하는지 확인함.

## 부하 테스트

- 서버가 얼마만큼의 요청을 견딜 수 있는지(수용할 수 있는지) 테스트하는 방법.
- 유닛/통합 테스트를 통해 코드의 문법적/논리적 문제는 예상할 수 있으나, 서버가 몇 명의 사용자를 수용할 수 있는지 예측하기 힘듦.
- 서버는 접속자들의 정보를 저장하기 위해 각각의 접속자마자 일정한 메모리를 할당함. 이렇게 사용되는 메모리의 양이 증가하다 서버의 메모리 용량을 초과하면 oom(out of memory) 와 같은 문제가 생길 수 있음.
```
$ npm i -D artillery
$ npm start // 윗 줄로 설치 후 서버 실행

$ npx artillery quick --count 100 -n 50 http://localhost:8001
$ npx artillery quick ... : localhost에 빠르게 부하 테스트를 하는 방법.
```

- count: 가상의 사용자 수
- n: 요청 횟수
- 위 코드에서는 100명의 가상 사용자가 50번씩 요청하므로 총 5000번의 요청이 서버로 전달됨. 하나의 요청이 얼마나 많은 작업을 하는지가 중요.

```
실행결과:

--------------------------------------
Metrics report @ 2025-12-22T00:15:00Z
--------------------------------------

http.codes.200: ............................. 5000
http.request_rate: ........................... 240/sec
http.requests: ............................... 5000
.
.
.
Request lateny:
  min: ....................................... 2
  max: ....................................... 150
  median: .................................... 12
  p95: ....................................... 45
  p99: ....................................... 92
Request latency: 응답 지연 속도
```
- json 형식의 설정 파일을 통해 실제 사용자의 행동을 모방하여 시나리오를 작성할 수 있음. ex: 메인 페이지에 접속 후 로그인을 한 후 해시태그 검색을 함.
- request latency가 중요한데, 대부분의 요청이 비슷한 속도로 처리되기 위해선 median과 p95값의 차이가 크지 않으면 좋음.

//loadtest.json
{
    "config":{
        "target":"http://localhost:8001",
        "phases":[
            {
                "duration":60,
                "arrivalRate":30
            }
        ]
    },
    "scenarios":[{
        "flow":[
            {
                "get":{
                    "url":"/"
                }
            },{
                "post":{
                    "url":"/auth/login",
                    "json":{
                        "email":"zerohch@gmail.com",
                        "password":"nodejsbook"
                    }
                }
            },{"get":{
                "url":"/hashtag?hashtag=nodebird"
                }
            }
        ]
    }]
}

- 테스트 실행시 모든 요청이 모든 데이터베이스에 최소 한 번씩 접근함으로 무리가 됨.
- 테스트를 진행할수록 요청의 속도가 느려지는 것은 서버가 부하 테스트를 하는 정도의 요청을 감당하지 못한다는 뜻임.
- 해결 방법: 서버 사양 업그레이드, 서버 여러 개 두기, 데이터베이스에 접근하는 요청 줄이기(반복적으로 가져오는 데이터 캐싱)




## 프로젝트 마무리하기