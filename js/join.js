class SignUp {
    constructor(myname, typeEmailX, typePasswordX, repeat) { // 생성자 함수
      this.myname = myname;
      this.typeEmailX = typeEmailX;
      this.typePasswordX = typePasswordX;
      this.repeat = repeat; 
    }

    get Name() {
        return `${this.myname}`; // 템플릿 리터럴 문자열 연결, 기존에는 + 연산자로 연결
    }
    
    set Name(Name) {
        const [myname] = Name.split(" ");
        this.myname = myname
    }
    
    get contactInfo() {
        return `${this.typeEmailX} ${this.typepasswordX} ${this.repeat}`; // 요소 하나 하나를 객체 프로퍼티라고 한다.
    }
    
    set contactInfo(contactInfo) {
        const [typeEmailX, typePasswordX, repeat] = contactInfo.split(" ");
        this.typeEmailX = typeEmailX;
        this.typePasswordX = typePasswordX;
        this.repeat = repeat;
    }
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

function join(){
    let form = document.querySelector("#form_main");
    let name = document.querySelector("#myname");
    let email = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let repassword = document.querySelector("#repeat")

    
    form.action = "../login/index_join.html";
    form.method = "get";

    if(name.value.length === 0 || email.value.length === 0 || password.value.length === 0 || repassword.value.length === 0) {
        alert("필수 정보를 입력해주세요.");
    }
    if(password != repassword){
        alert("비밀번호가 동일하지 않습니다.");
    }
    if (email.value.length < 5)
    {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }

    if (password.value.length < 12)
    {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;   
    }

    const hasUpperCase = password.value.match(/[A-Z]+/) !== null;
    const hasLowerCase = password.value.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase)
    {
        alert('비밀번호는 대소문자를 한 글자 이상 포함해야 합니다.');
        return false;
    }
    
    const hasSpecialChar = password.value.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar)
    {
        alert('비밀번호는 특수문자를 한 글자 이상 포함해야 합니다.');
        return false;
    }
    else{
        session_join_set();
        form.submit;
    }
}

function session_join_set(){ //세션 저장(객체)
    let name = document.querySelector("#myname").value;
    let email = document.querySelector("#typeEmailX").value;
    let password = document.querySelector("#typePasswordX").value;
    let repassword = document.querySelector("#repeat").value;

    const newSignUp = newSignUp(name, email, password, repassword)
    console.log(newSignUp.Name);
    console.log(newSignUp.contactInfo);

    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp);
        let en_text = encrypt_text(objString);
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}