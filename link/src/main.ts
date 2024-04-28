import Swal from 'sweetalert2'
import html2canvas from 'html2canvas';
const botao = document.querySelector(".enviar") as HTMLButtonElement;





const copiarUrl = (data: any) => {
  navigator.clipboard.writeText(data);
};

const mensagemVazioInput = () => {
  const mensagemVazio = document.getElementById("mensagemVazio") as HTMLParagraphElement
  mensagemVazio.innerHTML = "Por favor Digite um link."
  return mensagemVazio
};



const url = document.querySelector(".valor") as HTMLInputElement;
const exibirResultados = (link: string) => {
  const exibirLink = document.getElementById("exibirLink") as HTMLElement;
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

const exibirTagA = (link: string) => {
  const redirecionarLink = document.getElementById("rerecionarLink") as HTMLAnchorElement;
  const salvarLink = redirecionarLink.href = link;
  redirecionarLink.innerHTML = salvarLink
};



const configurarLoading = (valor: string, valor2: string) => {
  const loader = document.querySelector(".loader") as HTMLDivElement
  const encurtarLinksDiv = document.querySelector(".encurtarLinks") as HTMLDivElement
  loader.style.display = valor
  encurtarLinksDiv.style.display = valor2
}


//aqui ainda sera mexido
const links: string[] = []

const historicoLinks = (urls: string) => {
  links.push(urls);
  localStorage.setItem("linksSalvos", JSON.stringify(links));
};


const inputEstaVazio = () => {
  return url.value == ""
}

const guardarUrlEncurtada = (result: string) => {
 return armazenarLink = result
}

const encurtarLink = async () => {
  if (inputEstaVazio()) {
    mensagemVazioInput();
  } else {
    try {
      configurarLoading("block", "none")
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
      exibirTagA(result_url);
      configurarLoading("none", "")
      historicoLinks(result_url)
      guardarUrlEncurtada(result_url)
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  }
};


const recuperar = JSON.parse(localStorage.getItem("linksSalvos") ?? "{}")


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



const imagemQrCoDE = document.querySelector(".qrcode") as HTMLImageElement
const rececberImagemQrCode = (imageQrCode: string) => {
  imagemQrCoDE.src = imageQrCode
  baixarQrCODE(imagemQrCoDE)
}


const gerarQrCodes = async () => {
  try {
    const largura = document.querySelector(".largura") as HTMLInputElement
    const altura = document.querySelector(".altura") as HTMLInputElement
    const data = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(armazenarLink)}&size=${largura.value}x${altura.value}`,
      {
        method: "GET"
      }
    );
    const { url } = data;
    console.log(data);
    rececberImagemQrCode(url);
    console.log(data);
  } catch (erro) {
    console.log(erro);
  }
};

const baixarQrCODE = (qr: HTMLElement) => {
  html2canvas(qr).then((canvas) => {
    const imagemBase64 = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imagemBase64;
    link.download = "qrCode.png";
    link.click();
  });
}

const mensagemQrGerado = () => {
  Swal.fire({
    text: "QrCoDe gerado com sucesso!",
    icon: "success",
    confirmButtonText: "Ok"
  });
}

const botaoGerarQrCoDE = document.querySelector(".botaoGerarQrCoDE") as HTMLButtonElement
botaoGerarQrCoDE.addEventListener("click", () => {
  gerarQrCodes()
  mensagemQrGerado()
})


const obterVoz = (falar: string) => {
  const voz = new SpeechSynthesisUtterance()
  voz.lang = "pt-br"
  voz.text = falar
  speechSynthesis.speak(voz);
}

const vozesTalckBack = (elementoHtml: HTMLElement) => {
  elementoHtml.addEventListener("mouseout", () => {
    obterVoz(elementoHtml.innerText)
  })
}

const botoes = document.querySelectorAll("button")
const p = document.querySelectorAll("p")

vozesTalckBack(h1)
vozesTalckBack(copiarUrlButton)
for (let j = 0; j < li.length; j++) {vozesTalckBack(li[j]),vozesTalckBack(p[j])}
for (let j = 0; j < p.length; j++) {vozesTalckBack(p[j])}
for (let j = 0; j < botoes.length; j++) {vozesTalckBack(botoes[j])}
vozesTalckBack(textoLinks)




const manipularQuery = () => {
  const imagemPessoa = document.querySelector(".imagem-encurtador") as HTMLImageElement
  const imgContainer2 = document.querySelector(".imgContainer2") as HTMLDivElement
  const imagemContainer = document.querySelector(".imagem-container") as HTMLDivElement
  if (matchMedia("(max-width: 768px)").matches) {
    imagemPessoa.src = "public/assets/images/illustration-working.svg"
    imgContainer2.appendChild(imagemPessoa)
  }else{
    imagemContainer.appendChild(imagemPessoa)
  }
}
manipularQuery()
addEventListener("resize", manipularQuery)