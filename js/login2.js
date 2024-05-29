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

document.getElementById("logout_bye").addEventListener('click', logout);