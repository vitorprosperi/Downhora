import { LegalConsentModal } from "@/components/LegalConsentModal";

const POLITICA_PRIVACIDADE = `POLÍTICA DE PRIVACIDADE

Última atualização: 15 de janeiro de 2026

Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os dados pessoais dos usuários do aplicativo Downhora Botucatu, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).

Ao utilizar o aplicativo, você concorda com as práticas descritas nesta Política.

DADOS COLETADOS

O aplicativo coleta apenas os dados necessários para o seu funcionamento adequado, podendo incluir:

Dados cadastrais:

Nome

Data de nascimento

CPF

Informações de contato (como telefone ou e-mail, quando aplicável)

Dados de saúde:

Informações médicas inseridas pelo próprio usuário

Exames, históricos médicos e dados relacionados à saúde

Dados técnicos:

Identificadores de autenticação

Informações necessárias para login e segurança da conta

Não coletamos cookies, dados de navegação web ou informações de rastreamento comportamental.

FINALIDADE DO USO DOS DADOS

Os dados coletados são utilizados exclusivamente para:

Identificação e autenticação do usuário

Funcionamento das funcionalidades do aplicativo

Armazenamento e organização de informações de saúde

Garantia de segurança, integridade e continuidade do serviço

Cumprimento de obrigações legais, quando aplicável

Não utilizamos os dados para fins publicitários ou de marketing.

BASE LEGAL PARA O TRATAMENTO DOS DADOS

O tratamento dos dados pessoais ocorre com base:

No consentimento do titular dos dados

Na execução dos serviços oferecidos pelo aplicativo

Na proteção da saúde, conforme previsto na LGPD

No cumprimento de obrigações legais

O consentimento é solicitado de forma clara no momento do cadastro.

COMPARTILHAMENTO DE DADOS

Os dados não são vendidos, alugados ou compartilhados com terceiros, exceto:

Quando necessário para o funcionamento técnico do aplicativo

Com provedores de infraestrutura e armazenamento de dados, como o Supabase

Quando exigido por obrigação legal ou ordem judicial

Todos os fornecedores utilizados seguem padrões adequados de segurança e proteção de dados.

ARMAZENAMENTO E SEGURANÇA DOS DADOS

Os dados são armazenados em ambiente seguro, utilizando medidas técnicas e organizacionais para protegê-los contra acessos não autorizados, perdas ou vazamentos.

Empregamos práticas de segurança como:

Autenticação segura

Controle de acesso

Criptografia quando aplicável

DIREITOS DO TITULAR DOS DADOS

Nos termos da LGPD, o usuário pode, a qualquer momento:

Confirmar a existência de tratamento de seus dados

Acessar seus dados pessoais

Solicitar correção de dados incompletos ou incorretos

Solicitar a exclusão dos dados, quando permitido por lei

Revogar o consentimento concedido

As solicitações podem ser feitas pelos canais de contato informados abaixo.

RETENÇÃO E EXCLUSÃO DOS DADOS

Os dados pessoais são mantidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido por lei.

Quando solicitado pelo usuário, os dados poderão ser excluídos ou anonimizados, respeitando obrigações legais de retenção.

ALTERAÇÕES NESTA POLÍTICA

Esta Política de Privacidade pode ser atualizada periodicamente.
Sempre que houver alterações relevantes, a data de atualização será modificada e o usuário será informado quando necessário.

CONTATO

Em caso de dúvidas, solicitações ou exercício de direitos relacionados à proteção de dados, o usuário pode entrar em contato pelo e-mail:

DownHora@gmail.com

FIM DA POLÍTICA DE PRIVACIDADE`;

export function PrivacyPolicyModal({
  visible,
  accepted,
  onToggleAccepted,
  showError,
  onContinue,
}) {
  return (
    <LegalConsentModal
      visible={visible}
      title="Política de Privacidade"
      subtitle="Antes de continuar, leia e aceite a Política de Privacidade."
      content={POLITICA_PRIVACIDADE}
      accepted={accepted}
      onToggleAccepted={onToggleAccepted}
      showError={showError}
      errorMessage="É necessário aceitar a Política de Privacidade para continuar."
      checkboxLabel="Li e aceito a Política de Privacidade"
      onContinue={onContinue}
    />
  );
}
