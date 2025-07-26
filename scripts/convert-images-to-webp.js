const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

    // eslint-disable-next-line no-console
    console.log(
      `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${reduction}% menor)`
    );
    return true;
  } catch (error) {
    console.error(`❌ Erro ao converter ${inputPath}:`, error.message);
    return false;
  }
}

async function convertDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let converted = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const result = await convertDirectory(filePath);
      converted += result.converted;
      errors += result.errors;
    } else if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const webpPath = filePath.replace(ext, '.webp');

        // Só converte se o WebP não existir ou se for mais antigo
        if (!fs.existsSync(webpPath) || stats.mtime > fs.statSync(webpPath).mtime) {
          const success = await convertToWebP(filePath, webpPath);
          if (success) {
            converted++;
          } else {
            errors++;
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(`⏭️  ${file} já tem versão WebP atualizada`);
        }
      }
    }
  }

  return { converted, errors };
}

async function main() {
  // eslint-disable-next-line no-console
  console.log('🚀 Iniciando conversão de imagens para WebP...\n');

  const directories = ['public/images/products', 'public/icons'];

  let totalConverted = 0;
  let totalErrors = 0;

  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      // eslint-disable-next-line no-console
      console.log(`📁 Processando: ${dir}`);
      const result = await convertDirectory(dir);
      totalConverted += result.converted;
      totalErrors += result.errors;
      // eslint-disable-next-line no-console
      console.log('');
    }
  }

  // eslint-disable-next-line no-console
  console.log('🎉 Conversão concluída!');
  // eslint-disable-next-line no-console
  console.log(`✅ ${totalConverted} imagens convertidas`);
  if (totalErrors > 0) {
    // eslint-disable-next-line no-console
    console.log(`❌ ${totalErrors} erros`);
  }
}

main().catch(console.error);
