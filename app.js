// ===== SPACE MEMORIES WEBSITE — app.js =====
// Loads data from localStorage (set via admin.html)

// ===== DATA MANAGEMENT =====
const DEFAULT_DATA = {
  heroTitle: '🌌 Ruang Kenangan',
  heroSubtitle: 'Untuk Menyimpan Kenangan Indah Kita',
  coupleNames: 'Only For U, MIEE AYAMM 💕',
  planets: [
    { name: 'Merkurius', emoji: '🟤', color: '#a1887f', label: 'Pertemuan Pertama', desc: 'Saat pertama kali kita bertemu, dunia terasa berbeda', photo: null, date: 'Jan 2024' },
    { name: 'Venus',     emoji: '🟡', color: '#ffcc80', label: 'Kenangan Manis',    desc: 'Momen-momen manis yang tak terlupakan',             photo: null, date: 'Feb 2024' },
    { name: 'Bumi',      emoji: '🔵', color: '#4fc3f7', label: 'Rumah Kita',        desc: 'Di mana pun kamu ada, itulah rumahku',             photo: null, date: 'Mar 2024' },
    { name: 'Mars',      emoji: '🔴', color: '#ef5350', label: 'Petualangan',       desc: 'Petualangan seru bersama-sama',                    photo: null, date: 'Apr 2024' },
    { name: 'Jupiter',   emoji: '🟠', color: '#ff7043', label: 'Momen Besar',       desc: 'Pencapaian dan kebanggaan yang kita rayakan',      photo: null, date: 'Mei 2024' },
    { name: 'Saturnus',  emoji: '💛', color: '#ffd54f', label: 'Hari Spesial',      desc: 'Hari-hari paling indah dalam hidup kita',          photo: null, date: 'Jun 2024' },
    { name: 'Uranus',    emoji: '🔵', color: '#80deea', label: 'Mimpi Kita',        desc: 'Mimpi dan harapan yang kita rajut bersama',        photo: null, date: 'Jul 2024' },
    { name: 'Neptunus',  emoji: '🔷', color: '#7986cb', label: 'Cinta Abadi',       desc: 'Cinta kita seperti luar angkasa — tak bertepi',   photo: null, date: 'Agt 2024' }
  ],
  albums: [
    { title: 'Momen Spesial Pertama',  desc: 'Awal dari cerita indah kita di bawah langit berbintang', date: 'Jan 2024', emoji: '🌌' },
    { title: 'Petualangan Bersama',    desc: 'Menjelajahi semesta berdua terasa jauh lebih bermakna',   date: 'Feb 2024', emoji: '🚀' },
    { title: 'Momen Tertawa',          desc: 'Tawa kita bergema di antara bintang-bintang',             date: 'Mar 2024', emoji: '😄' },
    { title: 'Di Bawah Langit Malam',  desc: 'Duduk bersama memandang bintang-bintang bertebaran',     date: 'Apr 2024', emoji: '🌠' },
    { title: 'Hari Ulang Tahun',       desc: 'Merayakan momen spesialmu di bawah cahaya bintang',      date: 'Mei 2024', emoji: '🎂' },
    { title: 'Jalan-jalan Romantis',   desc: 'Setiap langkah bersamamu terasa seperti di antara awan', date: 'Jun 2024', emoji: '💫' },
    { title: 'Momen Kejutan',          desc: 'Saat kamu memberikanku kejutan paling indah seumur hidup',date: 'Jul 2024', emoji: '🎁' },
    { title: 'Impian & Harapan',       desc: 'Merancang masa depan cerah bersama di bawah sinar bulan', date: 'Agt 2024', emoji: '🌙' }
  ],
  playlist: [
    { title: 'A Thousand Years',       artist: 'Christina Perri',  duration: '4:45', url: '' },
    { title: 'Perfect',                artist: 'Ed Sheeran',        duration: '4:23', url: '' },
    { title: 'All of Me',              artist: 'John Legend',       duration: '4:29', url: '' },
    { title: 'Thinking Out Loud',      artist: 'Ed Sheeran',        duration: '4:41', url: '' },
    { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', duration: '3:00', url: '' },
    { title: 'Make You Feel My Love',  artist: 'Adele',             duration: '3:32', url: '' }
  ],
  stories: [
    { date: 'Januari 2024',  emoji: '⭐', title: 'Awal Perjalanan',       text: 'Di sinilah cerita kita dimulai. Seperti bintang baru yang lahir di galaksi yang luas, kita pertama kali bertemu.' },
    { date: 'Maret 2024',    emoji: '🌙', title: 'Malam-malam Indah',      text: 'Memandang bulan bersama di bawah langit malam yang penuh bintang, bertukar cerita dan impian.' },
    { date: 'Mei 2024',      emoji: '🪐', title: 'Petualangan Dimulai',    text: 'Seperti pesawat antariksa yang meluncur ke luar angkasa, kita memulai petualangan hidup bersama.' },
    { date: 'Juli 2024',     emoji: '💫', title: 'Momen Tak Terlupakan',   text: 'Kenangan yang terukir di galaksi hati kita, bersinar terang seperti bintang-bintang di langit malam.' },
    { date: 'Sekarang',      emoji: '🌌', title: 'Selamanya Bersama',      text: 'Dan seperti semesta yang terus berkembang, cinta kita pun terus tumbuh — tanpa batas, tanpa akhir.' }
  ]
};

function loadData() {
  const saved = localStorage.getItem('spaceMemoriesData');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Deep merge
      return {
        ...DEFAULT_DATA,
        ...parsed,
        planets: parsed.planets || DEFAULT_DATA.planets,
        albums: parsed.albums || DEFAULT_DATA.albums,
        playlist: parsed.playlist || DEFAULT_DATA.playlist,
        stories: parsed.stories || DEFAULT_DATA.stories
      };
    } catch(e) {}
  }
  return DEFAULT_DATA;
}

const DATA = loadData();

// ===== STARFIELD =====
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2
    });
  }

  let frame = 0;
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame += 0.01;
    stars.forEach(s => {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(frame * s.speed * 50 + s.twinkleOffset));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,244,253,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // Shooting stars
  function spawnShootingStar() {
    const el = document.createElement('div');
    el.classList.add('shooting-star');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 50 + '%';
    const angle = 30 + Math.random() * 60;
    el.style.setProperty('--angle', angle + 'deg');
    el.style.animationDuration = (1.5 + Math.random()) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
  setInterval(spawnShootingStar, 3000 + Math.random() * 3000);
})();

// ===== CURSOR =====
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });

  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.addEventListener('mousedown', () => {
    cursor.style.transform += ' scale(1.8)';
    cursor.style.background = 'var(--nebula-pink)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.background = 'var(--nebula-cyan)';
  });
})();

// ===== HERO =====
document.getElementById('heroTitle').textContent = DATA.heroTitle;
document.getElementById('heroSubtitle').textContent = DATA.heroSubtitle;

// ===== NAVIGATION =====
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav-dot').forEach(d => {
        d.classList.toggle('active', d.dataset.section === id);
      });
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.id === 'tab-' + id);
      });
      // Fade in
      entry.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

// ===== SOLAR SYSTEM =====
(function buildSolarSystem() {
  const container = document.getElementById('solarSystem');
  const size = container.offsetWidth || 500;
  const center = size / 2;
  const planets = DATA.planets;

  // Orbit radii
  const minR = size * 0.12;
  const maxR = size * 0.46;
  const step = (maxR - minR) / (planets.length - 1);
  // Speeds (seconds per orbit)
  const speeds = [6, 10, 16, 24, 36, 50, 70, 100];

  planets.forEach((p, i) => {
    const radius = minR + step * i;
    const planetSize = Math.max(18, 38 - i * 2);
    const speed = speeds[i] || 50 + i * 15;

    // Orbit ring
    const orbit = document.createElement('div');
    orbit.classList.add('orbit');
    orbit.style.width = orbit.style.height = (radius * 2) + 'px';
    orbit.style.animationDuration = speed + 's';
    // Don't actually rotate orbit (just show as static ring)
    orbit.style.animation = 'none';
    container.appendChild(orbit);

    // Planet orbit wrapper (rotates)
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      position: absolute;
      top: 50%; left: 50%;
      width: ${radius}px; height: 2px;
      transform-origin: 0 50%;
      transform: translate(0,-50%) rotate(${Math.random() * 360}deg);
      animation: orbitRotate ${speed}s linear infinite;
    `;

    // Planet element
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.cssText = `
      width: ${planetSize}px; height: ${planetSize}px;
      background: radial-gradient(circle at 35% 35%, ${lightenColor(p.color)}, ${p.color}, ${darkenColor(p.color)});
      color: ${p.color};
      margin-left: ${radius - planetSize / 2}px;
      box-shadow: 0 0 ${planetSize}px ${p.color}88;
      position: relative;
    `;
    planet.title = `${p.name} — ${p.label}`;
    planet.addEventListener('click', () => openPlanetPopup(i));

    // Saturn rings
    if (i === 5) {
      const ring = document.createElement('div');
      ring.classList.add('planet-ring');
      ring.style.width = (planetSize * 2.2) + 'px';
      ring.style.height = (planetSize * 2.2) + 'px';
      ring.style.borderColor = `${p.color}88`;
      planet.appendChild(ring);
    }

    // Photo (if set)
    if (p.photo) {
      const img = document.createElement('img');
      img.src = p.photo;
      img.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover;';
      planet.appendChild(img);
    } else {
      planet.style.background = `radial-gradient(circle at 35% 35%, ${lightenColor(p.color)}, ${p.color}, ${darkenColor(p.color)})`;
      // Show emoji as pseudo
      const emo = document.createElement('span');
      emo.textContent = p.emoji;
      emo.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:${planetSize * 0.5}px;pointer-events:none;`;
      planet.appendChild(emo);
    }

    // Label
    const label = document.createElement('div');
    label.classList.add('planet-label');
    label.textContent = p.name;
    planet.appendChild(label);

    wrapper.appendChild(planet);
    container.appendChild(wrapper);
  });

  function lightenColor(hex) {
    try {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)})`;
    } catch { return hex; }
  }
  function darkenColor(hex) {
    try {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)})`;
    } catch { return hex; }
  }
})();

// ===== PLANET POPUP =====
function openPlanetPopup(idx) {
  const p = DATA.planets[idx];
  const popup = document.getElementById('photoPopup');
  document.getElementById('popupTitle').textContent = `${p.name} — ${p.label}`;
  document.getElementById('popupDesc').textContent = `${p.date} · ${p.desc}`;
  const imgEl = document.getElementById('popupImg');
  if (p.photo) {
    imgEl.outerHTML = `<img id="popupImg" class="photo-popup-img" src="${p.photo}" alt="${p.name}" />`;
  } else {
    imgEl.innerHTML = p.emoji;
    imgEl.style.cssText = 'width:200px;height:200px;background:linear-gradient(135deg,rgba(26,5,51,0.9),rgba(10,22,40,0.9));display:flex;align-items:center;justify-content:center;font-size:5rem;border-radius:50%;border:2px solid var(--nebula-cyan);box-shadow:0 0 40px var(--glow-cyan);';
  }
  popup.classList.add('show');
}

function openSunPopup() {
  const popup = document.getElementById('photoPopup');
  document.getElementById('popupTitle').textContent = '☀️ Matahari — Pusat Semesta Kita';
  document.getElementById('popupDesc').textContent = DATA.coupleNames;
  const imgEl = document.getElementById('popupImg');
  imgEl.innerHTML = '☀️';
  imgEl.style.cssText = 'width:200px;height:200px;background:radial-gradient(circle,rgba(255,200,0,0.3),rgba(255,100,0,0.2));display:flex;align-items:center;justify-content:center;font-size:5rem;border-radius:50%;border:2px solid #ffaa00;box-shadow:0 0 60px rgba(255,170,0,0.6);';
  popup.classList.add('show');
}

function closePopup() {
  document.getElementById('photoPopup').classList.remove('show');
}

document.getElementById('photoPopup').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// ===== ALBUM =====
let currentAlbum = 0;

function renderAlbum() {
  const albums = DATA.albums;
  const a = albums[currentAlbum];
  document.getElementById('albumDateBadge').textContent = a.date;
  document.getElementById('albumNum').textContent = String(currentAlbum + 1).padStart(2, '0');
  document.getElementById('albumMomentTitle').textContent = a.title;
  document.getElementById('albumMomentDesc').textContent = a.desc;
  document.getElementById('albumCounter').textContent = `${currentAlbum + 1} / ${albums.length}`;

  const mainPhoto = document.getElementById('albumMainPhoto');
  if (a.photo) {
    mainPhoto.innerHTML = `<img src="${a.photo}" alt="${a.title}" style="width:100%;height:220px;object-fit:cover;display:block;" />`;
  } else {
    mainPhoto.innerHTML = `<span style="font-size:4rem;">${a.emoji}</span>`;
  }
  mainPhoto.style.height = '220px';
  mainPhoto.style.display = 'flex';
  mainPhoto.style.alignItems = 'center';
  mainPhoto.style.justifyContent = 'center';

  const thumbs = document.getElementById('albumThumbs');
  thumbs.innerHTML = '';
  albums.forEach((al, i) => {
    const t = document.createElement('div');
    t.classList.add('album-thumb');
    if (i === currentAlbum) t.classList.add('active');
    if (al.photo) {
      t.innerHTML = `<img src="${al.photo}" alt="${al.title}" />`;
    } else {
      t.textContent = al.emoji;
    }
    t.addEventListener('click', () => { currentAlbum = i; renderAlbum(); });
    thumbs.appendChild(t);
  });
}

function changeAlbum(dir) {
  const albums = DATA.albums;
  currentAlbum = (currentAlbum + dir + albums.length) % albums.length;
  renderAlbum();
}

renderAlbum();

// ===== MUSIC PLAYER =====
let audio = null;
let currentTrack = -1;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let bgMusic = null;
let bgMusicPlaying = false;

function initBgMusic() {
  // Try to load ambient bg music (optional — no source by default)
  bgMusicPlaying = true;
  document.getElementById('musicToggleBtn').textContent = '🔊 Hentikan Musik';
}

function toggleBgMusic() {
  if (bgMusic) {
    if (bgMusicPlaying) { bgMusic.pause(); bgMusicPlaying = false; document.getElementById('musicToggleBtn').textContent = '🔇 Putar Musik'; }
    else { bgMusic.play(); bgMusicPlaying = true; document.getElementById('musicToggleBtn').textContent = '🔊 Hentikan Musik'; }
  } else {
    document.getElementById('musicToggleBtn').textContent = '🎵 Tidak Ada Musik';
    setTimeout(() => { document.getElementById('musicToggleBtn').textContent = '🔊 Musik'; }, 2000);
  }
}

function renderPlaylist() {
  const pl = document.getElementById('playlist');
  pl.innerHTML = '';
  DATA.playlist.forEach((track, i) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    if (i === currentTrack) item.classList.add('active');
    item.innerHTML = `
      <span class="playlist-num">${i === currentTrack && isPlaying ? '▶' : String(i + 1).padStart(2, '0')}</span>
      <span class="playlist-name">${track.title}</span>
      <span class="playlist-dur">${track.duration}</span>
    `;
    item.addEventListener('click', () => loadTrack(i));
    pl.appendChild(item);
  });
}

function loadTrack(idx) {
  currentTrack = idx;
  const track = DATA.playlist[idx];
  document.getElementById('musicTrackName').textContent = track.title;
  document.getElementById('musicTrackSub').textContent = track.artist;

  if (audio) { audio.pause(); audio.src = ''; }
  if (track.url) {
    audio = new Audio(track.url);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onTrackEnd);
    audio.addEventListener('loadedmetadata', () => {
      document.getElementById('totalTime').textContent = formatTime(audio.duration);
    });
    audio.play().then(() => { isPlaying = true; updatePlayBtn(); document.getElementById('musicDisc').classList.add('spinning'); }).catch(() => {});
  } else {
    isPlaying = false;
    updatePlayBtn();
  }
  renderPlaylist();
}

function togglePlay() {
  if (!audio || currentTrack === -1) {
    if (DATA.playlist.length > 0) loadTrack(0);
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    document.getElementById('musicDisc').classList.remove('spinning');
  } else {
    audio.play();
    isPlaying = true;
    document.getElementById('musicDisc').classList.add('spinning');
  }
  updatePlayBtn();
}

function updatePlayBtn() {
  document.getElementById('playBtn').textContent = isPlaying ? '⏸' : '▶';
}

function prevTrack() {
  if (DATA.playlist.length === 0) return;
  const prev = (currentTrack - 1 + DATA.playlist.length) % DATA.playlist.length;
  loadTrack(prev);
}

function nextTrack() {
  if (DATA.playlist.length === 0) return;
  let next;
  if (isShuffle) next = Math.floor(Math.random() * DATA.playlist.length);
  else next = (currentTrack + 1) % DATA.playlist.length;
  loadTrack(next);
}

function onTrackEnd() {
  if (isRepeat) { audio.currentTime = 0; audio.play(); }
  else nextTrack();
}

function shuffleMusic() {
  isShuffle = !isShuffle;
  document.getElementById('shuffleBtn').style.color = isShuffle ? 'var(--nebula-cyan)' : '';
  document.getElementById('shuffleBtn').style.textShadow = isShuffle ? '0 0 10px var(--nebula-cyan)' : '';
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById('repeatBtn').style.color = isRepeat ? 'var(--nebula-pink)' : '';
  document.getElementById('repeatBtn').style.textShadow = isRepeat ? '0 0 10px var(--nebula-pink)' : '';
}

function updateProgress() {
  if (!audio || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
}

function seekMusic(e) {
  if (!audio || !audio.duration) return;
  const bar = document.getElementById('progressBar');
  const rect = bar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
}

function setVolume(e) {
  const bar = document.querySelector('.music-vol-slider');
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  document.getElementById('volFill').style.width = (pct * 100) + '%';
  if (audio) audio.volume = pct;
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

renderPlaylist();

// ===== STORIES =====
(function buildStories() {
  const timeline = document.getElementById('storyTimeline');
  DATA.stories.forEach(s => {
    const item = document.createElement('div');
    item.classList.add('story-item');
    item.innerHTML = `
      <div class="story-dot">${s.emoji}</div>
      <div class="story-card">
        <div class="story-card-date">${s.date}</div>
        <div class="story-card-title">${s.title}</div>
        <div class="story-card-text">${s.text}</div>
      </div>
    `;
    timeline.appendChild(item);
  });
})();

// ===== FLOATING PARTICLES =====
(function spawnParticles() {
  const colors = ['#ff2d78', '#00d4ff', '#8b5cf6', '#ffd700', '#ff6b35'];
  function spawn() {
    const p = document.createElement('div');
    p.classList.add('floating-particle');
    const size = 2 + Math.random() * 5;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}vw;
      animation-duration:${10 + Math.random() * 20}s;
      animation-delay:${Math.random() * 5}s;
      opacity:${0.3 + Math.random() * 0.5};
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 30000);
  }
  for (let i = 0; i < 20; i++) setTimeout(spawn, i * 500);
  setInterval(spawn, 2000);
})();

// ===== INIT =====
initBgMusic();
console.log('🌌 Space Memories loaded. Edit content via admin.html');
