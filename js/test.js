var jb = 'hi'; // 변수 선언 후 주석 가능 (한 줄 주석)
var a = 1;
var b;
b = 5;

if (true){
    let c = 'let 접근';
    var c_1 = 'var 접근';
}

//colsoke.log(c); // error?
console.log(c_1)

let d = 5;
//let d = '값 재할당' // error?
console.log(d);

const e = '상수1 접근';
//e = 5
// const f // error?
console.log(e);

const search_massage = () => {
    const c = '검색을 수행합니다';
    alert(c);
};

document.getElementById("search_btn").addEventListener('click', search_massage);

/*function googleSearch()
{
    const searchTerm = document.getElementById("search_input").value;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank");
    return false;
}*/