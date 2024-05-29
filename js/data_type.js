let number = 5
let str = '문자열 입력' // ""도 묶음 가능
let prime = 1.5123;
let is_ok = true;
let is_not = false;
let undefi; // 변수 이름만, 초기화 x
let empty = null;

console.log(undefi, empty); // 여러 개 출력

const sym1 = Symbol('test');
let symbolVar1 = sym1;

const airline = ["비행기", 320, "airbus", ["V1", true]];

const obj1 = {};
const obj2 = {
    name : "John Doe",
    age : 30,
    isMale: true,
};

console.log(symbolVar1.toString());
console.log(obj1, obj2, airline);

const users = new Map();//사용자 정보 Map 객체 생성
users.set("user1", 
{
    id: 1, password: "password123"
});
users.set("user2", {
    id: 2, password: "password456"
})

//map 객체의 모든 사용자 정보 반복 출력
for (const [username, user] of users)
{
    console.log(`사용자 이름: ${username}`, `ID: ${user.id}`);
    console.log(`비밀번호: ${user.password}`);
}

// Set 객체 활용 (예 : 이름만 저장할 Set 객체 생성)
const usernames = new Set();

usernames.add("user1");
usernames.add("user2");

// Set 객체의 모든 사용자 이름 반복 출력
for (const username of usernames)
{
    console.log(`사용자 이름 : ${username}`);
}