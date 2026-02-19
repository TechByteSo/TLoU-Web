# Руководство по Responsive Images с srcset

## Текущая реализация

Сейчас все изображения используют один размер. Для полной оптимизации рекомендуется создать несколько размеров каждого изображения.

## Рекомендуемые размеры изображений

### Галерея (Gallery)
- **Малый (mobile):** 400x300px - для экранов до 768px
- **Средний (tablet):** 800x600px - для экранов 768-1024px
- **Большой (desktop):** 1600x1200px - для экранов больше 1024px

### Главная страница (Index)
- **Малый (mobile):** 600x400px
- **Средний (tablet):** 1200x800px
- **Большой (desktop):** 1920x1280px

### Персонажи (Characters)
- **Малый (mobile):** 400x600px
- **Средний (tablet):** 800x1200px
- **Большой (desktop):** 1200x1800px

## Структура папок

После создания разных размеров, структура должна быть такой:

```
images/
  Gallery/
    Webp/
      1-small.webp    (400x300)
      1-medium.webp   (800x600)
      1-large.webp    (1600x1200)
      1.webp          (оригинал)
    fallback/
      1-small.png
      1-medium.png
      1-large.png
      1.png
```

## Пример использования srcset

### Галерея
```html
<picture>
  <source 
    srcset="images/Gallery/Webp/1-small.webp 400w,
            images/Gallery/Webp/1-medium.webp 800w,
            images/Gallery/Webp/1-large.webp 1600w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
    type="image/webp">
  <source 
    srcset="images/Gallery/fallback/1-small.png 400w,
            images/Gallery/fallback/1-medium.png 800w,
            images/Gallery/fallback/1-large.png 1600w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw">
  <img src="images/Gallery/fallback/1.png" alt="The Last of Us скриншот" loading="lazy">
</picture>
```

### Главная страница
```html
<picture>
  <source 
    srcset="images/Index/Webp/Content-1-small.webp 600w,
            images/Index/Webp/Content-1-medium.webp 1200w,
            images/Index/Webp/Content-1-large.webp 1920w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 90vw,
           50vw"
    type="image/webp">
  <img src="images/Index/fallback/Content 1.jpg" alt="Сюжет" loading="lazy">
</picture>
```

## Инструменты для создания разных размеров

### Онлайн инструменты
- https://www.iloveimg.com/resize-image
- https://imageresizer.com/

### Командная строка (ImageMagick)
```bash
# Установка ImageMagick
# Windows: choco install imagemagick
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Создание разных размеров
magick input.webp -resize 400x300 output-small.webp
magick input.webp -resize 800x600 output-medium.webp
magick input.webp -resize 1600x1200 output-large.webp
```

### Node.js скрипт (sharp)
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath);
}

// Использование
resizeImage('input.webp', 'output-small.webp', 400, 300);
```

## Преимущества

1. **Быстрая загрузка** - мобильные устройства загружают меньшие изображения
2. **Экономия трафика** - особенно важно для пользователей с ограниченным интернетом
3. **Лучший UX** - страницы загружаются быстрее
4. **SEO** - Google учитывает скорость загрузки в ранжировании

## Текущий статус

Сейчас все изображения используют один размер. Это нормально для начала, но для продакшена рекомендуется создать разные размеры и обновить HTML с srcset.
