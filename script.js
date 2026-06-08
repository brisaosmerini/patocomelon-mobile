const game = document.getElementById("game");
const duck = document.getElementById("duck");

const scoreText = document.getElementById("score");
const vidasText = document.getElementById("vidas");

const gameOverText = document.getElementById("gameOver");

const musica = document.getElementById("musica");

let score = 0;
let vidas = 3;

let gameOver = false;

let musicaIniciada = false;

let duckX = window.innerWidth / 2;

function iniciarMusica(){

    if(!musicaIniciada){

        musica.play();

        musicaIniciada = true;
    }
}

function actualizarVidas(){

    vidasText.textContent =
    "Vidas: " + vidas;

    if(vidas <= 0){

        gameOver = true;

        gameOverText.style.display =
        "block";
    }
}

game.addEventListener("touchstart",(e)=>{

    iniciarMusica();

    let dedo = e.touches[0];

    duckX =
    dedo.clientX -
    duck.offsetWidth/2;

    duck.style.left =
    duckX + "px";
});

game.addEventListener("touchmove",(e)=>{

    let dedo = e.touches[0];

    duckX =
    dedo.clientX -
    duck.offsetWidth/2;

    if(duckX < 0){

        duckX = 0;
    }

    if(
        duckX >
        window.innerWidth -
        duck.offsetWidth
    ){

        duckX =
        window.innerWidth -
        duck.offsetWidth;
    }

    duck.style.left =
    duckX + "px";
});

function crearObjeto(){

    if(gameOver) return;

    const item =
    document.createElement("img");

    const tipo =
    Math.floor(Math.random()*3);

    if(tipo === 0){

        item.src = "pez.png";

        item.dataset.tipo =
        "pez";

    }else if(tipo === 1){

        item.src =
        "impostor.png";

        item.dataset.tipo =
        "malo";

    }else{

        item.src =
        "impostor2.png";

        item.dataset.tipo =
        "malo";
    }

    item.classList.add("item");

    let x =
    Math.random() *
    (window.innerWidth - 120);

    item.style.left =
    x + "px";

    item.style.top =
    "-120px";

    game.appendChild(item);

    let y = -120;

    const caer =
    setInterval(()=>{

        if(gameOver){

            clearInterval(caer);
            return;
        }

        y += 8;

        item.style.top =
        y + "px";

        const duckRect =
        duck.getBoundingClientRect();

        const itemRect =
        item.getBoundingClientRect();

        if(

            duckRect.left <
            itemRect.right &&

            duckRect.right >
            itemRect.left &&

            duckRect.top <
            itemRect.bottom &&

            duckRect.bottom >
            itemRect.top

        ){

            if(
                item.dataset.tipo
                === "pez"
            ){

                score++;

                scoreText.textContent =
                "Puntos: " + score;

            }else{

                gameOver = true;

                gameOverText.style.display =
                "block";
            }

            item.remove();

            clearInterval(caer);
        }

        if(y > window.innerHeight){

            if(
                item.dataset.tipo
                === "pez"
            ){

                vidas--;

                actualizarVidas();
            }

            item.remove();

            clearInterval(caer);
        }

    },16);
}

setInterval(
    crearObjeto,
    700
);

document.addEventListener(
"click",
(e)=>{

    if(
        e.target.id
        ===
        "restartBtn"
    ){

        location.reload();
    }

});