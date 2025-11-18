# 7주차 스터디
## 8장

## NoSQL vs SQL
- 노드와 몽고디비 모두 자바스크립트 문법을 사용함. 즉, 하나의 언어를 사용하여 웹 어플리케이션을 만들 수 있음.
- NoSQL은 RDBMS보다 뚜렷한 특징을 가지고 있음.

- NoSQL(Not only SQL):  고정된 테이블이 없음. 예를 들어 MySQL로 users 테이블을 만든다면 name, age 등의 컬럼과 자료형, 옵션 등을 정의해야 하지만 몽고디비는 users 컬렉션만 만들면 끝임. 컬렉션에는 어떠한 데이터든 들어갈 수 있음. 또한 MySQL과 달리 JOIN 기능이 없고 데이터의 일관성이 덜함.
- 확장성: 데이터를 빠르게 넣을 수 있음.
- 가용성: 쉽게 여러 서버에 데이터를 분산할 수 있음.
- MySQL의 테이블, 로우, 컬럼을 몽고디비에서는 각각 컬렉션, 다큐먼트, 필드라고 칭함.
- 애플리케이션을 만들 때 하나의 db에 국한되지 않고 SQL과 NoSQL을 동시에 사용할 수 있음.

## 몽고디비 설치하기
https://www.mongodb.com/try/download/community


- 서버를 실행하기 전에 데이터가 저장될 폴더(C:\data\db)를 반드시 먼저 생성해야 함.
- Service Configuration 화면에서 체크박스 해제 후  Install MongoDB Compass에 체크 표시하여 설치하였음.
- 콘솔 창(명령 프롬포트)으로 들어가 몽고디비가 설치된 경로로 이동한 후,  최신 버전 기준 mongod --ipv6 명령어를 입력해 몽고디비를 실행할 수 있음.
- 여기서 C:\...는 몽고디비가 설치된 경로이며, 사용자마다 다를 수 있으므로 직접 Program Files에 들어가 경로를 찾는 것을 권장함.
```
> cd C:\Program Files\MongoDB\Server\8.2\bin 
> mongod --ipv6 // 몽고디비 실행
```


- 윈도우의 경우 컴퍼스를 같이 설치할 수 있음.

## 몽고디비 쉘 설치하기

https://mongodb.com/try/download/shell

- 몽고디비 실행 후, 파일 탐색기에서 몽고 쉘이 설치된 경로를 찾아 bin 파일 들어가기 -> 압축 해제 -> mongosh.exe 실행 후 엔터-> 정상적으로 쉘 화면이 나옴.
프롬프트가 test>로 바뀌면 잘 진행된 것임.
```
test> use admin
// switched to db admin
admin> db.createUser({ user: '이름', pwd: '비밀번호', roles: ['root'] })
// Successfully added user: { "user" : "root", "roles" : [ "root" ] }
// root 권한 부여
use admin으로 관리자 계정을 추가할 수 있음.
db.createUser 메서드로 계정을 생성할 수 있음.
mongod --ipv6 --auth
mongosh admin -u [이름] -p [비밀번호]
// 이름과 비밀번호가 잘 생성되었는지 확인하기 위한 절차
```
- 몽고디비 콘솔을 종료한 후 mongod --ipv6 --auth을 통해 로그인 할 수 있음.
## 데이터베이스 및 커넥션 생성하기
- Advanced Connection Options 클릭 후 Authentication을 Username/Password로 변경 후 계정 이름과 비밀번호를 입력할 수 있음. Connect 버튼을 누르 localhost:27017에 접속함.
- 기본적으로 admin, config, local 데이터베이스가 생성되어 있음.
- 데이터를 최소 한 개 이상 넣어야 목록에 표시됨.
- 다큐먼트를 넣는 순간 컬렉션도 자동으로 생성되므로 컬렉션은 따로 생성할 필요가 없음.
```
// 쉘에 접속 후 실행
> use [데이터베이스명]
// 데이터베이스를 만드는 명령어
> show dbs
// 데이터베이스 목록을 확인하는 명령어
> db
// 현재 사용 중인 데이터베이스를 확인하는 명령어
> db.createCollection('users')
// 직접 users 라는 컬렉션을 생성하는 명령어
> show collections
// 컬렉션 목록 확인
```
- 콘솔에서 데이터베이스 목록 확인
- 컴퍼스를 사용해서 같은 작업을 수행할 수 있음.

## CRUD 작업하기

1) Create(생성)

- 몽고디비는 자바스크립트 문법을 사용하므로 자바스크립트의 자료형을 따름.
- Date나 정규표현식 같은 자바스크립트 객체를 자료형으로 사용할 수 있음.
- 콘솔과 컴퍼스 둘 다 CRUD 작업이 가능함.
- Binary Data, ObjectId, Int, Long, Decimal, Timestamp, JavaScript 등의 추가적인 자료형이 있음. Undefined와 Symbol은 몽고디비에서 자료형으로 사용하지 않으며, 추가적인 자료형 중에서 ObjectId와 Binary Data, Timestamp 외에는 잘 사용되지 않음.
- 콘솔에서 명령이 성공적으로 수행되었다면 acknowledged: true와 insertedId: ObjectId 라는 응답을 줌.
```
$ mongosh
test> use nodejs;
switched to db nodejs
nodejs> db.users.insertOne({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.', createdAt: new Date() });
```
- 다큐먼트 = 하나의 데이터. 아래는 users, comments 컬렉션에 각각 다큐먼트를 만든 모습으로, commenter의 ObjectId에는 zero의 ObjectId을 복사하여 넣어주었음.


2) Read(조회)

- find({})는 컬렉션 내의 모든 다큐먼트를 조회하라는 뜻임.
- 두 번째 인수로 조회할 필드를 넣으면 1 또는 true로 표시한 필드만 가져옴.
- 조회 시 조건을 주려면 첫 번째 인수 객체에 기입해야 함.
- 특수한 연산자: $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(같지 않음), $or(또는), $in(배열 요소 중 하나)
- 몽고디비는 자바스크립트 객체를 사용해서 명령어 쿼리를 생성해야 하므로 $gt 같은 특수한 연산자가 사용됨. 이는 시퀄라이즈의 쿼리와 비슷함.
- 이외에도 sort 메서드, limit 메서드, skip 메서드가 있음.
```
> db.users.find({});
> db.comments.find({})
> db.users.find({}, { _id: 0, name: 1, married: 1 }); // 특정 필드만 조회
> db.users.find({ age: { $gt: 0 }, married: true }, { _id: 0, name: 1, age: 1 });
// 조회 시 조건 주기. age가 30 초과, married가 true인 다큐먼트의 이름과 나이를 조회
> db.users.find({}, { _id: 0, name:f, age: 1}).sort({ age: -1 })
> db.users.find({}, { _id: 0, name:f, age: 1}).sort({ age: -1 })
> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1).skip(1)
```


- 컴퍼스 사용 시 해당 컬렉션을 클릭하면 데이터가 바로 표시되므로 간편함. 조건을 주려면 FILTER 부분을 이용하면 됨.




3) Update(수정)

- 일부 필드만 수정하고 싶을 때는 반드시 $set 연산자를 지정해야 함.
- 첫 번째 객체는 수정할 다큐먼트를 지정하는 객체이고, 두 번째 객체는 수정할 내용을 입력하는 객체임.
- 수정에 성공했다면, 첫 번째 객체에 해당하는 다큐먼트 수(matchedCount)와 수정된 다큐먼트 수(modifiedCount)가 나옴.
- 컴퍼스 사용 시 연필 버튼 -> UPDATE 버튼으로 데이터를 간단하게 수정할 수 있음.
```
> db.users.updateOne({ name: 'nero' }, { $set: { comment: '안녕하세요 이 필드를 바꿔보겠습니다!' } });
```


4) Delete(삭제)

- 삭제할 다큐먼트에 대한 정보가 담긴 객체를 첫 번째 인수로 넣음. 성공 시 삭제된 개수(deletedCount)가 반환됨.
```
> db.users.deleteOne({ name: 'nero' })
```
## 몽구스 사용하기
- 몽구스는 MySQL의 시퀄라이즈와 달리 ODM(object document mapping)으로 불림. 즉, 자바스크립트 객체와 매핑하는 것임. 몽구스는 몽고디비를 보완해줌.
- 스키마(schema): 몽고디비는 테이블이 없어서 자유롭게 데이터를 넣을 수 있지만, 문제가 생길 수 있음. 이때 몽구스는 몽고디비에 데이터를 넣기 전에 노드 - 서버 단에서 데이터를 한 번 필터링해줌.
- MySQL에 있는 JOIN 기능을 populate라는 메서드로 보완하며, 관계가 있는 데이터를 쉽게 가져올 수 있음.
## 프로젝트 생성하기  

https://github.com/zerocho/nodejs-book

- 위 링크를 참고하여 실습을 진행하였음.

- learn-mongoose 폴더를 만들고, npm init 명령어를 통해 그 안에 package.json을 생성함.
- 몽구스와 필요한 패키지를 설치함. 노드몬은 저장할 때마다 갱신해주는 역할을 함.
- 몽구스를 통해 노드와 몽고디비를 연결할 수 있음.
- 몽고디비는 주소를 사용해 연결함. 주소 형식은 mongodb://[username:password@]host[:port][/[database][?options]]와 같음. 이때 username과 password 는 앞서 만들었던 이름과 비밀번호를 넣어주어야 함.
- schemas 폴더를 루트 디렉터리(현재 프로젝트 내 최상위)에 생성한 후 그 안에 index.js, user.js, comment.js 파일을 생성함. 
- 서버를 실행하기 전 몽고디비 서버를 반드시 먼저 실행(mongod --ipv6 --auth)해야 함.
- views 폴더 안에 mongoose.html과 error.html 파일을 생성함.
- public 폴더 안에 mongoose.js 파일을 생성함. app.js에 추가할 라우터들을 연결함.
- routes 폴더 안에 index.js, users.js, comments.js 를 작성함.
- 서버 실행 후 http://localhost:3002에 접속하면 아래와 같은 화면을 확인할 수 있음.