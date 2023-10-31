const token = 'BQDwOdemfVYXGCjvZxAoQBKzPhzPdf4umUzJdWRF5JiXuF51VaE_Ig2VOwMysBmE-AEeDegLEYlP91iOsyjhu3EjDElqcJmqswXcBrgGLTez6P5HcPo';

function criarItemDaLista(capa, titulo, artista, minutagem) {
    const li = document.createElement('li');
    li.innerHTML = `
                <img src="${capa}" alt="capa da música ${titulo}" class='capa'/>
                <div>
                    <h3>${titulo}</h3>
                    <p>${artista}</p>
                </div>
                <p>${minutagem}</p>
                <button><img src="./img/ion_play.png" alt="tocar música"></button>
    `

    return li;
}

async function getDadosDaPlaylist() {
    const requisicao = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX8S9gwdi7dev/tracks?offset=0&limit=10', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (requisicao.ok) {
        const respostaConvertida = await requisicao.json();
        console.log(respostaConvertida);
        return respostaConvertida.items.map(item => {
            const track = item.track;
            const capa = track.album.images[0].url;
            const titulo = track.name;
            const artista = track.artists.map(artista => artista.name).join(', ');

            const data = new Date(track.duration_ms);
            const tempo = data.toLocaleTimeString();
            const [horas, minutos, segundos, milissegundos] = tempo.split(":");
            const duracao = `${minutos} : ${segundos}`;
            
            return criarItemDaLista(capa, titulo, artista, duracao);
        })
    } else {
        console.log('errouuuu!')
    }
}

async function carregarMusicasNaTela() {
    const listaDeMusicas = document.getElementById('lista-de-musicas');
    const musicas = await getDadosDaPlaylist();

    musicas.forEach(musica => {
        listaDeMusicas.appendChild(musica);
    })
}

carregarMusicasNaTela();

