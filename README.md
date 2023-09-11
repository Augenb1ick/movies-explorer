## Описание

Дипломная работа Full stack проект "Movies Explorer" -<br />
Сервис, для поиска фильмов и сохранения их в личном кабинете пользователя.

[Cсылка на задеплоенный проект](https://movies-explorer-pro.nomoreparties.co/)

## Страницы

- Главная страницы. Краткая информацию о проекте, технолгиях и авторе.
- Страница с фильмами. Форма поиска фильмов и блок с результатами поиска, добавление и удаление фильмов из сохранённых.
- Страница с сохранёнными фильмами. Форма поиска сохранённых фильмов и блок с результатами поиска, добавление и удаление фильмов из сохранённых.
- Страницы регистрации и авторизации пользователей.
- Страница редактирования профиля.

## Функционал/Особенности

- Регистрация и авторизация пользователей
- Возможность изменить имя и email зарегистрированного пользователя
- Поиск фильмов
- Фильтр короткометражных фильмов
- Сохранение фильмов на отдельной странице
- При клике на превью фильма ссылка ведет на его трейлер
- Подгрузка фильмов нажатием на кнопку "Еще", адаптированная под определенное разрешения экрана
- Прелоадер при ожидании запроса
- Респонсивная вёрстка.
- Валидация всех форм.
- Обработка ошибок API

## Технологии

![JavaScript](https://img.shields.io/badge/-JavaScript-000?style=for-the-badge&logo=javascript)
![ReactJS](https://img.shields.io/badge/-React-000?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/-node.js-000?style=for-the-badge&logo=node.js)
![ExpressJS](https://img.shields.io/badge/-express.js-000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?style=for-the-badge&logo=mongodb)
![NGINX](https://img.shields.io/badge/-nginx-000?style=for-the-badge&logo=nginx)
![PM2](https://img.shields.io/badge/-pm2-000?style=for-the-badge&logo=pm2)
![ESLint](https://img.shields.io/badge/-eslint-000?style=for-the-badge&logo=eslint)
![Webpack](https://img.shields.io/badge/-webpack-000?style=for-the-badge&logo=webpack)
![HTML](https://img.shields.io/badge/-HTML-000?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/-CSS-000?style=for-the-badge&logo=css3)

## Как запустить

Клонировать репозиторий и установить зависимости.

```
git clone https://github.com/Augenb1ick/movies-explorer.git
npm install
```

# CLI

Frontend

```
npm run start // Запуск dev сервера
npm run build // Сборка проекта
```

Backend

```
npm run start // Запуск dev сервера
npm run dev // Запуск dev сервера с hot reload
npm run lint // Запуск ESLint
```

## Документация к API

#### `POST /users/signup`

cоздаёт пользователя с переданными в теле `email, password и name`

#### `POST /users/signin`

проверяет переданные в теле `email и password` и возвращает `JWT token`

#### `GET /users/me`

возвращает информацию о пользователе, его `email и name` (роут защищен авторизацией)

#### `GET /movies`

возвращает все сохранённые пользователем фильмы (роут защищен авторизацией)

#### `POST /movies`

создаёт фильм с переданными в теле `country,
director,
duration,
year,
description,
image,
trailerLink,
thumbnail,
owner,
movieId,
nameRU,
nameEN` (роут защищен авторизацией)

#### `DELETE /movies/movieId`

удаляет сохранённый фильм по `id` (роут защищен авторизацией)

## Планы по доработке

- Добавить типизацию на TypeScript
- Переписать запросы на Async/Await (ES7)
- Рефакторинг стилей на Styled Components
- Добавить Redux или MobX для стейт менеджмента

## Дополнительно

- [Критерии проверки дипломного проекта](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)
- [Макет в Figma](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=1-6015&mode=design)
