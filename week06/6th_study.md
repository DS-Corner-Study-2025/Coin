# 6주차 스터디

## 7장

1) MySQL
-  SQL 언어를 사용하는 관계형 데이터베이스 관리 시스템
- 모든 데이터를 변수에 저장 = 컴퓨터 메모리에 저장했다는 뜻. 서버가 종료되면 메모리가 정리되면서 저장했던 데이터도 사라짐. 이때 데이터베이스를 사용할 수 있음.

2) 데이터베이스 
- 관련성을 가지며 중복이 없는 데이터들의 집합. 이를 관리하는 시스템을 DBMS(데이터베이스 관리 시스템) 이라고 함.
- RDBMS(Relational DBMS): 관계형 DBMS. (ex)Oracle, MySQL, MSSQL 등
- 서버 종료 여부와 상관없이 데이터를 계속 사용할 수 있음. 서버에 db를 올리면 여러 사람이 쓸 수 있고, 각자에게 다른 권한을 부여할 수 있음. (읽기/쓰기/실행하기 등)

3) MySQL 설치하기
- MySQL이 설치된 폴더로 이동 후 명령 프롬프트를 통해 접속.
```
mysql -h localhost -u root -p
exit
```
- h: 접속할 주소 u: 사용자 이름 p: 비밀번호 사용
4) 데이터베이스 생성하기
- 워크벤치와 프롬포트 모두 가능하나 프롬포트를 추천함.
```
CREATE SCHEMA [데이터베이스명]
use [데이터베이스명];
```
- SQL 구문을 입력할 때는 마지막에 세미콜론(;)을 붙여야 실행됨.
- 예약: MySQL이 기본적으로 알고 있는 구문. 대문자로 쓰는 것이 좋음.

5) 테이블 생성하기
- 데이터가 들어갈 수 있는 틀. 테이블에 맞는 데이터만 들어갈 수 있음. 
```
# 사용자 정보 저장하는 테이블 만들기
CREATE TABLE nodejs.users (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(20) NOT NULL,
    -> age INT UNSIGNED NOT NULL,
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC))
    -> COMMENT = '사용자 정보'
    -> ENGINE = InnoDB;
```
```
CREATE TABLE [데이터베이스명.테이블명]은 테이블을 생성하는 명령어. nodejs 라는 db에 users 라는 테이블 생성하라는 뜻
```
- 컬럼: id, name, age 등으로 시작되는 세로줄
- 로우: 1, zero, 24, false 와 같은 가로줄
- 필드: 컬럼과 로우가 교차하는 칸
- 테이블에 데이터를 넣을 때는 미리 컬럼을 정의해두고, 컬럼에 맞춰 데이터를 넣으면 됨. 사전에 컬럼으로 만들어두지 않은 정보는 저장할 수 없음.
- 컬럼 이름 옆에는 INT, VARCHAR 등의 자료형이 적힘.
```
DESC users; # 만들어진 테이블을 확인하기
DROP TABLE users; # 테이블 제거하기
```
- 사용자 댓글 저장하는 테이블 만들어보기

6) CRUD 작업하기
-  Create, Read, Update, Delete
    Create: 데이터 생성
    ```
    INSERT INTO [테이블명] ([컬럼1], [컬럼2], .. .) VALUES ([값1], [값 2], ...)

    INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
    ```
    Read: 데이터 조회
    ```
    SELECT * FROM [테이블명]

    SELECT * FROM nodejs.users;
    ```