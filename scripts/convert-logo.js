const sharp = require('sharp');
const fs = require('fs');

async function convertLogo() {
  try {
    const inputPath = 'public/Vytalle_Logo_Gold.png';
    const outputPath = 'public/Vytalle_Logo_Gold.webp';

    // Verificar se o arquivo PNG existe
    if (!fs.existsSync(inputPath)) {
      console.error('❌ Arquivo PNG não encontrado:', inputPath);
      return;
    }

    // eslint-disable-next-line no-console
    console.log('🔄 Convertendo logo PNG para WebP...');

    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

    // Comparar tamanhos
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

    // eslint-disable-next-line no-console
    console.log('✅ Conversão concluída!');
    // eslint-disable-next-line no-console
    console.log(`📊 PNG: ${(inputStats.size / 1024).toFixed(1)}KB`);
    // eslint-disable-next-line no-console
    console.log(`📊 WebP: ${(outputStats.size / 1024).toFixed(1)}KB`);
    // eslint-disable-next-line no-console
    console.log(`📉 Redução: ${reduction}%`);
  } catch (error) {
    console.error('❌ Erro na conversão:', error.message);
  }
}

convertLogo();
