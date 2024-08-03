# <h1>Fake Store App</h1>

<a href="https://github.com/levenders/fake-store-app/actions"><img src="https://github.com/levenders/fake-store-app/actions/workflows/cicd.yml/badge.svg" /></a>

- Проект представляет собой магазин различных товаров.
- Использовано [fakestoreapi](https://fakestoreapi.com/docs).
- [Посмотреть проект](https://levenders.github.io/fake-store-app/#/).

## Реализованы следующие требования к функциональности:

-   [x] Реализованы Требования к функциональности
-   [x] Для хранения учетных записей пользователей, их корзины и истории поиска  используется [Firebase](https://github.com/levenders/fake-store-app/blob/main/src/config/firebase.ts)

#### React

-   [x] Пишем функциональные компоненты с хуками в приоритете над классовыми.
-   [x] Есть разделение на [умные](https://github.com/levenders/fake-store-app/blob/main/src/layout/MainLayout/MainLayout.tsx) и [глупые](https://github.com/levenders/fake-store-app/blob/main/src/components/Input/Input.tsx) компоненты
-   [x] Есть [рендеринг списков](https://github.com/levenders/fake-store-app/blob/main/src/components/ProductsList/ProductsList.tsx#L38)
-   [x] Реализована хотя бы одна [форма](https://github.com/levenders/fake-store-app/blob/main/src/components/Form/Form.tsx)
-   [x] Есть применение [Контекст API](https://github.com/levenders/fake-store-app/blob/main/src/context/ThemeProvider.tsx)
-   [x] Есть применение [предохранителя](https://github.com/levenders/fake-store-app/blob/main/src/main.tsx#L19)
-   [x] Есть хотя бы один [кастомный хук](https://github.com/levenders/fake-store-app/blob/main/src/hooks/useHistoryItems.ts)
-   [x] Хотя бы несколько компонентов используют PropTypes: [Headling](https://github.com/levenders/fake-store-app/blob/main/src/components/Headling/Headling.tsx#L19), [Product](https://github.com/levenders/fake-store-app/blob/main/src/components/ProductsList/Product/Product.tsx#L59)
-   [x] Поиск не должен триггерить много запросов к серверу: [useDebounce](https://github.com/levenders/fake-store-app/blob/main/src/hooks/useDebounce.ts)
-   [x] Есть применение lazy + Suspense: [HomePage](https://github.com/levenders/fake-store-app/blob/main/src/pages/HomePage/HomePage.tsx)

#### Redux

-   [x] Используем [Modern Redux with Redux Toolkit](https://github.com/levenders/fake-store-app/blob/main/src/store/store.ts)
-   [x] Используем [слайсы](https://github.com/levenders/fake-store-app/blob/main/src/store/userSlice/userSlice.ts)
-   [x] Есть хотя бы одна [кастомная мидлвара](https://github.com/levenders/fake-store-app/blob/main/src/store/middlewares/authMiddleware.ts)
-   [x] Используется [RTK Query](https://github.com/levenders/fake-store-app/blob/main/src/services/productsService.ts)
-   [x] Используется [Transforming Responses](https://github.com/levenders/fake-store-app/blob/main/src/services/productsService.ts#L23)

### 2 уровень (необязательный)

-   [x] Используeтся TypeScript
-   [x] Используется Firebase.
-   [x] Настроен [CI / CD](https://github.com/levenders/fake-store-app/blob/main/.github/workflows/cicd.yml)

### **Дополнительно**

-   [x] Проект собран при помощи Vite
-   [x] Для управления классами в стилях используется classnames.
-   [x] Для валидации форм и вывода уведомлений - react-hot-toast.

### **Что хотелось бы улучшить**

-   [x] Добавить адаптив для различных устройств.
-   [x] У карточек товара добавить возможность вводить значение помимо кнопок.
-   [x] Оптимизировать ререндеры.
-   [x] Добиться результатов производительности, специальных возможностей, поисковой оптимизации по Lighthouse от 95 и выше.
 