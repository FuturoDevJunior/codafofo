export default function Termos() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-vitale-primary">Termos de Uso</h1>
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">1. Aceitação dos Termos</h2>
        <p className="mb-2 text-neutral-700">
          Ao acessar e utilizar o site Vytalle Estética & Viscosuplementação, você concorda
          integralmente com estes Termos de Uso. Caso não concorde, por favor, não utilize nossos
          serviços.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">2. Uso do Site</h2>
        <ul className="list-disc space-y-1 pl-6 text-neutral-700">
          <li>O site destina-se exclusivamente a profissionais da área da saúde.</li>
          <li>É proibido o uso para fins ilícitos ou não autorizados.</li>
          <li>O usuário é responsável pela veracidade das informações fornecidas.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">3. Propriedade Intelectual</h2>
        <p className="text-neutral-700">
          Todo o conteúdo do site, incluindo textos, imagens, marcas e logotipos, é protegido por
          direitos autorais e não pode ser reproduzido sem autorização prévia.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">4. Limitação de Responsabilidade</h2>
        <p className="text-neutral-700">
          A Vytalle Estética & Viscosuplementação não se responsabiliza por danos decorrentes do uso
          inadequado do site ou de informações incorretas fornecidas por terceiros.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">5. Alterações dos Termos</h2>
        <p className="text-neutral-700">
          Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. Recomenda-se a
          revisão periódica deste documento.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold">6. Contato</h2>
        <p className="text-neutral-700">
          Dúvidas ou solicitações podem ser enviadas para{' '}
          <a href="mailto:contato.ferreirag@outlook.com" className="text-vitale-primary underline">
            contato.ferreirag@outlook.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
