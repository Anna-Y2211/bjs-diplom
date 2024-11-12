'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, resronse) => {
     if(data.success) {
      location.reload();
     } else {
      userForm.setLoginErrorMessage(response.error);
      alert('Ошибка! Неверный логин или пароль');
     }
  }
}

userForm.registerFormCallback = (data) => {
  ApiConnector.login(data, response) => {
     if(data.success) {
      location.reload();
     } else {
      userForm.setRegisterErrorVessage(response.error);
      alert('Ошибка! Такой логин уже занят');
     }
  }
}