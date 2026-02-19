/**
 * Скрипт для минификации CSS и JS файлов
 * Использование: node scripts/minify.js
 * 
 * Требует установки пакетов:
 * npm install --save-dev clean-css-cli terser
 * 
 * Или используйте онлайн-инструменты:
 * - CSS: https://cssminifier.com/
 * - JS: https://javascript-minifier.com/
 */

const fs = require('fs');
const path = require('path');

// Конфигурация файлов для минификации
const filesToMinify = {
  css: [
    'styles/style.css',
    'styles/stylemain.css',
    'styles/stylecharacters.css',
    'styles/stylegallery.css'
  ],
  js: [
    'scripts/menu.js',
    'scripts/scroll.js',
    'scripts/UpArrow.js',
    'scripts/UpArrowG.js',
    'scripts/gallery.js',
    'scripts/characters.js',
    'scripts/page-transitions.js'
  ]
};

console.log('Минификация файлов...\n');

// Проверка наличия необходимых инструментов
function checkTools() {
  try {
    require.resolve('clean-css-cli');
    require.resolve('terser');
    return true;
  } catch (e) {
    console.log('⚠️  Инструменты минификации не установлены.');
    console.log('Установите их командой: npm install --save-dev clean-css-cli terser');
    console.log('\nАльтернатива: используйте онлайн-инструменты:');
    console.log('- CSS: https://cssminifier.com/');
    console.log('- JS: https://javascript-minifier.com/');
    return false;
  }
}

if (checkTools()) {
  const { execSync } = require('child_process');
  
  // Минификация CSS
  console.log('Минификация CSS файлов...');
  filesToMinify.css.forEach(file => {
    const inputPath = path.join(__dirname, '..', file);
    const outputPath = path.join(__dirname, '..', file.replace('.css', '.min.css'));
    
    if (fs.existsSync(inputPath)) {
      try {
        execSync(`cleancss -o ${outputPath} ${inputPath}`, { stdio: 'inherit' });
        console.log(`✓ ${file} -> ${file.replace('.css', '.min.css')}`);
      } catch (error) {
        console.error(`✗ Ошибка при минификации ${file}:`, error.message);
      }
    }
  });
  
  // Минификация JS
  console.log('\nМинификация JS файлов...');
  filesToMinify.js.forEach(file => {
    const inputPath = path.join(__dirname, '..', file);
    const outputPath = path.join(__dirname, '..', file.replace('.js', '.min.js'));
    
    if (fs.existsSync(inputPath)) {
      try {
        execSync(`terser ${inputPath} -o ${outputPath} --compress --mangle`, { stdio: 'inherit' });
        console.log(`✓ ${file} -> ${file.replace('.js', '.min.js')}`);
      } catch (error) {
        console.error(`✗ Ошибка при минификации ${file}:`, error.message);
      }
    }
  });
  
  console.log('\n✓ Минификация завершена!');
  console.log('\nНе забудьте обновить ссылки в HTML файлах на .min.css и .min.js версии.');
} else {
  console.log('\nДля автоматической минификации установите необходимые инструменты.');
}
