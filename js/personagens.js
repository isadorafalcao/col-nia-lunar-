// Cada personagem é uma grade de 12x16 "pixels". Cada letra é uma cor.
// K contorno, E olhos, W branco, H capacete, h sombra do capacete, R faixa do capacete,
// S pele, T cabelo, U traje, u sombra do traje, F botas.
const base = [
  "....KKKK....",
  "..KKHHHHKK..",
  ".KHHHHHHHHK.",
  ".KHRRRRRRHK.",
  ".KhhhhhhhhK.",
  "KTSSSSSSSSTK",
  "KTSESSSSESTK",
  ".KSSSSSSSSK.",
  "..KKSSSSKK..",
  "..KUUUUUUK..",
  ".KUUWWWWUUK.",
  "KSKUUUUUUKSK",
  "KSKUuUUuUKSK",
  ".KKUUKKUUKK.",
  "..KUUKKUUK..",
  "..KFFKKFFK.."
];

const comum = { K: "#1b1b2f", E: "#1b1b2f", W: "#ffffff" };
const cabeloLongo = { 7: ".KTSSSSSSTK.", 8: "..KTSSSSTK..", 9: "..KTUUUUTK.." };

function cria(nome, cores, ajustes = {}) {
  const grade = base.map((linha, i) => ajustes[i] ?? linha);
  return { nome, cores: { ...comum, ...cores }, grade };
}

export const personagens = [
  cria("Ana", { H: "#f2f2f7", h: "#b9bccf", R: "#e8506a", S: "#f6cdb3", T: "#2a2a3a",
                U: "#e8744f", u: "#b9502f", F: "#4a4a66" }, cabeloLongo),
  cria("Fernanda", { H: "#b9a7f0", h: "#8472c9", R: "#ffffff", S: "#e0a98a", T: "#f4e6a0",
                     U: "#6c5eb5", u: "#4a3f8a", F: "#2e2a55" }, cabeloLongo),
  cria("Marcelo", { H: "#2e3a5c", h: "#1f2840", R: "#4ec3e0", S: "#d6a77a", T: "#2a2a3a",
                    U: "#3a7bd5", u: "#2a5aa0", F: "#d9453d" }, { 12: "KSKWWWWWWKSK" }),
  cria("Amanda", { H: "#d9453d", h: "#a02f2a", R: "#ffffff", S: "#b87b55", T: "#2a2a3a",
                   U: "#3fae9a", u: "#2a7d6e", F: "#b05a3a" }, { 0: "....KRRK...." }),
  cria("Gabriel", { H: "#4a6b34", h: "#34501f", R: "#ffd166", S: "#7a4a2e", T: "#2f4a1f",
                    U: "#2f2f45", u: "#1c1c2e", F: "#f08a24" }, { 0: "..T..TT..T.." })
];

// Transforma a grade em uma imagem SVG (um quadradinho por pixel).
export function desenhaPersonagem(personagem) {
  let quadrados = "";
  personagem.grade.forEach((linha, y) => {
    [...linha].forEach((letra, x) => {
      const cor = personagem.cores[letra];
      if (cor) quadrados += `<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`;
    });
  });
  const molde = document.createElement("div");
  molde.innerHTML =
    `<svg viewBox="0 0 12 16" shape-rendering="crispEdges" role="img" aria-label="${personagem.nome}">${quadrados}</svg>`;
  return molde.firstElementChild;
}