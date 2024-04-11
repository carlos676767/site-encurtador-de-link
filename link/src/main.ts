const botao = document.querySelector(".enviar") as HTMLButtonElement;


const exibirUrl = (data: string) => {
  const p = document.querySelector("p") as HTMLParagraphElement;
  p.textContent = data;
};

const copiarUrl = (data: any) => {
  navigator.clipboard.writeText(data);
};

const mensagemVazioInput = () => {
  const mensagemVazio = document.getElementById("mensagemVazio") as HTMLParagraphElement
  mensagemVazio.innerHTML = "Por favor Digite um link."
};



const url = document.querySelector(".valor") as HTMLInputElement;
const exibirResultados = (link: string) => {
  const exibirLink = document.getElementById("p") as HTMLElement;
  exibirLink.innerHTML = link;
};

const copiarUrlButton = document.getElementById("copiarUrl") as HTMLButtonElement
let armazenarLink: string = ""
const mudarNomeBotao = () => {
  copiarUrlButton.innerHTML = "Copiado!"
  copiarUrl(armazenarLink)
  setTimeout(() => {
    copiarUrlButton.innerHTML = "Copiar"
  }, 3000);
}

copiarUrlButton.addEventListener("click", () => {
 mudarNomeBotao()
})

const tagAExibirLink = (link: string) => {
  const redirecionarLink = document.getElementById("rerecionarLink") as HTMLAnchorElement;
  const salvarLink = redirecionarLink.href = link;
  redirecionarLink.innerHTML = salvarLink
};



const configuracoesCarregamnento = (valor: string, valor2: string) => {
  const loader = document.querySelector(".loader") as HTMLDivElement
  const encurtarLinksDiv = document.querySelector(".encurtarLinks") as HTMLDivElement
  loader.style.display = valor
  encurtarLinksDiv.style.display = valor2
}

const links: string[] = []

const historicoLinks = (urls: string) => {
  links.push(urls)
  localStorage.setItem("linksSalvos", JSON.stringify(links))
}


const encurtarLink = async () => {
  if (url.value === "") {
    mensagemVazioInput();
  } else {
    try {
      configuracoesCarregamnento("block", "none")
      const data = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${(url.value)}`,
      });
      const response = await data.json();
      const { result_url } = response;
      exibirResultados(result_url);
      tagAExibirLink(result_url);
      configuracoesCarregamnento("none", "")
      armazenarLink = result_url
      historicoLinks(result_url)
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  }
};

botao.addEventListener("click", () => {
  encurtarLink();
});

const darkModeButton = document.getElementById("dark-mode-toggle") as HTMLInputElement
const header = document.querySelector("header") as HTMLHeadElement
const menu = document.querySelector(".menu") as HTMLElement
const h1 = document.querySelector("h1") as HTMLElement
const logo = document.querySelector(".logo") as HTMLImageElement
const textoLinks = document.querySelector(".texto-links") as HTMLParagraphElement
const li = document.querySelectorAll("strong")
console.log(li);


const addCLssesCss = (elementoHtml: HTMLElement, classeCSS: string, classeCss2: string) => {
  elementoHtml.classList.add(classeCSS)
  elementoHtml.classList.remove(classeCss2)
}

const aplicarDarkMode = () => {
  darkModeButton.addEventListener("change", () => {
      if (darkModeButton.checked) {
        addCLssesCss(document.body, "daerkmode", "whiteMode")
        addCLssesCss(header, "daerkmode", "whiteMode")
        addCLssesCss(menu, "daerkmode", "whiteMode")
        addCLssesCss(h1, "corBlack", "corAul")
        addCLssesCss(logo, "logoWhite", "logo")
        addCLssesCss(textoLinks, "daerkmode", "textoLinks")
        li.forEach(lis => {addCLssesCss(lis, "daerkmode", "whiteMode")});
        localStorage.setItem("darkmode", String(true))
      }else{
        addCLssesCss(document.body, "whiteMode","daerkmode")
        addCLssesCss(header, "whiteMode","daerkmode")
        addCLssesCss(menu, "whiteMode","daerkmode")
        addCLssesCss(h1, "corAul","corBlack")
        addCLssesCss(logo,  "logo","logoWhite")
        addCLssesCss(textoLinks, "textoLinks","daerkmode")
        li.forEach(lis => {addCLssesCss(lis, "whiteMode","daerkmode",)});
        localStorage.setItem("darkmode", String(false))
      }
  })
}

const salvarEstadoCheckbox = (valorBoleano: boolean) => {
  darkModeButton.checked = valorBoleano
}



const salvarDdaosLocalStorage = () => {
  const recuperarValor = localStorage.getItem("darkmode")
  const recuperar = JSON.parse(localStorage.getItem("linksSalvos") ?? "{}")
  console.log(recuperar);
  
  if (recuperarValor === String(true)) {
    addCLssesCss(document.body, "daerkmode", "whiteMode")
    addCLssesCss(header, "daerkmode", "whiteMode")
    addCLssesCss(menu, "daerkmode", "whiteMode")
    addCLssesCss(h1, "corBlack", "corAul")
    addCLssesCss(logo, "logoWhite", "logo")
    addCLssesCss(textoLinks, "daerkmode", "textoLinks")
    li.forEach(lis => {addCLssesCss(lis, "daerkmode", "whiteMode")});
    salvarEstadoCheckbox(true)
  }else{
    addCLssesCss(document.body, "whiteMode","daerkmode")
    addCLssesCss(header, "whiteMode","daerkmode")
    addCLssesCss(document.body, "whiteMode","daerkmode")
    addCLssesCss(menu, "whiteMode","daerkmode")
    addCLssesCss(h1, "corAul","corBlack")
    addCLssesCss(logo,  "logo","logoWhite")
    addCLssesCss(textoLinks, "textoLinks","daerkmode")
    li.forEach(lis => {addCLssesCss(lis, "whiteMode","daerkmode",)});
    salvarEstadoCheckbox(false)
  }
}
salvarDdaosLocalStorage()
aplicarDarkMode()