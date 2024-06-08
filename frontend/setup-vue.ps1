# Видалити існуючі пакети vue та vue-template-compiler
npm uninstall vue vue-template-compiler

# Встановити відповідні пакети для Vue 3
npm install vue@3 @vue/compiler-sfc vue-loader@next

# Видалити node_modules та package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Перевстановити всі залежності
npm install

# Запустити сервер
npm run serve
