# Sinout

## Descrição
Uma página de destino moderna para o Sinout.

## Arquitetura
O projeto é construído com Next.js, utilizando uma arquitetura de componentes React. A estrutura inclui:
- **Frontend**: Next.js com App Router
- **Estilização**: Tailwind CSS para design responsivo e moderno
- **Animações**: GSAP para animações complexas e Framer Motion para interações suaves
- **3D e Partículas**: Three.js e bibliotecas personalizadas para efeitos visuais
- **Componentes**: Biblioteca de componentes reutilizáveis em `/components`

## Tecnologias
- **Framework**: Next.js 16
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: GSAP, Framer Motion
- **3D/Partículas**: Three.js, OGL
- **UI Components**: Radix UI, Lucide Icons
- **Outros**: ESLint, PostCSS

## Autores
- **[Fabio Roberto](https://github.com/FabioRoberto-ppt)** - Scrum Master
- **[Guilherme França Domingues](https://github.com/GuilhermefDomingues)** - Desenvolvedor
- **[Eduardo Barbosa Silva](https://github.com/Xcode-sketcher)** - Desenvolvedor
## Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
npm install
```

### Execução em Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção
```bash
npm run build
npm start
```

## Estrutura do Projeto
```
sinout-HOME-edu/
├── app/                    # Páginas Next.js
├── components/             # Componentes React
│   ├── ui/                 # Componentes de UI reutilizáveis
│   └── ...                 # Outros componentes
├── lib/                    # Utilitários
├── public/                 # Assets estáticos
└── ...
```

## Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Deploy
O projeto pode ser facilmente implantado na Vercel ou qualquer plataforma que suporte Next.js.

## Contribuição
Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## Licença
Este projeto é privado e propriedade da equipe Sinout.