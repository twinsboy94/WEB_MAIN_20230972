const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    const check_xss = (input) => 
    {
        // DOMPurify 라이브러리 로드 (CDN 사용)
        const DOMPyrify = window.DOMPurify;

        //입력값을 DOMPurify로 sanitize
        const sanitizedInput = DOMPyrify.sanitize(input);

        const sanitizedPassword = check_xss(passwordValue);
        const sanitizedEmail = check_xss(emailValue);

        //Sanitized된 값과 원본 입력값 비교
        if (sanitizedInput !== input)
        {
            //XSS 공격 가능성 발견 시 에러 처리
            alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
            return false;
        }

        if (!sanitizedEmail)
        {
            return false;
        }

        if (!sanitizedPassword)
        {
            return false;
        }

        //sanitized된 값 반환
        return sanitizedInput;
    }

    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === ' '){
        alert('이메일을 입력하세요');
        return false;
    }
    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }

    if (emailValue.length < 5)
    {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }

    if (passwordValue.length < 12)
    {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;   
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase)
    {
        alert('비밀번호는 대소문자를 한 글자 이상 포함해야 합니다.');
        return false;
    }
    
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar)
    {
        alert('비밀번호는 특수문자를 한 글자 이상 포함해야 합니다.');
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    if(idSaveCheck.checked == true)
    {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1);
        alert("쿠키 값 :", emailValue);
    }
    else{
        setCookie("id", emailValue.value, 0)
    }

    session_set();

    loginForm.submit();
};

function encodeByAES256(key, data) {
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data) {
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password) {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key";
    const rk = k.padEnd(32, " ");
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

function init_logined(){
    if(sessionStorage){
        decrypt_text();
    }
    else {
        alert("세션 스토리지 지원 X")
    }
}

function session_set()
{
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX");
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    }
    else {
        alert("로컬 스토리지 지원 X");
    }
}

function session_get()
{
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    }
    else {
        alert("세션 스토리지 지원 X")
    }
}

function session_check()
{
    if (sessionStorage.getItem("Session_Storage_id")){
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html';
    }
}

// 로그아웃 타이머 설정
let logoutTimer;
const logoutTime = 2000 // 5분을 밀리초로 변환

// 사용자 활동 감지
const resetTimer = () => {
    clearTimeout(logoutTimer); // 기존 타이머를 취소
    logoutTimer = setTimeout(() => {
        // 사용자가 설정된 시간 동안 활동이 없을 경우 실행될 로그아웃 코드
        alert('자동으로 로그아웃 되었습니다. 다시 로그인해주세요.');
        location.href = '../index.html'; // 로그아웃 처리를 위한 URL로 리다이렉트 (실제 경로로 변경 필요)
    }, logoutTime);
};

// 여러 이벤트에 대해 활동 감지 리스너 추가
window.onload = resetTimer; // 페이지 로드 시
document.onmousemove = resetTimer; // 마우스 움직임
document.onkeypress = resetTimer;  // 키보드 입력
document.ontouchstart = resetTimer; // 터치 입력
document.onclick = resetTimer;     // 클릭



function setCookie(name, value, expiredays)
{
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + ";expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function getCookie(name)
{
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "")
    {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array)
        {
            var cookie_name = cookie_array[index].split("=");

            if (cookie_name[0] == "id")
            {
                return cookie_name[1];
            }
        }
    }
    return ;
}

function setCookie(name, value, expiredays)
{
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + ";expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function getCookie(name)
{
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "")
    {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array)
        {
            var cookie_name = cookie_array[index].split("=");

            if (cookie_name[0] == "login_cnt")
            {
                return cookie_name[1];
            }
        }
    }
    return ;
}

function init()
{
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id)
    {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check();
}

document.getElementById("login_btn").addEventListener('click', check_input);






