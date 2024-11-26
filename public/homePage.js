'use strict'


const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    });


    ApiConnector.current(response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
    });
}

const ratesBoard = new RatesBoard();

function getCurrency() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
getCurrency();
setTimeout(getCurrency, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage(responce.isSuccess, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(data);
    } 
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(response.success, 'Успешно добавлено в избранное');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(response.success, 'Успешно удалено из избранного');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

