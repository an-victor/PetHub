# Guia de Deploy (Publicação)

## 1. GitHub (Código Fonte)
Para salvar seu código na nuvem:

1. Crie um repositório no [GitHub](https://github.com/new).
2. Rode os comandos no terminal do projeto:
```bash
git init
git add .
git commit -m "Versão 1.0 - PetHub Finalizado"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

## 2. Vercel (Colocar no Ar)
A Vercel é a melhor opção para subir esse projeto (React + Vite) gratuitamente.

1. Acesse [vercel.com](https://vercel.com) e crie uma conta (use seu GitHub).
2. Clique em **"Add New..."** -> **"Project"**.
3. Selecione o repositório do `PetHub` que você acabou de criar.
4. O Vercel vai detectar automaticamente que é **Vite**.
5. Clique em **Deploy**.

🚀 **Pronto!** Em 2 minutos seu site estará online em `https://pethub-....vercel.app`.

### Sobre a Localização Automática
Já implementamos a função de detectar localização via GPS.
- Quando o usuário acessar pela primeira vez, o navegador pedirá permissão ("PetHub quer saber sua localização").
- Se permitido, ele pega a cidade exata (usando OpenStreetMap) e começa a mostrar Vets e Lojas daquela região.

### Custos
- **Vercel**: Gratuito (Hobby Tier).
- **OpenStreetMap** (Geocoding): Gratuito.
- **Supabase** (Banco de Dados): Gratuito (até 500MB).

O projeto está otimizado para custo zero mensal.
