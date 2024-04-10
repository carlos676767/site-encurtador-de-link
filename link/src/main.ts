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
  alert("O input esta vazio");
};

const url = document.querySelector(".valor") as HTMLInputElement;
const exibirResultados = (link: string) => {
  const exibirLink = document.getElementById("p") as HTMLElement;
  exibirLink.innerHTML = link;
};

const tagAExibirLink = (link: string) => {
  const redirecionarLink = document.getElementById("rerecionarLink") as HTMLAnchorElement;
  const salvarLink = redirecionarLink.href = link;
  redirecionarLink.innerHTML = salvarLink
};

const encurtarLink = async () => {
  if (url.value === "") {
    mensagemVazioInput();
  } else {
    try {
      const data = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(url.value)}`,
      });
      const response = await data.json();
      const { result_url } = response;
      exibirResultados(result_url);
      tagAExibirLink(result_url);
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  }
};

botao.addEventListener("click", () => {
  encurtarLink();
});
