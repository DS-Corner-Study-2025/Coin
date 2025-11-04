# 5주차 스터디

## 5장

1) npm
- npm: node package manager
- 대부분의 자바스크립트 프로그램은 패키지라는 이름으로 npm에 등록되어 있으므로, 특정 기능을 하는 패키지가 필요하다면 npm에서 찾아 설치하면 됨. 
- 의존 관계: 패키지 하나가 다른 여러 패키지에 의존하곤 함.
- package.json: 어떤 패키지를 설치했는지 나옴.
- package-lock.json: 패키지들의 정확한 버전과 의존 관계가 담겨 있음. 패키지 간의 의존 관계를 명시한 파일.
- node_modules: 설치한 패키지의 내용이 담겨 있음.
- nodemon: 소스 코드가 바뀔 때마다 (저장 이후) 자동으로 노드를 재실행해주는 패키지.
- devDependencies: 개발용 패키지들만 따로 관리.

## 6장

1) 미들웨어

- 미들웨어: 요청과 응답의 중간에 위치함. 요청/응답을 조작해 기능을 추가하거나 나쁜 요청을 걸러내기도 함. 익스프레스의 핵심이라고도 할 수 있음. 라우터와 에러 핸들러 또한 미들웨어의 일종.
- app.use(미들웨어)
    app.use에 매개변수가 req, res, next인 함수를 넣으면 됨. next를 실행해야 다음 미들웨어가 실행됨.

    app.use(미들웨어) | 모든 요청에서 미들웨어 실행
    app.use('/abc', 미들웨어) | abc로 시작하는 요청에서 미들웨어 실행
    app.post('/abc', 미들웨어) | abc로 시작하는 POST 요청에서 미들웨어 실행
- 에러 처리 미들웨어
    매개변수가 err, req, res, next로 네 개임.
```
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));
```
- 설치한 패키지들을 불러온 뒤 app.use에 연결함. req, res, next는 미들웨어 내부에 들어 있음.
- dotenv 패키지는 .env 파일을 읽어서 process.env로 만듦.
- process.env.COOKIE_SECRET에 cookiesecret 값이 할당되며, 키=값 형식으로 추가 가능함. .env 같은 별도의 파일에 비밀 키를 적어두고 dotenv 패키지로 비밀 키를 로딩하는 방식