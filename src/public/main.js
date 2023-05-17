const form = document.querySelector('.url-form');
form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('.url-input');
    fetch('/api/url/shorten', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: input.value,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const result = document.querySelector('.result');
            while (result.hasChildNodes()) {
                result.removeChild(result.lastChild);
            }

            result.insertAdjacentHTML('afterbegin', `
        <div class="result">
          <a target="_blank" class="short-url" rel="noopener" href="${data.originalUrl}">
            ${data.shortUrl}
          </a>
        </div>
      `)
        })
        .catch(console.error)
});