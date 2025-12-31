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
