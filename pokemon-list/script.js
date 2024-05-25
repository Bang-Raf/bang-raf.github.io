let currentPage = 1;
const pokemonsPerPage = 10;
const maxPaginationButtons = 5;

function fetchData() {
  const xhttp = new XMLHttpRequest();
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${(currentPage - 1) * pokemonsPerPage}`;
  const httpMethod = 'GET';
  xhttp.onload = function () {
    const response = JSON.parse(this.responseText);
    const results = response.results;
    let data = '<table>';
    data += '<tr><th>No</th><th>Pokemon Name</th></tr>';
    for (i = 0; i < results.length; i++) {
      const pokemonNumber = i + 1 + (currentPage - 1) * pokemonsPerPage;
      data += `<tr><td>${pokemonNumber}</td><td>${results[i].name}</td></tr>`;
    }
    data += '</table>';
    document.getElementById('progate').innerHTML = data;
    renderPagination(response.count);
  };
  xhttp.open(httpMethod, url);
  xhttp.send();
}

function renderPagination(totalPokemons) {
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  let startPage = Math.max(1, currentPage - Math.floor(maxPaginationButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
  if (endPage - startPage + 1 < maxPaginationButtons) {
    startPage = Math.max(1, endPage - maxPaginationButtons + 1);
  }

  let paginationHTML = '';
  if (currentPage > 1) {
    paginationHTML += `<button onclick="backToFirst()">&lt;&lt;</button>`;
    paginationHTML += `<button onclick="changePage(${currentPage - 1})">&lt;</button>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="changePage(${currentPage + 1})">&gt;</button>`;
    paginationHTML += `<button onclick="forwardToLast()">&gt;&gt;</button>`;
  }

  document.getElementById('pagination').innerHTML = paginationHTML;
}

function changePage(page) {
  if (currentPage === page) {
    return;
  }
  currentPage = page;
  fetchData();
}

function backToFirst() {
  currentPage = 1;
  fetchData();
}

function forwardToLast() {
  const xhttp = new XMLHttpRequest();
  const url = `https://pokeapi.co/api/v2/pokemon`;
  const httpMethod = 'GET';
  xhttp.onload = function () {
    const response = JSON.parse(this.responseText);
    const totalPokemons = response.count;
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
    currentPage = totalPages;
    fetchData();
  };
  xhttp.open(httpMethod, url);
  xhttp.send();
}

function clearData() {
  currentPage = 1;
  document.getElementById('progate').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
}
