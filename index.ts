const prompt = require("prompt-sync")();
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import axios from "axios";



//funçao para download => aguarda uma promessa para esperar finalizar
const downloadImage = async (url: string, filepath: string) => {

  const response = await axios.get(url, { responseType: "stream" });
    //promise para aguardar a finalização da troca de dados
  return new Promise<void>((resolve, reject) => {
    //criando um canal para troca de dados
    const writer = fs.createWriteStream(filepath);
    //guardando dados na memoria
    response.data.pipe(writer);
    //caso de sucesso & erro
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

//conexão com raspagem de dados
const initConnection = async (url: string) => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });  //headless: true  para ver a magia acontecer
  const page = await browser.newPage();

  // Bloquear anúncios e redirecionamentos fora do domínio
  await page.route("**", (route) => {
    const reqUrl = route.request().url();
    if (reqUrl.includes("ads") || !reqUrl.includes("sussytoons.wtf")) {
      return route.abort();
    }
    return route.continue();
  });

  await page.goto(url);

  // Ignorar adblock (clicar no botão se aparecer)
  try {
    const continueButton = await page.waitForSelector(".chakra-button.css-kmd7yw", { timeout: 5000 });
    if (continueButton) await continueButton.click();
  } catch {}

  // Aceitar política, se aparecer
  try {
    const policyButton = await page.waitForSelector(".chakra-button.css-h211ee", { timeout: 5000 });
    if (policyButton) await policyButton.click();
  } catch {
    console.log("Botão de política não apareceu, seguindo...");
  }

  // Pega as imagens
  const imagens = await page.locator(".chakra-container > .css-79elbk > .css-21onc5 > img").all();

  const srcs: string[] = [];
  for (const img of imagens) {
    const src = await img.getAttribute("src");
    if (src) {
      srcs.push(src);
      console.log("Imagem encontrada:", src);
    }
  }

  // Nome do mangá
  const bookNameLocator = page.locator("a.chakra-text.css-gk1ric");
  const bookNameRaw = await bookNameLocator.textContent();
  const bookName = bookNameRaw ? bookNameRaw.trim() : "notfound";

  // Pasta base para salvar
  const basePath = path.resolve(__dirname, "caps", bookName);
  if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

  for (const imageUrl of srcs) {
    const fileName = path.basename(imageUrl); // ex: 13.jpg
    const parts = new URL(imageUrl).pathname.split("/");
    const chapter = parts[parts.length - 2]; // pasta do capítulo na URL

    const chapterPath = path.join(basePath, chapter);
    if (!fs.existsSync(chapterPath)) fs.mkdirSync(chapterPath, { recursive: true });

    const filePath = path.join(chapterPath, fileName);

    console.log(`Baixando imagem: ${fileName} para ${filePath}`);

    try {
      await downloadImage(imageUrl, filePath);
    } catch (err) {
      console.error("Erro ao baixar imagem:", imageUrl, err);
    }
  }

  console.log(`Total de imagens baixadas: ${srcs.length}`);

  await browser.close();
};


const url = prompt("Digite a URL do capítulo: ");
if (url) {    
 initConnection(url); //url exemplo: "https://www.sussytoons.wtf/capitulo/248305"
}else{
 console.error("Nenhuma URL foi informada. Abortando.");
  process.exit(1);
}

