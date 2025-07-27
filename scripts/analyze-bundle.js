const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

// Configuração para análise de bundle
const analyzeBundle = () => {
  const config = {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(__dirname, '../bundle-report.html'),
        generateStatsFile: true,
        statsFilename: path.join(__dirname, '../bundle-stats.json'),
      }),
    ],
  };

  return config;
};

module.exports = analyzeBundle;
