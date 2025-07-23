export default function Privacidade() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-vitale-primary">Política de Privacidade</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Coleta de Informações</h2>
        <p className="text-neutral-700">Coletamos informações fornecidas voluntariamente pelo usuário, como nome, e-mail, telefone e dados profissionais, exclusivamente para fins de cadastro e atendimento.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Uso das Informações</h2>
        <p className="text-neutral-700">As informações são utilizadas para processar pedidos, fornecer suporte e melhorar nossos serviços. Não compartilhamos dados pessoais com terceiros sem consentimento.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Segurança</h2>
        <p className="text-neutral-700">Adotamos medidas de segurança para proteger os dados dos usuários contra acesso não autorizado, alteração ou divulgação.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
        <p className="text-neutral-700">Utilizamos cookies para melhorar a experiência de navegação. O usuário pode desativar os cookies nas configurações do navegador.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Direitos do Usuário</h2>
        <ul className="list-disc pl-6 text-neutral-700 space-y-1">
          <li>Acessar, corrigir ou excluir seus dados pessoais.</li>
          <li>Solicitar informações sobre o tratamento de dados.</li>
          <li>Revogar o consentimento a qualquer momento.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">6. Contato</h2>
        <p className="text-neutral-700">Para exercer seus direitos ou tirar dúvidas, envie um e-mail para <a href="mailto:contato.ferreirag@outlook.com" className="text-vitale-primary underline">contato.ferreirag@outlook.com</a>.</p>
      </section>
    </main>
  );
} 