const clearBtn = document.querySelector("#clearfraud");
const iframeElement = document.querySelector("#fraudScoreiFrame");
const appendFrame = document.querySelector('#appendFrame');
const Lhttp = new XMLHttpRequest();

const ipReg = '/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/g';

window.onload = (e) => {

    // let loginURL = 'https://crexendo-ndp-021-las.cls.iaas.run/ndp/adminlogin.php';
    // let encodedForm = 'Username=anicholson@crexendo.com&Password=Crexendo2022!&Submit=Login';
    // Lhttp.open('POST', loginURL);
    // Lhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Lhttp.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');
    // Lhttp.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
    // Lhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    // Lhttp.withCredentials = true;
    // Lhttp.send(encodedForm);


    let encodedParams = new URLSearchParams();
    encodedParams.set('Username', 'anicholson@crexendo.com');
    encodedParams.set('Password', 'Crexendo2022!');
    encodedParams.set('Submit', 'Login');
    fetch('https://crexendo-ndp-021-las.cls.iaas.run/ndp/adminlogin.php', {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Access-Control-Allow-Origin': '*'
        },
        body: encodedParams
    })
    .then((response) => console.log(response.headers))
    // .then(function() {
    //     appendFrame.innerHTML = '<iframe id="fraudScoreiFrame" src="/ndpframe" width="100%" height="624scrolling=no"></iframe>';
    // });
}

const buttonPressed = () => {
    // let parsedHTML = iframeElement.getElementsByClassName('tblcell');
    // let iFrameDoc = iframeElement.contentWindow.document;
    // console.log(iFrameDoc);

    appendFrame.innerHTML = '<iframe id="fraudScoreiFrame" src="https://crexendo-ndp-021-las.cls.iaas.run/ndp/common/safe.php" width="100%" height="624scrolling=no"></iframe>';
    console.log(appendFrame.children[0].childElementCount);
}

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Button has been pressed!");

    buttonPressed();
});