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
- [ ] Conectar conta do GitHub à Vercel.
- [ ] Importar o projeto `PetHub`.
- [ ] **Configurar Variáveis de Ambiente na Vercel**:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
- [ ] Iniciar o Deploy.

### Fase 3: Verificação e PWA
- [ ] Validar se o site carrega corretamente na URL `https://pethub-....vercel.app`.
- [ ] Testar acesso mobile.
- [ ] Verificar manifesto PWA e Service Worker.

## 🚦 Critérios de Sucesso
1. App acessível via URL pública.
2. Login/Cadastro (Supabase) funcionando no ambiente de produção.
3. Opção "Instalar App" disponível no navegador mobile.

---
**Nota:** A Vercel detecta automaticamente o Vite e configura os comandos de build.
