const { execSync } = require('child_process');

try {
  // Aplica todas as migrações e seeds usando o Supabase CLI
  execSync('npx supabase db reset --linked --yes', { stdio: 'inherit' });
  console.log('✅ Migrações e seeds aplicados com sucesso!');
} catch (err) {
  console.error('Erro ao rodar migrações/seeds:', err);
  process.exit(1);
} 