
/* =====================================================
   APRENDA A ORAR
   MINISTÉRIO ATALAIA
   JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTOS
    ================================================= */

    const oracoes = document.querySelectorAll(".oracao");
    const categorias = document.querySelectorAll(".categoria");
    const audios = document.querySelectorAll("audio");


    /* =================================================
       PESQUISA
       
       Cria automaticamente uma área de pesquisa
       antes da lista de orações.
    ================================================= */

    const conteudo = document.querySelector(".conteudo");
    const tituloSecao = document.querySelector(".titulo-secao");

    if (conteudo && tituloSecao) {

        const pesquisa = document.createElement("div");

        pesquisa.className = "area-pesquisa";

        pesquisa.innerHTML = `
            <div class="campo-pesquisa">

                <span class="icone-pesquisa">
                    🔎
                </span>

                <input
                    type="search"
                    id="pesquisaOracao"
                    placeholder="Pesquisar uma oração..."
                    autocomplete="off"
                    aria-label="Pesquisar uma oração"
                >

                <button
                    type="button"
                    id="limparPesquisa"
                    class="limpar-pesquisa"
                    aria-label="Limpar pesquisa"
                    title="Limpar pesquisa">
                    ×
                </button>

            </div>

            <div class="filtro-categorias">

                <button
                    type="button"
                    class="filtro ativo"
                    data-filtro="todas">
                    Todas
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="aproximacao">
                    Aproximação
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="transformacao">
                    Vida Cristã
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="protecao">
                    Proteção
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="intercessao">
                    Intercessão
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="missao">
                    Missão
                </button>

                <button
                    type="button"
                    class="filtro"
                    data-filtro="centrais">
                    Orações Centrais
                </button>

            </div>

            <p
                id="contadorResultados"
                class="contador-resultados">
            </p>
        `;

        tituloSecao.after(pesquisa);
    }


    /* =================================================
       ELEMENTOS DA PESQUISA
    ================================================= */

    const campoPesquisa =
        document.getElementById("pesquisaOracao");

    const limparPesquisa =
        document.getElementById("limparPesquisa");

    const contador =
        document.getElementById("contadorResultados");

    const filtros =
        document.querySelectorAll(".filtro");


    /* =================================================
       CLASSIFICAÇÃO DAS CATEGORIAS
    ================================================= */

    const nomesCategorias = [
        "aproximacao",
        "transformacao",
        "protecao",
        "intercessao",
        "missao",
        "centrais"
    ];


    categorias.forEach((categoria, index) => {

        if (nomesCategorias[index]) {

            categoria.dataset.categoria =
                nomesCategorias[index];

        }

    });


    /* =================================================
       CONTADOR
    ================================================= */

    function atualizarContador(quantidade) {

        if (!contador) {
            return;
        }

        if (quantidade === 1) {

            contador.textContent =
                "1 oração encontrada.";

        } else {

            contador.textContent =
                `${quantidade} orações encontradas.`;

        }

    }


    atualizarContador(oracoes.length);


    /* =================================================
       FILTRAR ORAÇÕES
    ================================================= */

    function filtrarOracoes() {

        const termo =
            campoPesquisa
                ? campoPesquisa.value
                    .trim()
                    .toLowerCase()
                : "";

        const filtroAtivo =
            document.querySelector(".filtro.ativo");

        const categoriaSelecionada =
            filtroAtivo
                ? filtroAtivo.dataset.filtro
                : "todas";


        let quantidadeVisivel = 0;


        oracoes.forEach(oracao => {

            const titulo =
                oracao
                    .querySelector(".info h4")
                    ?.textContent
                    .toLowerCase() || "";


            const referencia =
                oracao
                    .querySelector(".info p")
                    ?.textContent
                    .toLowerCase() || "";


            const textoCompleto =
                `${titulo} ${referencia}`;


            const categoria =
                oracao
                    .closest(".categoria")
                    ?.dataset.categoria || "";


            const correspondePesquisa =
                textoCompleto.includes(termo);


            const correspondeCategoria =
                categoriaSelecionada === "todas" ||
                categoria === categoriaSelecionada;


            if (
                correspondePesquisa &&
                correspondeCategoria
            ) {

                oracao.style.display = "grid";

                quantidadeVisivel++;

            } else {

                oracao.style.display = "none";

            }

        });


        /* =============================================
           ESCONDER CATEGORIAS SEM RESULTADOS
        ============================================= */

        categorias.forEach(categoria => {

            const cardsVisiveis =
                Array.from(
                    categoria.querySelectorAll(".oracao")
                ).some(card =>
                    card.style.display !== "none"
                );


            if (cardsVisiveis) {

                categoria.style.display = "block";

            } else {

                categoria.style.display = "none";

            }

        });


        atualizarContador(quantidadeVisivel);

    }


    /* =================================================
       PESQUISA EM TEMPO REAL
    ================================================= */

    if (campoPesquisa) {

        campoPesquisa.addEventListener(
            "input",
            filtrarOracoes
        );

    }


    /* =================================================
       BOTÃO LIMPAR
    ================================================= */

    if (limparPesquisa) {

        limparPesquisa.addEventListener(
            "click",
            () => {

                if (campoPesquisa) {

                    campoPesquisa.value = "";

                    campoPesquisa.focus();

                }

                filtrarOracoes();

            }
        );

    }


    /* =================================================
       FILTROS
    ================================================= */

    filtros.forEach(filtro => {

        filtro.addEventListener(
            "click",
            () => {

                filtros.forEach(item => {

                    item.classList.remove("ativo");

                });


                filtro.classList.add("ativo");


                filtrarOracoes();

            }
        );

    });


    /* =================================================
       CONTROLE DOS ÁUDIOS
       
       Apenas um áudio pode tocar por vez.
    ================================================= */

    audios.forEach(audio => {

        audio.addEventListener(
            "play",
            () => {

                audios.forEach(outroAudio => {

                    if (outroAudio !== audio) {

                        outroAudio.pause();

                    }

                });

            }
        );

    });


    /* =================================================
       PAUSA QUANDO O USUÁRIO SAI DA PÁGINA
    ================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                audios.forEach(audio => {

                    audio.pause();

                });

            }

        }
    );


    /* =================================================
       ANIMAÇÃO DOS CARDS
    ================================================= */

    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(
                entradas => {

                    entradas.forEach(entrada => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "visivel"
                            );

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        oracoes.forEach(oracao => {

            oracao.classList.add("entrada");

            observador.observe(oracao);

        });

    }


    /* =================================================
       NAVEGAÇÃO PARA O TOPO
    ================================================= */

    const botaoTopo =
        document.createElement("button");

    botaoTopo.type = "button";

    botaoTopo.className = "botao-topo";

    botaoTopo.innerHTML = "↑";

    botaoTopo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    botaoTopo.title = "Voltar ao topo";


    document.body.appendChild(botaoTopo);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                botaoTopo.classList.add("mostrar");

            } else {

                botaoTopo.classList.remove("mostrar");

            }

        }
    );


    botaoTopo.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================================
       ACESSIBILIDADE
    ================================================= */

    oracoes.forEach(oracao => {

        const titulo =
            oracao.querySelector(".info h4");

        if (titulo) {

            oracao.setAttribute(
                "aria-label",
                titulo.textContent.trim()
            );

        }

    });


    /* =================================================
       LOG
    ================================================= */

    console.log(
        "Aprenda a Orar — Ministério Atalaia carregado."
    );

});

