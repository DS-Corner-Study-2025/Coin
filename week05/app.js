const express = require('express'); // 첫 줄과 두번째 줄은 그냥 암기. require 함수는 express 모듈을 가져오는 역할을 함.
// nodejs 문법으로, import과 비슷함
const app = express(); //express 모듈을 실행해 app 변수에 할당.
// 이 모듈 내부에 http 모듈 내장돼서 서버 역할 가능
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트 설정 app.set(키, 값)으로 데이터 저장
// app.set('port', 포트)로 서버가 실행될 포트를 설정
app.get('/', (req, res) => {
  res.send('Hello, Express');
}); // app.get(주소, 라우터) 이 주소로 겟 요청 들어오면 어떤 동작 할래?

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

```
const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});
app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
```