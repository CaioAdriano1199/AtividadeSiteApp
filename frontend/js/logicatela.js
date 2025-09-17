//cadastro
document.getElementById('btncadastrar').addEventListener('click', async () => {
  const nome = document.getElementById('nomecad').value.trim();
  const email = document.getElementById('emailcad').value.trim();
  const senha = document.getElementById('senhacad').value.trim();


  try {
    const res = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Cadastro realizado com sucesso!');
      paratelalogin();
    } else {
      alert(data.error || 'Erro ao cadastrar');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor');
  }
});

//login
document.getElementById('btnlogin').addEventListener('click', async () => {
  const email = document.getElementById('emaillog').value.trim();
  const senha = document.getElementById('senhalog').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById('nomeusuario').textContent = `Olá, ${data.cliente.nome}!`;
      paratelaconteudo();
      carregarHome();
      mostrarHome();
    } else {
      alert(data.error || 'Erro ao logar');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor');
  }
});

//lugares
async function carregarEstabelecimentos() {
  try {
    const res = await fetch('http://localhost:3000/estabelecimentos');
    const data = await res.json();

    const lista = document.getElementById('listaEstabelecimentos');
    lista.innerHTML = '';

    data.forEach(est => {

      const link = document.createElement('a');
      link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(est.endereco)}`;
      link.target = '_blank'; // abre em nova aba
      link.style.textDecoration = 'none'; // remove sublinhado do link
      link.style.color = 'inherit';

      const card = document.createElement('div');
      card.className = 'card';

      const logo = document.createElement('img');
      logo.src = est.logo_url || 'https://via.placeholder.com/60';
      logo.alt = est.nome;

      const info = document.createElement('div');
      info.className = 'info';

      const nomeNota = document.createElement('div');
      nomeNota.className = 'nome-nota';
      nomeNota.innerHTML = `<h3>${est.nome}</h3> <span class="nota"><i class="bi bi-star-fill"></i> ${est.nota}</span>`;

      const endereco = document.createElement('p');
      endereco.className = 'endereco';
      endereco.textContent = est.endereco;

      info.appendChild(nomeNota);
      info.appendChild(endereco);

      card.appendChild(logo);
      card.appendChild(info);

      link.appendChild(card);
      lista.appendChild(link);
    });

  } catch (err) {
    console.error(err);
    alert('Erro ao carregar estabelecimentos');
  }
}

//ranking
async function carregarRanking() {
  try {
    const res = await fetch('http://localhost:3000/estabelecimentos');
    let data = await res.json();

    // Ordena por nota (desc) e pega os 5 primeiros
    const top5 = data
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 5);

    const rankingList = document.getElementById('ranking-list');
    if (!rankingList) return;
    rankingList.innerHTML = '';

    top5.forEach((est, index) => {
      // link para maps
      const link = document.createElement('a');
      link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(est.endereco)}`;
      link.target = '_blank';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';

      const card = document.createElement('div');
      card.className = 'card ranking-card';

      const posicao = document.createElement('span');
      posicao.className = 'posicao';
      posicao.textContent = `#${index + 1}`;

      const logo = document.createElement('img');
      logo.src = est.logo_url || 'https://via.placeholder.com/60';
      logo.alt = est.nome;

      const info = document.createElement('div');
      info.className = 'info';

      const nomeNota = document.createElement('div');
      nomeNota.className = 'nome-nota';
      nomeNota.innerHTML = `
        <h3>${est.nome}</h3> 
        <span class="nota"><i class="bi bi-star-fill"></i> ${est.nota}</span>
      `;

      const endereco = document.createElement('p');
      endereco.className = 'endereco';
      endereco.textContent = est.endereco;

      info.appendChild(nomeNota);
      info.appendChild(endereco);

      card.appendChild(posicao);
      card.appendChild(logo);
      card.appendChild(info);

      link.appendChild(card);
      rankingList.appendChild(link);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar ranking');
  }
}

//home
async function carregarHome() {
  const boasVindas = document.getElementById('home-boas-vindas');
  const nomeUsuario = document.getElementById('nomeusuario').textContent.replace("Olá,", "").trim();
  boasVindas.textContent = `Olá, ${nomeUsuario}!`;

  try {
    const res = await fetch('http://localhost:3000/estabelecimentos');
    const data = await res.json();

    const categorias = [...new Set(data.map(l => l.tipo))];

    const destaques = categorias.map(cat => {
      const lugares = data.filter(l => l.tipo === cat);
      lugares.sort((a, b) => b.nota - a.nota);
      return lugares[0];
    }).filter(Boolean);

    const container = document.getElementById('home-destaques');
    container.innerHTML = '';

    destaques.forEach(est => {
      const link = document.createElement('a');
      link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(est.endereco)}`;
      link.target = '_blank';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';

      const card = document.createElement('div');
      card.className = 'card-destaque';

      const logo = document.createElement('img');
      logo.src = est.logo_url || 'https://via.placeholder.com/80';
      logo.alt = est.nome;

      const info = document.createElement('div');
      info.className = 'nome-nota';
info.innerHTML = `
  <h4>${est.nome}</h4>
  <div class="nota-categoria">
    <span class="nota"><i class="bi bi-star-fill"></i> ${est.nota}</span>
    <p class="categoria">${est.tipo}</p>
  </div>
`;


      card.appendChild(logo);
      card.appendChild(info);
      link.appendChild(card);
      container.appendChild(link);
    });

  } catch (err) {
    console.error(err);
    alert('Erro ao carregar Home');
  }
}

//perfil


window.addEventListener('DOMContentLoaded', carregarEstabelecimentos);