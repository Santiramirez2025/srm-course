const deepl = require('deepl-node');
const fs = require('fs');
const path = require('path');

const authKey = process.env.DEEPL_API_KEY || "TU_API_KEY_AQUI";
const translator = new deepl.Translator(authKey);

const sourcePath = path.join(__dirname, '../src/i18n/locales/es.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

// Idiomas a traducir
const languages = [
  { code: 'en-US', file: 'en.json', name: 'Inglés' },
  { code: 'pt-BR', file: 'pt.json', name: 'Portugués' },
  { code: 'fr', file: 'fr.json', name: 'Francés' },
  { code: 'de', file: 'de.json', name: 'Alemán' },
  { code: 'zh', file: 'zh.json', name: 'Chino' }
];

async function translateJson(obj, targetLang) {
  const result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = await translateJson(obj[key], targetLang);
    } else {
      try {
        const translation = await translator.translateText(obj[key], 'es', targetLang);
        result[key] = translation.text;
        await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
      } catch (error) {
        console.error(`Error traduciendo "${obj[key]}":`, error.message);
        result[key] = obj[key];
      }
    }
  }
  return result;
}

(async () => {
  console.log('🌍 Iniciando traducción con DeepL...\n');
  
  for (const lang of languages) {
    console.log(`📝 Traduciendo a ${lang.name} (${lang.code})...`);
    try {
      const translated = await translateJson(source, lang.code);
      const outputPath = path.join(__dirname, '../src/i18n/locales', lang.file);
      fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2));
      console.log(`✅ ${lang.name} completado\n`);
    } catch (error) {
      console.error(`❌ Error con ${lang.name}:`, error.message, '\n');
    }
  }
  
  console.log('🎉 ¡Todas las traducciones completadas!');
})();
