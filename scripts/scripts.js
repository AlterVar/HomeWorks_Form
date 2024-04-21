window.onload = function () {
	let inputName = $('#name');
	let inputUsername = $('#username');
	let inputMail = $('#mail');
	let inputPassword = $('#password');
	let inputPasswordRepeat = $('#password-repeat');
	let submitBtn = $('#submit-btn');
	let haveAccount = $('.have-an-account a');
	let formLabels = $('.form > label');
	let inputTerms = $('#terms');
	let clients = [];

	haveAccount.click(function () {
		logIn();
	});

	//Валидация формы
	submitBtn.click(function () {
		let formInputs = $('.form > label > input');
		let isError = false;
		formInputs.each(function (index) {
			formInputs.eq(index).next().text('');
			if (!formInputs.eq(index).val()) {
				formInputs.eq(index).next().css('display', 'inline-block');
				formInputs.eq(index).next().text(`Заполните поле ${formInputs.eq(index).parent().text()}`);
				formInputs.eq(index).css('border-color', '#dd3142');
				isError = true;
			} else {
				formInputs.eq(index).next().css('display', 'none');
				formInputs.eq(index).css('border-color', '#C6C6C4');
			}
		});

		//валидация Имени
		if (inputName.val() !== '') {
			if (!inputName.val().match(/^[a-zа-я\s]+$/i)) {
				inputName.next().text('Full Name может содержать только буквы и пробел');
				inputName.next().css('display', 'inline-block');
				inputName.css('border-color', '#dd3142');
				isError = true;
			} else {
				inputName.next().css('display', 'none');
				inputName.css('border-color', '#C6C6C4');
			}
		}

		//валидация Username
		if (inputUsername.val() !== '') {
			if (!inputUsername.val().match(/^[а-яА-ЯёЁ\w\-]+$/)) {
				inputUsername.next().text('Username может содержать только буквы, цифры, нижнее подчеркивание и тире');
				inputUsername.next().css('display', 'inline-block');
				inputUsername.css('border-color', '#dd3142');
				isError = true;
			} else {
				inputUsername.next().css('display', 'none');
				inputUsername.css('border-color', '#C6C6C4');
			}
		}

		//Валидация e-mail
		if (inputMail.val() !== '') {
			if (!inputMail.val().match(/^[^\.]\S+[^\.]@[a-zA-Z]+\.([a-z]+\.)?[a-z]+$/)) {
				inputMail.next().text('Введите существующий адрес электронной почты');
				inputMail.next().css('display', 'inline-block');
				inputMail.css('border-color', '#dd3142');
				isError = true;
			} else {
				inputMail.next().css('display', 'none');
				inputMail.css('border-color', '#C6C6C4');
			}
		}

		//Валидация пароля
		if (inputPassword.val() !== '') {
			if (!inputPassword.val().match(/^(?=.*[A-ZА-Я])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/)) {
				inputPassword.next().text('Password должен содержать минимум 8 символов, одну заглавную букву, цифру и спецсимвол');
				inputPassword.next().css('display', 'inline-block');
				inputPassword.css('border-color', '#dd3142');
				isError = true;
			} else {
				inputPassword.next().css('display', 'none');
				inputPassword.css('border-color', '#C6C6C4');
			}
		}
		//Валидация повтора пароля
		if (inputPasswordRepeat.val() !== '') {
			if (inputPasswordRepeat.val() !== inputPassword.val()) {
				inputPasswordRepeat.next().text('Пароли не совпадают');
				inputPasswordRepeat.next().css('display', 'inline-block');
				inputPasswordRepeat.css('border-color', '#dd3142');
				isError = true;
			} else {
				inputPasswordRepeat.next().css('display', 'none');
				inputPasswordRepeat.css('border-color', '#C6C6C4');
			}
		}

		//Валидация чекбокса
		if (inputTerms.prop('checked') === false) {
			inputTerms.next().text('Подтвердите согласие с условиями предоставления услуг и политикой конфиденциальности');
			inputTerms.next().css('display', 'inline-block');
			isError = true;
		} else {
			inputTerms.next().css('display', 'none');
		}

		if (isError === false) {
			//проверка существования аккаунта
			if (submitBtn.text() === 'Sign In') {
				let haveClients = JSON.parse(localStorage.getItem('client'));
				for (i = 0; i < haveClients.length; i++) {
					if (haveClients[i]['username'] === inputUsername.val()) {
						if (haveClients[i]['password'] === inputPassword.val()) {
							account(haveClients);
							return;
						} else {
							inputPassword.next().text('Неверный пароль');
							inputPassword.next().css('display', 'inline-block');
							inputPassword.css('border-color', '#dd3142');
							return;
						}
					}
				}
				inputUsername.next().text('Такой пользователь не зарегистрирован');
				inputUsername.next().css('display', 'inline-block');
				inputUsername.css('border-color', '#dd3142');

			}
			if (submitBtn.text() === 'Sign Up') {
				//Запись данных пользователя в localStorage
				let clientData = {
					name: inputName.val(),
					username: inputUsername.val(),
					email: inputMail.val(),
					password: inputPassword.val()
				};

				let client = localStorage.getItem('client');
				if (client) {
					clients = JSON.parse(client);
				}

				clients.push(clientData);
				localStorage.setItem('client', JSON.stringify(clients))

				console.log(localStorage);
				for (let i = 0; i < formInputs.length; i++) {
					formInputs[i].value = '';
				}
				inputTerms.prop('checked', false);

				//popup
				let popup = $('#popup');
				popup.css('display', 'block');
				$('#popup-btn').click(function () {
					popup.css('display', 'none');
					logIn();
				});
			}

			if (submitBtn.text() === 'Exit') {
				window.location.reload();
			}

		}
	});

	//Переход на страницу логина
	let logIn = function () {
		$('.heading').text('Log in to the system');
		formLabels[0].remove();
		formLabels[2].remove();
		formLabels[4].remove();
		$('.terms').remove();
		inputTerms.prop('checked', true);
		haveAccount.text('Registration');
		submitBtn.text('Sign In');

		//registrationBtn - перезагрузка страницы
		haveAccount.click(function () {
			window.location.reload();
		})
	}

	//переход на страницу аккаунта
	let account = function (haveClients) {
		$('.heading').text(`Welcome, ${haveClients[i]['name']}!`);
		submitBtn.text('Exit');
		$('.description').remove();
		haveAccount.remove()
		formLabels.remove();
	}
}