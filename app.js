const errorText = document.getElementById('errorMsg')

function access() {
    const iframe = document.getElementById("iFramed");
    const iframedoc = iframe.contentDocument;

    const username = iframedoc.getElementById('name')
    const mail = iframedoc.getElementById('mail')
    const phone = iframedoc.getElementById('phone')
    const dob = iframedoc.getElementById('dob')
    const submitBtn = iframedoc.getElementById('submitBtn')
    const country = iframedoc.getElementById('country')
    const state = iframedoc.getElementById('state')

    result = {};

    const checkEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
            return true;
        }
        return false;
    };

    function validateError() {
        result = {}
        if (username.value.length < 4 || username.value.length > 10 || username.value == "") {
            const obj = { error: "length should be in between 4-10 characters" };
            result["Name"] = obj;
        }
        if (!checkEmail()) {
            const obj = { Error: "only valid email address" };
            result["Email"] = obj;
        }
        if (phone.value.length != 10 || phone.value == "") {
            const obj = { Error: "number should be 10 digits" };
            result["Contact number"] = obj;
        }
        if (dob.value == "") {
            const obj = { Error: "mandatory field" };
            result["Date"] = obj;
        }
        if (country.value == "") {
            const obj = { Error: "mandatory field" };
            result["Country"] = obj;
        }
        if (state.value == "") {
            const obj = { Error: "mandatory field" };
            result["State"] = obj;
        }

        if (Object.keys(result).length == 0) {
            result["Success"] = "All fields are valid";
        }
    }

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        validateError()
        window.postMessage({ messsage: "Result", value: result });
    });
}

window.addEventListener("message", showMessage);

function showMessage(data) {
    errorText.innerText =
        data.data.messsage + ":" + JSON.stringify(data.data.value);
}