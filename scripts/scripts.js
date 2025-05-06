window.onload = function () {
    let inputName = document.getElementById('name');
    let inputUsername = document.getElementById('username');
    let inputPassword = document.getElementById('password');
    let inputPasswordRepeat = document.getElementById('password-repeat');
    let inputTerms = document.getElementById('terms');
    let submitBtn = document.getElementById('submit-btn');
    let haveAccount = document.querySelector('.have-an-account a');
    let formLabels = document.querySelectorAll('.form > label');

    // Пункт 2
    inputName.onkeydown = (ev) => {
        let number = parseInt(ev.key);
        if (number) {
            return false;
        }
    }

    // Пункт 3
    inputUsername.onkeydown = (ev) => {
        if (ev.key === '.' || ev.key === ',') {
            return false;
        }
    }

    //Пункт 4
    inputTerms.onchange = (ev) => {
        if (inputTerms.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен");
        }
    }

    // Пункт 5
    submitBtn.onclick = function () {
        let formInputs = document.querySelectorAll('.form > label > input');

        for (let i = 0; i < formInputs.length; i++) {
            if (formInputs[i].value === '') {
                alert('Заполните поле ' + formInputs[i].parentElement.innerText);
                return;
            }
        }

        if (inputPassword.value.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return;
        }

        if (inputPasswordRepeat.value !== inputPassword.value) {
            alert('Пароли не совпадают');
            return;
        }

        if (!inputTerms.checked) {
            alert('Подтвердите согласие с условиями предоставления услуг и политикой конфиденциальности');
            return;
        }

        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = '';
        }
        inputTerms.checked = false;

        let popup = document.getElementById('popup');
        popup.style.display = 'block';
        document.getElementById('popup-btn').onclick = function () {
            logIn();
            popup.style.display = 'none';
        }


    }

    // Пункт 6
    let logIn = function () {
        document.getElementsByClassName('heading')[0].innerText = 'Log in to the system';
        formLabels[0].remove();
        formLabels[2].remove();
        formLabels[4].remove();
        document.querySelector('.terms').remove();
        document.querySelector('.have-an-account').remove();
        submitBtn.innerText = 'Sign Up';

        submitBtn.onclick = function () {
            let formInputs = document.querySelectorAll('.form > label > input');

            for (let i = 0; i < formInputs.length; i++) {
                if (formInputs[i].value === '') {
                    alert('Заполните поле ' + formInputs[i].parentElement.innerText);
                    return;
                }
            }
            alert('Добро пожаловать, ' + formInputs[0].value)
            for (let i = 0; i < formInputs.length; i++) {
                formInputs[i].value = '';
            }
        }
    }


    haveAccount.onclick = logIn;

}