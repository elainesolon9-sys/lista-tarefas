# TaskLife 🚀

**TaskLife** é um gerenciador de tarefas moderno e sofisticado, desenvolvido com uma estética "Dark Luxury". O projeto oferece uma experiência completa de gerenciamento pessoal, integrando autenticação segura e persistência de dados em nuvem com Supabase.

![Preview do Projeto](https://raw.githubusercontent.com/elainesolon9-sys/lista-tarefas/main/src/assets/preview.png) *(Nota: Adicione seu screenshot aqui)*

## ✨ Funcionalidades

- 🔐 **Autenticação Segura**: Sistema de login e cadastro integrado ao Supabase Auth.
- 📝 **Gestão de Tarefas (CRUD)**: Criação, edição, conclusão e exclusão de tarefas.
- 🏷️ **Categorização e Prioridade**: Organize tarefas por categorias (Trabalho, Pessoal, Estudos) e níveis de prioridade.
- 📊 **Dashboard de Análises**: Visualize seu progresso com métricas em tempo real e estatísticas de conclusão.
- 📅 **Visualização em Calendário**: Acompanhe seus prazos de forma visual e intuitiva.
- ⚡ **Optimistic UI**: Interface instantânea que atualiza localmente enquanto sincroniza com o banco de dados.
- 🎨 **Design Premium**: Interface responsiva, modo escuro nativo e animações fluidas com Framer Motion.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Banco de Dados**: [Supabase](https://supabase.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gestão de Datas**: [Date-fns](https://date-fns.org/)

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js instalado (v18+)
- Uma conta no Supabase

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/elainesolon9-sys/lista-tarefas.git
    cd lista-tarefas
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    - Renomeie o arquivo `.env.example` para `.env.local`.
    - Adicione sua `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` obtidas no painel do seu projeto Supabase.

4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🔒 Segurança (RLS)

O projeto utiliza **Row Level Security (RLS)** do Supabase, garantindo que cada usuário autenticado tenha acesso estritamente aos seus próprios dados. Nenhum usuário pode visualizar ou modificar tarefas de terceiros.

---

Desenvolvido com ❤️ por [Elaine Solon](https://github.com/elainesolon9-sys).
