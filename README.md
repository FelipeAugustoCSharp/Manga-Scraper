# 📚 Manga Scraper - SussyToons Image Downloader

Este projeto é um script de **web scraping** automatizado que utiliza [Playwright](https://playwright.dev/) e [Axios](https://axios-http.com/) para acessar o site [SussyToons](https://www.sussytoons.wtf), coletar imagens de capítulos de mangás e salvá-las em pastas organizadas por capítulo e nome da obra.

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/) — automação de navegador
- [Axios](https://axios-http.com/) — download de imagens via HTTP
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [fs](https://nodejs.org/api/fs.html) e [path](https://nodejs.org/api/path.html) — manipulação de arquivos e diretórios

---

## 🚀 Como Usar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/manga-scraper.git
cd manga-scraper
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar o script

```bash
npm start
ou
npx ts-node index.ts
```

> Certifique-se de alterar o link do capítulo dentro do `initConnection()` com a URL que deseja baixar:
```ts
initConnection("https://www.sussytoons.wtf/capitulo/248305");
```

---

## 📁 Organização das Imagens

As imagens serão salvas na estrutura:

```
/caps/
  └── NomeDoManga/
        └── capitulo-123/
              ├── 01.jpg
              ├── 02.jpg
              └── ...
```

- A pasta `caps` será criada automaticamente.
- O nome da obra será extraído da página.
- As imagens são separadas por capítulo.

---

## 🛡️ Funcionalidades de Proteção

- Bloqueio de requisições externas (ads e redirecionamentos fora de `sussytoons.wtf`)
- Ignora pop-ups de política e adblock automaticamente (quando presentes)
- Estrutura tolerante a erros (baixa o máximo possível mesmo com falhas pontuais)

---

## 📌 Observações

- **Uso apenas educacional.** Raspar conteúdo sem permissão pode violar os termos de uso do site. Use com responsabilidade.
- O site pode mudar com o tempo. Se os seletores de elementos mudarem, será necessário atualizar o script.

---

## 💡 Melhorias Futuras

- Suporte a múltiplos capítulos automaticamente
- Conversão em PDF após o download das imagens

---

## 🧑‍💻 Autor

Feito com 🖤 por [FelipeAugustoCSharp](https://github.com/FelipeAugustoCSharp)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
