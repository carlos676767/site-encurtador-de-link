const botao = document.querySelector(".enviar") as HTMLButtonElement;

const mensagemDminioCom = () => {
  alert("Use o .com");
};

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
      armazenarLink = result_url
      configuracoesCarregamnento("none", "")
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  }
};

botao.addEventListener("click", () => {
  encurtarLink();
});

const darkModeButton = document.getElementById("dark-mode-toggle") as HTMLInputElement

const addCLssesCss = (elementoHtml: HTMLElement, classeCSS: string, classeCss2: string) => {
  elementoHtml.classList.add(classeCSS)
  elementoHtml.classList.remove(classeCss2)
}

const aplicarDarkMode = () => {
  darkModeButton.addEventListener("change", () => {
      if (darkModeButton.checked) {
        addCLssesCss(document.body, "daerkmode", "whiteMode")
        localStorage.setItem("darkmode", String(true))
      }else{
        addCLssesCss(document.body, "whiteMode","daerkmode")
        localStorage.setItem("darkmode", String(false))
      }
  })
}



const salvarDdaosLocalStorage = () => {
  const recuperarValor = localStorage.getItem("darkmode")
  if (recuperarValor === String(true)) {
    addCLssesCss(document.body, "daerkmode", "whiteMode")
  }else{
    addCLssesCss(document.body, "whiteMode","daerkmode")
    document.body.classList.remove("daerkmode")
  }
}
salvarDdaosLocalStorage()
aplicarDarkMode()