# 2주차 스터디

### 화면 출력
1) console.log();
- 이를 통해 화면에 출력할 수 있다.
- // 와 /* */ 을 통해 주석 처리 가능
### data type
1) numbers
2) Bigints
3) strings
- + 기호를 통해 문자열끼리 이어붙일 수 있음.
- 문자열은 꼭 '' 로 감싸줘야 문자열로 취급됨.
5) booleans
 - 참과 거짓 판별
5) null
6) undefined
7) symbols
8) objects
- properties(속성)을 가짐. -> 객체가 가진 데이터 값이며, 도트 연산자를 통해 접근할 수 있음. (ex) 'Happy'.length -> 문자열의 길이를 알려줌.
- methods(특정 객체에 속해 있는 함수)를 가짐. (ex) ' space '.trim() -> 도트 연산자를 통해 호출, 예시의 경우 공백을 없애줌.
### 연산자(operater)
1) 산술 연산자
- +,-,*,/,%
- +=,++,--,-+
2) 비교 연산자
- === (같은지 판별) vs = 대입 연산자
- (>=, <=)
3) 논리 연산자
- &&(and), ||(or)
### 조건문
1) if문

2) else-if문

3) switch문
- if문으로 한계가 있을 때 switch 문을 생각해 볼 수 있음.
- break문과 마지막의 default문을 유의하여야 함.
```
example(season){
    case summer:
        break;
}
```
4) if문 truthy vs falsy
```
let myVariable = 'I Exist!';

if (myVariable) {
   console.log(myVariable)
} else {
   console.log('The variable does not exist.')
}
// 이 경우 true 로 판별되어 전자가 출력된다.
// 비어있는 string문 (ex) '' , 0 등등이 false 로 판별됨
```

### 변수
1) let
- 임시로 담는 그릇과 같음. 
2) var
3) const (상수)
- 초기 값을 변경할 수 없음.
추가 예정.
4) typeof 연산을 통해 data type을 알 수 있음.
