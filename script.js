// HTML öğelerini seç
const pokemonID = document.getElementById('pokemon-id'); // Pokémon ID göstergesi
const pokemonName = document.getElementById('pokemon-name'); // Pokémon adı göstergesi
const spriteContainer = document.getElementById('sprite-container'); // Pokémon sprite'ını göstermek için konteyner
const types = document.getElementById('types'); // Pokémon türlerini göstermek için konteyner
const height = document.getElementById('height'); // Pokémon yüksekliği
const weight = document.getElementById('weight'); // Pokémon ağırlığı
const hp = document.getElementById('hp'); // Pokémon HP (sağlık puanı)
const attack = document.getElementById('attack'); // Pokémon saldırı gücü
const defense = document.getElementById('defense'); // Pokémon savunma gücü
const specialAttack = document.getElementById('special-attack'); // Pokémon özel saldırı gücü
const specialDefense = document.getElementById('special-defense'); // Pokémon özel savunma gücü
const speed = document.getElementById('speed'); // Pokémon hızı
const searchForm = document.getElementById('search-form'); // Arama formu
const searchInput = document.getElementById('search-input'); // Arama girişi

// Pokémon verilerini API'den çekmek için asenkron fonksiyon
const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase(); // Arama girişindeki değeri al ve küçük harfe çevir
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}` // API'den Pokémon verilerini çek
    );
    const data = await response.json(); // JSON formatında verileri al

    // Pokémon bilgilerini ayarla
    pokemonName.textContent = `${data.name.toUpperCase()}`; // Pokémon adını büyük harfle göster
    pokemonID.textContent = `#${data.id}`; // Pokémon ID'sini göster
    weight.textContent = `Weight: ${data.weight}`; // Pokémon ağırlığını göster
    height.textContent = `Height: ${data.height}`; // Pokémon yüksekliğini göster
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `; // Pokémon'un ön sprite'ını göster

    // Pokémon istatistiklerini ayarla
    hp.textContent = data.stats[0].base_stat; // HP
    attack.textContent = data.stats[1].base_stat; // Saldırı
    defense.textContent = data.stats[2].base_stat; // Savunma
    specialAttack.textContent = data.stats[3].base_stat; // Özel saldırı
    specialDefense.textContent = data.stats[4].base_stat; // Özel savunma
    speed.textContent = data.stats[5].base_stat; // Hız

    // Pokémon türlerini ayarla
    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`) // Türleri ekrana yazdır
      .join('');
  } catch (err) {
    resetDisplay(); // Hata durumunda ekranı sıfırla
    alert('Pokémon bulunamadı'); // Kullanıcıya hata mesajı göster
    console.log(`Pokémon bulunamadı: ${err}`); // Hata mesajını konsola yazdır
  }
};

// Ekranı sıfırlamak için fonksiyon
const resetDisplay = () => {
  const sprite = document.getElementById('sprite'); // Sprite elementini al
  if (sprite) sprite.remove(); // Eğer sprite varsa, kaldır

  // İstatistikleri sıfırla
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

// Form gönderildiğinde Pokémon verilerini al
searchForm.addEventListener('submit', e => {
  e.preventDefault(); // Formun varsayılan davranışını engelle
  getPokemon(); // Pokémon verilerini al
});
