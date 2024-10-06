"use strict"

let button = document.getElementById('search-btn')
let result = document.getElementById('result')

button.addEventListener('click', function () {
    const query = document.getElementById('search').value
    let xhr = new XMLHttpRequest()
    xhr.open('get', `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=3e304a56179b43faa919594a663fe1fe`, true)

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)

            result.innerHTML = ''

            data.articles.forEach(article => {
                const articleDiv = document.createElement('div')
                articleDiv.classList.add('article')

                articleDiv.innerHTML = `
                            <div class="article-details">
                                <h3>${article.title}</h3>
                                <p><strong>기자:</strong> ${article.author}</p>
                                <p><strong>작성일:</strong> ${new Date(article.publishedAt).toLocaleString()}</p>
                                <p>${article.description}</p>
                            </div>
                            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="기사 이미지">
                        `;
                result.appendChild(articleDiv)
            });
        } else {
            console.error('Error:', xhr.statusText)
        }
    };

    xhr.send()
})