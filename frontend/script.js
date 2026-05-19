// script.js - Consume GraphQL usando Axios
const API_URL = 'http://localhost:4001/graphql';

let selectedGameId = null;

// Cargar juegos al iniciar
window.onload = () => {
    loadGames();
    document.getElementById('note-form').addEventListener('submit', createNewNote);
};

async function loadGames() {
    const query = `
        query {
            games {
                id
                name
                slug
                imageUrl
            }
        }
    `;
    try {
        const response = await axios.post(API_URL, { query });
        const games = response.data.data.games;
        renderGames(games);
    } catch (error) {
        console.error('Error cargando juegos:', error);
        document.getElementById('games-container').innerHTML = '<p>Error al cargar juegos</p>';
    }
}

function renderGames(games) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';
    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-card';
        div.innerHTML = `<strong>${game.name}</strong><br><small>${game.slug}</small>`;
        div.onclick = () => selectGame(game.id, game.name);
        container.appendChild(div);
    });
}

function selectGame(gameId, gameName) {
    selectedGameId = gameId;
    document.getElementById('notes-section').style.display = 'block';
    document.getElementById('notes-container').innerHTML = '<p>Cargando notas...</p>';
    loadNotes(gameId);
}

async function loadNotes(gameId) {
    const query = `
        query GetNotes($gameId: ID) {
            notes(gameId: $gameId, isPublic: true) {
                id
                title
                content
                usefulVotes
                uselessVotes
                author
            }
        }
    `;
    try {
        const response = await axios.post(API_URL, {
            query,
            variables: { gameId }
        });
        const notes = response.data.data.notes;
        renderNotes(notes);
    } catch (error) {
        console.error(error);
        document.getElementById('notes-container').innerHTML = '<p>Error cargando notas</p>';
    }
}

function renderNotes(notes) {
    const container = document.getElementById('notes-container');
    if (notes.length === 0) {
        container.innerHTML = '<p>No hay notas públicas aún. ¡Sé el primero en agregar una!</p>';
        return;
    }
    container.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <small>✍️ ${escapeHtml(note.author)}</small>
            <div class="votes">
                👍 ${note.usefulVotes} 
                <button class="vote-btn" data-id="${note.id}" data-vote="useful">Votar útil</button>
                👎 ${note.uselessVotes}
                <button class="vote-btn" data-id="${note.id}" data-vote="useless">Votar inútil</button>
            </div>
            <hr>
        `;
        container.appendChild(div);
    });

    // Agregar event listeners a los botones de voto
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const noteId = btn.getAttribute('data-id');
            const voteType = btn.getAttribute('data-vote');
            await voteNote(noteId, voteType);
            loadNotes(selectedGameId);  // recargar notas para actualizar votos
        });
    });
}

async function voteNote(noteId, vote) {
    const mutation = `
        mutation Vote($id: ID!, $vote: String!) {
            voteNote(id: $id, vote: $vote) {
                id
                usefulVotes
                uselessVotes
            }
        }
    `;
    try {
        await axios.post(API_URL, {
            query: mutation,
            variables: { id: noteId, vote }
        });
    } catch (error) {
        console.error('Error votando:', error);
        alert('No se pudo registrar el voto');
    }
}

async function createNewNote(event) {
    event.preventDefault();
    if (!selectedGameId) {
        alert('Selecciona un juego primero');
        return;
    }
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const isPublic = document.getElementById('note-public').checked;
    const author = document.getElementById('note-author').value || 'Anónimo';

    const mutation = `
        mutation CreateNote($gameId: ID!, $title: String!, $content: String!, $isPublic: Boolean!, $author: String) {
            createNote(gameId: $gameId, title: $title, content: $content, isPublic: $isPublic, author: $author) {
                id
                title
            }
        }
    `;
    try {
        await axios.post(API_URL, {
            query: mutation,
            variables: { gameId: selectedGameId, title, content, isPublic, author }
        });
        alert('Nota creada exitosamente');
        document.getElementById('note-form').reset();
        loadNotes(selectedGameId); // refrescar lista
    } catch (error) {
        console.error(error);
        alert('Error al crear la nota');
    }
}

// simple función para prevenir XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}
