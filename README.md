# Жизнь напишу карандашом

Сайт-книга: собрание стихов Андрея Зобнина.

## Запуск

```bash
cd poetry-book
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Как добавить стих

1. Скопируйте `content/poems/_SHABLON.md` в новый файл, например `moj-stih.md`.
2. Имя файла без `.md` — это адрес страницы: `/stih/moj-stih`.
3. Заполните шапку:
   - `title` — название
   - `chapter` — id главы (см. `content/chapters.ts`: `nachalo`, `svet`, `ten`, …)
   - `order` — порядок в главе (число)
   - `illustration` — `none` | `pending` | `ready`
   - `image` — путь, если `ready`, например `/illustrations/moj-stih.png`
4. Ниже `---` — текст стиха, **одна строка — одна строка стиха**.

## Иллюстрации

- Положите файл в `public/illustrations/`.
- В шапке стиха: `illustration: ready` и `image: /illustrations/имя.png`.
- Пока рисуют: `illustration: pending` — на сайте появится тёплая заглушка.
- Без рисунка: `illustration: none` — только текст.

## Настройки сайта

Файл `content/site.json` — название, автор, ссылка на Стихи.ру, список «С чего начать».

## Главы

Список глав в `content/chapters.ts`. Пустые главы в оглавлении показывают подсказку «добавьте стихи».
