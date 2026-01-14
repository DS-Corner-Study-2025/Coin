# 노드의 모듈 정리하기

- 모듈: 프로그램을 작은 기능 단위로 쪼개고 파일 형태로 저장해 놓은 것.
- module.exports: 이 구문을 통해 지정한 대상을 모듈의 형태로 외부로 내보내줌.
- require(모둘의 경로): 이 구문을 통해 모듈을 불러올 수 있음. 모듈을 쓰기 전 반드시 제일 먼저 불러와야 함!
```
// ;은 생략함

// user.js 모듈

const user="홍길동"
module.exports = user

// hello.js 모듈

const hello = (name) => {
    console.log(`${name}님, 안녕하세요?`)
}
module.exports = hello

// app-1.js

const user = require("./user")
const hello =require("./hello")
// ~라는 변수에 갖고와줘
```
```
// 구조 분해 할당
// users.js

module.exports = {user1, user2}
// app-2.js 그리고 불러올 때에는
const {user1, user2} = require(./users)
const hello =require("./hello")
hello(user1)
hello(user2)
```

`${__dirname}`: 현재 모듈이 있는 폴더 이름 가져와
`${__filename}`: 현재 모듈 파일의 이름 가져와
```
const path = require("path")
const fullPath = path.join('some','work')
console.log(fullPath)
```
- path 모듈을 먼저 불러온 후 얘가 가진 기능 중 join을 씀. 이러면 내가 쓴 문자열 두 개가 묶여서 하나의 경로가 됨. 

- path.dirname(fullPath): 파일 이름 제거한 경로 부분만

- readdir 함수: 반드시 path, callback을 매개변수로 가짐. 옵션은 필요하면. 콜백은 함수인데 err과 가져온 내용을 저장할 files라는 매개변수를 가짐.
```
const fs = require("fs")
fs.readdir("./". (err, files) => {
    if (err) {
        console.log(err)
    }
    console.log(files)
})
// 에러가 나면 에러 메서지, 아니면 네가 갖고 온 files를 보여줘. 매개변수 두 개가 function body를 가리키는 화살표 함수고, 이 콜백 함수 자체를 매개변수로 쓰는 것임.
```
- readfile: path, callback을 매개변수로 가지고 콜백은 err, data를 매개변수로 가짐.
- "utf8": 인코딩 지정. 이거 해야 버퍼 아니게 읽어옴.
- writefile: 이건 readfile 함수 내에 써도 됨, 경로(어디에), (뭐 기록할건지) data, callback을 매개변수로 가짐.
```
const http = require("http")
const server = http.createServer((req, res) => {
    console.log("요청 발생")
})

server.listen(3000, () => {
    console.log("서버가 실행 중!")
})
// createServer 함수는 req, res를 매개변수로 가지는 콜백 화살표 함수를 매개변수로
// 아까까진 서버 만들기만 한거고 listen 함수로 실행해야 함. 포트 번호 지정 필수. 여기선 3000번 포트에서 실행해줘
```
- localhost- 사용자 컴퓨터에 만들어진 서버를 가리킴
- localhost:3000 후 엔터 - 내가 요청을 보낸 것.

- 라우팅: 클라이언트의 요청에 따라 그에 맞는 함수를 실행하는 것. 사용자가 입력하는 url에 따라 다른 내용을 보여줄 수 있음. (예시: /home)- 요청 메서드=요청 방식 (GET 등등)
- req.url: req 객체 안 요청 경로 저장되어있음
- req.method: 요청 방식 저장되어있음
```
const {url, method} = req
url이라는 변수에 req의 url 정보 갖고 오고 더보기

if (method === "GET' && url === "/home" ) {
    res.write("HOME')
    res.end();
} ...
```
- get 방식이면서 경로가 홈인지 체크하고 else이면 not found 뜨게 하고
- 그러나 사이트 하나가 처리할 라우트가 한두개가 아님. 다 else if문으로 연결하면 한계가 있기 때문에 서버 안에서 라우트를 처리하게 도와주는 것이 익스프레스라는 프레임워크임.

// post- 사용자가 새로 입력한 연락처를 서버로 보내줌
// get 하면 전체 연락처 가져와서 보여줄거고
// 특정 연락처만 가져오고 싶다- 라우트 파라미터. 요청 경로 뒤 : 뒤 변수

// (ex) /contacts/1
// 요청 메서드(함수)
// res 이런 것도 객체. 그 안에 send 이런 함수 있고
// 자세히 파고들기보다 흐름을 빨리 익히자
// 라우트 미들웨어를 통해 간단하게 처리할 수 있음. 이 경로를 사용하는 요청 방식이 n개구나. get방식으로 들어오면 이렇게 처리하고 ...
// router.route(경로).get().post() 일케
// app.use() => 내가 이 미들웨어 사용했단 거 알려줘야함

// get방식으로 루트 경로에 요청이 들어오면 어떠한 콜백함수를 실행해라
// http 모듈에선 if문으로 경로 방식을 지정했었지

```
app.get("/contacts", (req, res)=> {
    res.send("Contacts Page")
})
    ```
// 모든 거 가져오기

//app.get("/contacts/:id", (req, res)=> {
//    res.send(`View id : ${req.params.id}`)
//})

    
// 특정 1개만 가져오자. 요청할 때 아이디도 같이 보냄. req(요청)에서 parameters 모여 있는 객체 중에서도 아이디 값이 담긴 변수
```
app.post("/contacts", (req, res)=> {
    res.send("Create Contacts")
})
    ```
// 연락처 추가

//app.put("/contacts/:id", (req, res)=> {
//    res.send(`Update id : ${req.params.id}`)
//})
// 연락처 수정하기

//app.delete("/contacts/:id", (req, res)=> {
//    res.send(`Delete id : ${req.params.id}`)
//})
// 특정 id 삭제하기
```
router.route("/contacts")
.get((req, res)=> {
    res.send("Contacts Page")
})
.post((req, res)=> {
    res.send("Create Contacts")
})

router.route("/contacts/:id")
.get( (req, res)=> {
    res.send(`View id : ${req.params.id}`)
})
.put((req, res)=> {
    res.send(`Update id : ${req.params.id}`)
})
.delete((req, res)=> {
    res.send(`Delete id : ${req.params.id}`)
})

app.get("/", (req, res) => {
    res.send("HELLO NODE")
})
```

라우터는 서버와 클라이언트 중간에서 열일함

1. module.exports를 통해 모듈이 된 건가요?
네, 맞습니다! 정확히는 contactRoutes.js라는 파일이 하나의 **독립된 부품(모듈)**이 된 것입니다.

router 객체에는 우리가 정의한 여러 개의 경로(.get, .post 등)들이 담겨 있습니다.

module.exports = router라고 쓰는 순간, "이 파일(부품)을 가져다 쓰는 사람에게는 이 router 객체를 통째로 넘겨주겠다"라고 선언하는 것입니다.

그러면 다른 파일(app.js)에서 require를 통해 이 부품을 변수에 담아 마음껏 사용할 수 있게 됩니다.
2. app.use(contactRoutes)는 무엇인가요?
이 코드는 **"내가 만든 라우터 부품을 메인 서버(app)에 조립하겠다"**는 명령어입니다.

app.use()는 Express에서 **미들웨어(Middleware)**를 등록하는 함수입니다. 여기서 contactRoutes라는 모듈을 인자로 넣은 것은 다음과 같은 의미를 갖습니다.

연결 고리: app.js는 웹 서버의 중심입니다. 하지만 모든 경로를 app.js에 다 적으면 코드가 너무 길어지겠죠? 그래서 외부에서 만든 contactRoutes라는 경로 묶음을 app에 장착시키는 것입니다.

흐름 제어: 서버에 요청이 들어오면, Express는 app.use에 등록된 순서대로 검사합니다. "어? 이 요청은 contactRoutes 안에 정의된 경로인가?" 하고 확인한 뒤, 맞으면 해당 코드를 실행합니다.

구조를 비유하자면 이렇습니다:

contactRoutes.js: 특정 기능을 수행하는 '외장 그래픽 카드' (부품 제조)

module.exports: 그래픽 카드의 '연결 단자' (밖으로 내보냄)

require: 그래픽 카드를 '사는 행위' (불러옴)

app.use: 그래픽 카드를 컴퓨터 메인보드에 '꽂는 행위' (서버에 장착)

app.use("/contacts", require("./routes/contactRoutes")) 는 URL이 /contacts로 시작하는 모든 요청을 contactRoutes.js 파일에서 만든 router에게 넘기겠다는 뜻이다.
require("./routes/contactRoutes")는 그 파일을 실행해서 module.exports로 내보낸 router를 가져오고, app.use("/contacts", …)는 그 router를 /contacts 경로에 연결한다. 그래서 router 안에서 /로 정의한 라우트는 실제로 /contacts, /:id는 /contacts/3 같은 주소로 동작하게 된다.

contactRoutes 파일 자체가 모듈이고, 그 모듈이 내보내는 값이 router야.

조금 풀어서 설명하면,

contactRoutes.js라는 파일 하나가 곧 하나의 모듈야.
Node.js에서 require("./routes/contactRoutes")를 하면

“이 파일이 module.exports로 내보낸 값 하나를 가져와라”
라는 뜻이야.

서버로 요청을 보낼 떄 요청 본문에 담긴 것을 파싱하는 미들웨어
.json()은 json형식의 본문 파싱, .urlenconded()는 ... 얘네 둘은 익스프레스 내장함수 사용
요청 본문의 내용을 파싱하려면 바디파서 라는 미들웨어를 등록해야 함. app.use로

몽고db 데이터베이스- 여러가지 정보들은 db라는 별도의 공간에 저장됨.

2. 함수를 모듈로 만들면 호출이 가능한가요?
네, 당연히 가능합니다! 사실 그게 모듈을 만드는 핵심 이유입니다.

내보내기 (module.exports = dbConnect): "이 함수를 밖에서 쓸 수 있게 포장해둘게!"

불러오기 (const dbConnect = require(...)): "포장된 함수를 가져와서 내 변수에 담을게!"

호출 (dbConnect()): "내 변수에 담긴 게 함수니까, 실행(호출)할게!"

이렇게 불러온 변수는 원래 파일에 있던 함수와 똑같이 작동합니다.

3. 모듈(Module)의 정의가 무엇인가요?
쉽게 말해, 모듈은 **"필요한 부품들을 모아놓은 독립된 파일"**입니다.

비유: 레고 블록이나 자동차 부품과 같습니다. 엔진(DB 연결 모듈), 바퀴(라우터 모듈), 라이트(로그 미들웨어)를 각각 따로 만들어두고, 필요할 때마다 조립(require)해서 사용하는 방식입니다.

왜 모듈을 쓰나요?
분리 (Separation): 한 파일에 수천 줄의 코드를 다 적으면 읽기 힘들겠죠? 기능별로 쪼개서 관리합니다.

재사용 (Reuse): 한 번 만든 DB 연결 코드는 다른 프로젝트에서도 파일만 복사해서 바로 쓸 수 있습니다.

독립성: 모듈 내부의 변수는 외부와 격리되어 있어, 이름이 겹쳐서 생기는 오류를 방지합니다.

스키마: app에서 사용할 자료의 형태를 정하는 것 예: 이름 연락처 주소. 스키마 파일은 별도의 파일에 작성
모델링: 스키마를 기반으로 데이터베이스 안에 형태를 만듦
여누 010-... 이런 실제 값이 도큐먼트가 됨. 
컬렉션: 도큐먼트의 모음