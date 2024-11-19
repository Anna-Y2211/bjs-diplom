'use strict'

const { response } = require("express");

const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    });


    ApiConnector.current(response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
        }
    });
}

const ratesBoard = new RatesBoard();

function getCurrency() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response);
        }
    });
}
getCurrency();
setTimeout(getCurrency, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage('Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response);
        moneyManager.setMessage('Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage('Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable();
        favoritesWidget.updateUsersList();
    } else {
        favoritesWidget.setMessage(response.error);
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable();
            favoritesWidget.updateUsersList();
        } else {
            favoritesWidget.setMessage(response.error);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable();
            favoritesWidget.updateUsersList();
        } else {
            favoritesWidget.setMessage(response.error);
        }
    });
}

