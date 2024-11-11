'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
 ApiConnector.login(data, callback) => {
   if(callback.succes) {
     location.reload();
} else {
   throw new Error («Ошибка! Неверный логин или пароль»);
   }
 }
}

userForm.registerFormCallback  = (data) => {
  ApiConnector.login (data, callback) => {
      if(callback.succes) {
     location.reload();
} else {
   throw new Error («Ошибка! Такой логин уже занят»);
    }
  }
}