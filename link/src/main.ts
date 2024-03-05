
const botao = document.querySelector(".enviar") as HTMLButtonElement;


const mensagemDminioCom = () => {
  alert("Use o .com")
}

const exibirUrl = (data: string) => {
  const p = document.querySelector("p") as HTMLParagraphElement;
  p.textContent = data
}

const copiarUrl = (data: any) => {
  navigator.clipboard.writeText(data)
}

const mensagemVazioInput = () => {
  alert("O input esta vazio")
}


const encurtarLink = () => {
  const input = document.querySelector("input") as HTMLInputElement;
  const regex =  /\.com$/;
  if (!regex.test(encodeURIComponent(input.value))) {
    mensagemDminioCom();
  }else if (input.value === '') {
    mensagemVazioInput()
  }else{
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(input.value)}`)
    .then(response => response.text())
    .then(data => {
      exibirUrl(data)
      copiarUrl(data)
    })
  }
};

botao.addEventListener("click", () => {
  encurtarLink()
})
