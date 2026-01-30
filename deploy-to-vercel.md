---
task: deploy-to-vercel
status: in-progress
priority: high
agent: devops-engineer
---

# 🚀 Plano de Deploy: PetHub na Vercel

Este plano detalha as etapas para colocar o PetHub online através da Vercel, garantindo que o PWA e as conexões com o Supabase funcionem corretamente.

## 📋 Pré-requisitos
- [x] Build local funcionando (`npm run build`).
- [x] Variáveis de ambiente configuradas com prefixo `VITE_`.
- [ ] Conta no GitHub.
- [ ] Conta na Vercel.

## 🛠️ Fases de Implementação

### Fase 1: Preparação do Repositório (Git)
- [x] Inicializar Git no projeto.
- [x] Criar arquivo `.gitignore` (Configurado para segurança 🔒).
- [x] Realizar o primeiro commit.
- [ ] Criar repositório no GitHub.
- [ ] Push do código para o GitHub.

### Fase 2: Configuração na Vercel
- [x] Conectar conta do GitHub à Vercel.
- [x] Importar o projeto `PetHub`.
- [x] **Configurar Variáveis de Ambiente na Vercel**:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
- [x] Iniciar o Deploy.

### Fase 3: Verificação e PWA
- [x] Validar se o site carrega corretamente.
- [x] Testar acesso mobile.
- [x] Verificar manifesto PWA e Service Worker.

## 🟢 Status Atual: EM TESTES (Homologação)
O projeto foi deployado com sucesso na Vercel. As variáveis de ambiente foram corrigidas (VITE_CLERK_PUBLISHABLE_KEY).
O usuário está realizando testes funcionais no dispositivo móvel.

## 🚦 Critérios de Sucesso
1. [x] App acessível via URL pública.
2. [x] Login/Cadastro (Clerk) funcionando.
3. [x] Conexão com Supabase ativa.
4. [ ] Feedback dos testes mobile aprovado.

---
**Nota:** A Vercel detecta automaticamente o Vite e configura os comandos de build.
