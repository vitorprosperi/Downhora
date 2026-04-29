import { LegalConsentModal } from "@/components/LegalConsentModal";

const TERMOS_DE_USO = `1. Aceitação dos Termos

Ao utilizar este aplicativo, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde, deve interromper imediatamente o uso do aplicativo.

2. Sobre o Aplicativo

Este aplicativo tem como finalidade oferecer serviços e funcionalidades relacionadas a (falar oq o app faz)

O aplicativo pode ser atualizado, modificado ou descontinuado a qualquer momento, sem aviso prévio.

3. Cadastro e Responsabilidade do Usuário

O usuário é responsável por:

Fornecer informações verdadeiras e atualizadas

Manter a confidencialidade de seus dados de acesso

Utilizar o aplicativo de forma lícita e ética

O uso do aplicativo para fins ilegais, fraudulentos ou que violem direitos de terceiros é estritamente proibido.

4. Uso Adequado

É vedado ao usuário:

Tentar acessar áreas restritas ou sistemas internos

Explorar falhas ou vulnerabilidades do aplicativo

Copiar, modificar ou distribuir o conteúdo sem autorização

5. Dados Pessoais e Privacidade

O tratamento de dados pessoais do usuário é realizado conforme descrito na Política de Privacidade, a qual faz parte integrante destes Termos de Uso.

6. Limitação de Responsabilidade

O aplicativo é fornecido "como está". Não garantimos que:

O serviço estará disponível de forma ininterrupta

O aplicativo estará livre de erros ou falhas técnicas

Na máxima extensão permitida por lei, o aplicativo não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso do serviço.

7. Propriedade Intelectual

Todo o conteúdo do aplicativo, incluindo textos, marcas, layouts e códigos, é protegido por direitos autorais e não pode ser utilizado sem autorização prévia.

8. Alterações nos Termos

Estes Termos de Uso podem ser atualizados a qualquer momento. O uso contínuo do aplicativo após alterações indica a concordância com os novos termos.

9. Contato

Em caso de dúvidas sobre estes Termos de Uso, o usuário pode entrar em contato pelo e-mail: DownHora@gmail.com`;

export function TermsOfUseModal({
  visible,
  accepted,
  onToggleAccepted,
  showError,
  onContinue,
}) {
  return (
    <LegalConsentModal
      visible={visible}
      title="Termos de Uso"
      subtitle="Antes de continuar, leia e aceite os Termos de Uso."
      content={TERMOS_DE_USO}
      accepted={accepted}
      onToggleAccepted={onToggleAccepted}
      showError={showError}
      errorMessage="É necessário aceitar os Termos de Uso para continuar."
      checkboxLabel="Li e aceito os Termos de Uso"
      onContinue={onContinue}
    />
  );
}
