/* LiteTube core interactions */

// Simple persistent store for likes and saves using localStorage
const store = {
  get(key, def){ try { return JSON.parse(localStorage.getItem(key)) ?? def } catch { return def } },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
};

function navigateToWatch(id){
  location.href = `watch.html?v=${encodeURIComponent(id)}`;
}

function initSearch(headerRoot=document){
  const form = headerRoot.getElementById('searchForm');
  const input = headerRoot.getElementById('searchInput');
  if(!form || !input) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if(location.pathname.endsWith('watch.html')){
      // navigate to home with search query
      location.href = `index.html?q=${encodeURIComponent(q)}`;
    } else {
      renderHomeFeed(q);
    }
  });
}

/* HOME PAGE */
function initHomePage(){
  initSearch(document);
  const url = new URL(location.href);
  const q = (url.searchParams.get('q')||'').toLowerCase();
  if(q) document.getElementById('searchInput').value = q;
  renderHomeFeed(q);
}

function renderHomeFeed(query=''){
  const feed = document.getElementById('feed');
  const tpl = document.getElementById('cardTemplate');
  feed.innerHTML='';
  const videos = MOCK_VIDEOS.filter(v => !query ||
    v.title.toLowerCase().includes(query) ||
    v.channel.toLowerCase().includes(query)
  );
  videos.forEach(v => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.thumb').src = v.thumbUrl;
    node.querySelector('.duration').textContent = v.duration;
    node.querySelector('.title').textContent = v.title;
    node.querySelector('.channel').textContent = v.channel;
    node.querySelector('.views').textContent = formatViews(v.views);
    node.querySelector('.age').textContent = timeSince(v.publishedAt);

    const open = ()=> navigateToWatch(v.id);
    node.addEventListener('click', open);
    node.addEventListener('keypress', (e)=>{ if(e.key==='Enter') open(); });

    feed.appendChild(node);
  });

  if(videos.length===0){
    const empty = document.createElement('div');
    empty.style.color = '#9aa0a6';
    empty.textContent = 'No results. Try a different search.';
    feed.appendChild(empty);
  }
}

/* WATCH PAGE */
function initWatchPage(){
  initSearch(document);
  const url = new URL(location.href);
  const id = url.searchParams.get('v');
  const v = getVideoById(id) || MOCK_VIDEOS[0];

  const player = document.getElementById('videoPlayer');
  player.src = v.videoUrl;

  document.getElementById('videoTitle').textContent = v.title;
  document.getElementById('videoChannel').textContent = v.channel;
  document.getElementById('videoViews').textContent = formatViews(v.views);
  document.getElementById('videoAge').textContent = timeSince(v.publishedAt);
  document.getElementById('videoDescription').textContent = v.description;

  // Likes
  const likes = store.get('likes', {});
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  likeCount.textContent = likes[v.id]?.count ?? Math.floor(v.views*0.01) % 1000; // seed-like
  const liked = !!likes[v.id]?.liked;
  updateLikeBtn(likeBtn, liked);
  likeBtn.addEventListener('click', ()=>{
    const ls = store.get('likes', {});
    const cur = ls[v.id] ?? { count: Number(likeCount.textContent)||0, liked:false };
    if(cur.liked){ cur.count = Math.max(0, cur.count-1); cur.liked=false; }
    else { cur.count = cur.count+1; cur.liked=true; }
    ls[v.id] = cur; store.set('likes', ls);
    likeCount.textContent = cur.count;
    updateLikeBtn(likeBtn, cur.liked);
  });

  // Save
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.addEventListener('click', ()=>{
    const saved = store.get('saved', []);
    if(!saved.includes(v.id)) saved.push(v.id);
    store.set('saved', saved);
    saveBtn.textContent = '✅ Saved';
    setTimeout(()=> saveBtn.textContent='💾 Save', 1500);
  });

  // Share
  const shareBtn = document.getElementById('shareBtn');
  shareBtn.addEventListener('click', async ()=>{
    const link = location.href;
    try {
      if(navigator.clipboard){
        await navigator.clipboard.writeText(link);
        shareBtn.textContent = '✅ Copied';
        setTimeout(()=> shareBtn.textContent='🔗 Share', 1500);
      } else {
        prompt('Copy this link', link);
      }
    } catch {
      prompt('Copy this link', link);
    }
  });

  // Suggestions
  renderSuggestions(v.id);
}

function updateLikeBtn(btn, active){
  btn.style.background = active ? '#263238' : 'var(--surf)';
}

function renderSuggestions(currentId){
  const root = document.getElementById('suggestions');
  const tpl = document.getElementById('suggestionTemplate');
  root.innerHTML='';
  const list = getSuggestions(currentId);
  list.forEach(v => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.s-thumb').src = v.thumbUrl;
    node.querySelector('.s-title').textContent = v.title;
    node.querySelector('.s-channel').textContent = v.channel;
    node.querySelector('.s-views').textContent = formatViews(v.views);
    const open = ()=> navigateToWatch(v.id);
    node.addEventListener('click', open);
    node.addEventListener('keypress', (e)=>{ if(e.key==='Enter') open(); });
    root.appendChild(node);
  });
}
