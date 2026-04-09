# TechStore - Інтернет-магазин електроніки (тестове)

## Посилання на проєкт
- **Демо:** [https://your-demo-link.com](https://your-demo-link.com)
- **Репозиторій:** [https://github.com/your-username/techstore](https://github.com/your-username/techstore)

## Технології

| Інструмент | Версія |
|------------|--------|
| Збирач | Gulp |
| HTML | BEM-методологія |
| Стилі | SCSS |
| JavaScript | Vanilla JS (без бібліотек) |
| Оптимізовано для WordPress| Зображення в html та у форматах webp, avif.

## Структура проєкту
```bash
app/
|-- components/ компоненти (header, footer...)
|-- fonts/ # шрифт у форматах woff, woff2
|-- images/ # зображення та іконки (images/icons) у форматах webp, avif 
|-- js/ # HTML-сторінки + компоненти (header, footer)
|-- scss/ # SCSS файли (vars, mixins, style)
|-- js/ # Vanilla JS

```

## Особливості реалізації
- BEM-методологія — всі класи названі за стандартом BEM
- Компонентний підхід — header та footer підключаються як окремі компоненти
- SCSS модульність — змінні (vars), міксини (mixins), глобальні стилі та адаптив винесені окремо
- Адаптивний дизайн — брейкпоінти: 1024px, 850px, 768px, 480px, 390px
- Ванільний JS — всі слайдери, дропдауни, валідація форми реалізовані без бібліотек
- Доступність — семантична верстка, aria-атрибути, прихований h1 для SEO



## Запуск проєкту

```bash
# Клонування репозиторію
git clone https://github.com/ovcharovcoder/tech-store-src.git
cd tech-store-src

# Встановлення gulp (у разі потреби):  
npm install --global gulp-cli
npm install --save-dev gulp

# Встановлення залежностей
npm install

# Запуск режиму розробки
gulp

# Збірка для продакшену
gulp build
```


## Автор
Andrii Ovcharov | ovcharovcoder@gmail.com
