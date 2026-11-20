# Afterglow Memory Scrapbook

Ты — senior mobile engineer, UI/UX designer и AI-архитектор. Помоги собрать MVP мобильного приложения AFTERGLOW («A Digital Scrapbook of Your Life») для хакатона на React Native + Expo + TypeScript, строго опираясь на утверждённый дизайн из референсов.

Дизайн-система AFTERGLOW (строго по мудборду и PDF):
- Название проекта: AFTERGLOW.
- Шрифты: Libre Baskerville (основной — заголовки, названия альбомов, акцентные подписи) и Alegreya Sans (второстепенный — интерфейс, кнопки, тексты историй, заметки). Подключи через expo-font с fallback на системные serif/sans-serif.
- Палитра:
  - Dark Chocolate: #443025 (основной текст, акценты, рамки)
  - Aloewood: #7F5836 (вторичные заголовки, тёплые акценты)
  - Milk Tea: #AA7F66 (карточки, бейджи, второстепенные поверхности)
  - Sakura: #EC9C9D (акцентные детали, теги, выделения)
  - Misty Rose: #F2CF2A (по референсу; можно использовать как тёплый акцентный цвет и/или добавить мягкий кремово-бумажный фон страницы #F6F1E7 / #EFE7DA для высокой читаемости текста #443025).
- UI и страницы альбома: тёплая редакционно-бумажная эстетика в духе арт-журнала и бумажного скрапбука, текстура бумаги/холста, рамки вокруг фото, готовые сетки-шаблоны разворотов (одно крупное фото, 2 колонки, асимметричная сетка, горизонтальный ряд из 3 кадров, коллаж/сетка на несколько фото).
- Никаких сложных 3D-анимаций перелистывания книг или переворота фото: используй простые, плавные и надёжные переходы, тапы, свайпы, перетаскивание/масштабирование элементов и переключение лицевой/оборотной стороны карточки фото с заметкой.

Функционал и правила:
- Музыка добавляется просто: пользователь вставляет ссылку на трек/плейлист (Spotify, Apple Music, YouTube Music и др.) или выбирает трек из демо-списка (название, исполнитель/источник, ссылка). На странице есть карточка музыки, а настроение музыки влияет на подбор цветов и стиля.
- AI анализирует только материалы пользователя (текст, описание фото, музыка, детали) и НЕ придумывает выдуманные события.
- Элементы страницы (фото, текст, стикеры/рамки, музыкальная карточка) хранятся как независимые редактируемые объекты (id, type, x, y, width, height, rotation, zIndex, data), а не склеиваются в одну картинку.
- Три способа создания дизайна: Ready-made Templates (сетки-шаблоны из референса), Describe Your Design, Create From Scratch.
- Три настроения в едином стиле: Nostalgic, Joyful, Dreamy / Calm.

Сделай следующее:
1. Создай тему оформления (цвета Dark Chocolate #443025, Aloewood #7F5836, Milk Tea #AA7F66, Sakura #EC9C9D, Misty Rose #F2CF2A, шрифты Libre Baskerville и Alegreya Sans, стили бумажных фонов/рамок и пресеты сеток-шаблонов) и TypeScript-интерфейсы (Memory, PageItem, PageTemplate, MusicAttachment, AIStyleSuggestion).
2. Напиши системный промпт и JSON-схему для Gemini (без выдуманных фактов, с выбором сетки-шаблона, настроения и цветовых акцентов).
3. Дай структуру проекта и готовый код ключевых экранов/компонентов (Create Memory с добавлением музыки, Choose Design с сетками-шаблонами, Album Editor, Album Viewer, Photo Viewer с заметкой на обороте и Archive) + 3 демо-воспоминания (Nostalgic, Joyful, Dreamy / Calm) и локальный fallback.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/922c1303-9815-4fd3-9b71-769c4ee6947a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
