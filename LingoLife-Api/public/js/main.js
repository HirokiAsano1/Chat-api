document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    // Função para carregar todas as postagens
    async function loadPosts() {
        const response = await fetch('/forum/publication');
        const posts = await response.json();

        postsContainer.innerHTML = ''; // Limpa o container

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                ${post.fileSrc ? `<a href="${post.fileSrc}" download>Baixar Arquivo</a>` : ''}
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Função para criar uma nova postagem
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('content', document.getElementById('content').value);
        const fileInput = document.getElementById('file');
        
        if (fileInput.files.length > 0) {
            formData.append('fileSrc', fileInput.files[0]);
        }

        await fetch('/forum/publication', {
            method: 'POST',
            body: formData,
        });

        loadPosts(); // Recarrega as postagens após criar uma nova
    });

    // Carregar as postagens ao abrir a página
    loadPosts();
});