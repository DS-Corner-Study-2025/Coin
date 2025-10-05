# 2주차 스터디

### 화면 출력
1) console.log();
- 이를 통해 화면에 출력할 수 있다.
- // 와 /* */ 을 통해 주석 처리 가능
### data type
1) numbers
2) Bigints
3) strings
- '+' 기호를 통해 문자열끼리 이어붙일 수 있음.
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
-if() 형식. 오류가 나지 않기 위해서는 괄호로 묶어주는 것이 좋다.
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
5) 조건부 연산자 '?'
- if문을 대신하여 쓸 수 있다. if문 안의 변수를 앞으로 가지고 온 후, {}을 생략하고 조건식 뒤에 '?'을 붙인 후 else문 전에 ':'을 쓴다.
```
let adult;

if (age>=20) {
  adult=true;
}
else {
  adult=true;
}
```
```
let adult=(age>=20) ? true : false;
```

### 변수
1) let
- 임시로 담는 그릇과 같음. 
2) var
3) const (상수)
- 초기 값을 변경할 수 없음.
4) typeof 연산을 통해 data type을 알 수 있음.

### 함수
1) function 키워드 사용
- function 키워드 뒤 함수 이름(인자)가 오는 형식
- 인자는 0개, 1개, 2개... 등등 다양하게 올 수 있음. 값을 받기 위한 변수(그릇)이라고 생각.
- 필요하다면 return 키워드 사용. return값을 저장하기 위한 변수를 필요하면 만들어 쓸 수 있음.
- 함수 호출 전까지 함수는 실행되지 않음! 호출하면서 arguements를 넘김. (사전 정보를 넘겨준다고 생각하기)
```
function identifier(parameter1, parameter2){
}
```
2) 함수 표현식
```
const whatDayIsIt=function(day, weather) {
}
```
3) 화살표 함수
- function 키워드 생략
```
const whatDayIsIt=(day, weather) => {
}
```
- parameter가 {} 안의 function body를 화살표로 가리킨다.
- 코드가 한 줄일 경우 {}을 생략할 수 있다. parameter이 1개일 경우 ()을 생략할 수 있다. 단, 0개이거나 2개일 경우 반드시 ()로 감싸줘야 한다.
```
const sumNums= num => num*2;
```
