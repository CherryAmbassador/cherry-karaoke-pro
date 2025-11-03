# Cherry Karaoke — Pro (Cherry Ambassador)

**Что делает**
- UI: яркий, чистый интерфейс (webmod/ui.css)
- Media: чёткость фото и видео без цветовых искажений (webmod/media.css + inject.js)
- Хоткеи: Ctrl+Alt+1 (низко) · 2 (средне) · 3 (высоко) · 0 (выкл)
- Временный буст UI: 
  ```js
  document.documentElement.classList.add('ck-review-boost')
  document.documentElement.classList.remove('ck-review-boost')