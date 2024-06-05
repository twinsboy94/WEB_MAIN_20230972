function session_del()
{
    if (sessionStorage){
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    }
    else {
        alert("세션 스토리지 지원 X");
    }
}

function cookie_del(cookieName) 
{
    const date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=/";
}

function logout()
{
    session_del();
    cookie_del('id');
    location.href='../index.html';
}

function addJavascript(jsname) {
    var th = document.getElementsByTagName("head")[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('sec', jsname);
    th.appendChild(s);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

document.getElementById("logout_bye").addEventListener('click', logout);