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
            moneyManager.setMessage('Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(responce.success, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
            moneyManager.setMessage(responce.success, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    } else {
        favoritesWidget.setMessage(response.error);
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(responce.success, 'Успешно добавлено в избранное');
        } else {
            favoritesWidget.setMessage(response.error);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(responce.success, 'Успешно удалено из избранного');
        } else {
            favoritesWidget.setMessage(response.error);
        }
    });
}

