/* 김꾼 v7 화면 동작 (시안 v7에서 옮김). 데이터는 #kk-data */

(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // 아래 탭: 지금 화면 표시
  document.querySelectorAll('.tabbar a').forEach(a => { const h = a.getAttribute('href'); a.classList.toggle('on', (h === '/' && location.pathname === '/' && !location.hash) || (h === '/content' && location.pathname.startsWith('/content'))); });
  // 위 메뉴 유리 효과
  const top = document.querySelector('.top');
  const phone = document.querySelector('.phone');
  let tick = false;
  const onScroll = () => { tick = false; top.classList.toggle('glass', scrollY > 8); crewTilt(); };
  addEventListener('scroll', () => { if (!tick){ tick = true; requestAnimationFrame(onScroll); } }, {passive: true});

  // 더크루 휴대폰: 스크롤에 따라 기울기가 펴진다
  function crewTilt(){
    if (reduce || !phone) return;
    const r = phone.getBoundingClientRect(), vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    phone.style.transform = `rotate(${(-12 + p * 14).toFixed(2)}deg) translateY(${((0.5 - p) * 40).toFixed(1)}px)`;
  }
  onScroll();

  // 스크롤하면 떠오르기 (첫 화면에 이미 보이는 것은 건드리지 않는다)
  if (!reduce && 'IntersectionObserver' in window){
    const sel = 'main.kk-home section .head, .post, .week-foot, .topic, .crew .wrap > div:first-child > *, .crew-stage .kk, .crew-stage .crew-pal, .stat, .voice, .proof .kk-thumb, .ai-row > *, .duo, .about .facts li, .end h2, .end .btns, .say, .check, .today, .chart';
    const els = [...document.querySelectorAll(sel)].filter(el => el.getBoundingClientRect().top > innerHeight);
    const ro = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); ro.unobserve(en.target); } }), {threshold: .15, rootMargin: '0px 0px -6% 0px'});
    els.forEach(el => {
      el.classList.add('rv'); if (el.matches('img.kk')) el.classList.add('kk');
      const sib = [...el.parentElement.children].filter(x => x.classList.contains('rv'));
      el.style.transitionDelay = (Math.min(sib.indexOf(el), 6) * 70) + 'ms';
      ro.observe(el);
    });
  }
  if (document.querySelector('.hero')) {
  // 손 흔드는 김꾼 (그림 여러 장을 오가며 재생)
  const W = ["/v7/wave/00.png", "/v7/wave/01.png", "/v7/wave/02.png", "/v7/wave/03.png", "/v7/wave/04.png", "/v7/wave/05.png", "/v7/wave/06.png", "/v7/wave/07.png", "/v7/wave/08.png", "/v7/wave/09.png", "/v7/wave/10.png", "/v7/wave/11.png", "/v7/wave/12.png", "/v7/wave/13.png", "/v7/wave/14.png", "/v7/wave/15.png", "/v7/wave/16.png", "/v7/wave/17.png", "/v7/wave/18.png", "/v7/wave/19.png", "/v7/wave/20.png", "/v7/wave/21.png", "/v7/wave/22.png", "/v7/wave/23.png", "/v7/wave/24.png", "/v7/wave/25.png", "/v7/wave/26.png", "/v7/wave/27.png", "/v7/wave/28.png", "/v7/wave/29.png"];
  const waver = document.getElementById('waver');
  if (!reduce && W.length > 1){
    W.forEach(s => { const i = new Image(); i.src = s; });
    let f = 0, dir = 1;
    setInterval(() => { f += dir; if (f >= W.length - 1 || f <= 0) dir *= -1; waver.src = W[f]; }, 110);
  }

  // 고민 고르기 — 한글을 실제 자판처럼 자모 단계로 찍는다 (ㅈ→지→직→지ㄱ… 대신 ㅈ→지→직)
  const chips = [...document.querySelectorAll('.chip')];
  const typed = document.getElementById('typed');
  let idx = 0, current = chips[0], timer;
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const V_BASE = {9:8,10:8,11:8,14:13,15:13,16:13,19:18};          // 겹모음 → 앞 모음
  const F_BASE = {3:1,5:4,6:4,9:8,10:8,11:8,12:8,13:8,14:8,15:8,18:17}; // 겹받침 → 앞 받침
  const syl = (l, v, f) => String.fromCharCode(0xAC00 + l * 588 + v * 28 + f);
  function keys(s){
    const out = []; let done = '';
    for (const ch of s){
      const c = ch.charCodeAt(0) - 0xAC00;
      if (c >= 0 && c < 11172){
        const l = Math.floor(c / 588), v = Math.floor(c % 588 / 28), f = c % 28;
        out.push(done + CHO[l]);
        if (V_BASE[v] != null) out.push(done + syl(l, V_BASE[v], 0));
        out.push(done + syl(l, v, 0));
        if (f){ if (F_BASE[f]) out.push(done + syl(l, v, F_BASE[f])); out.push(done + ch); }
      } else out.push(done + ch);
      done += ch;
    }
    return out;
  }
  const gap = prev => (prev && prev.slice(-1) === ' ' ? 26 : 14) + Math.random() * 10;
  function typeKeys(text, onStep, done){
    const ks = keys(text); let i = 0;
    (function step(){ typed.textContent = ks[i++]; onStep && onStep(); if (i < ks.length) setTimeout(step, gap(ks[i - 1])); else done && done(); })();
  }
  function retype(next, done){
    if (reduce){ typed.textContent = next; return done && done(); }
    const cur = Array.from(typed.textContent);
    (function del(){ if (cur.length){ cur.pop(); typed.textContent = cur.join(''); setTimeout(del, 14); } else typeKeys(next, null, done); })();
  }
  function cycle(){ timer = setTimeout(() => { idx = (idx + 1) % chips.length; current = chips[idx]; retype(current.textContent, cycle); }, 3600); }

  // 줌 인트로: 고민 상자가 크게 시작 → 타자 → 제자리로 줄어들고 나머지가 떠오름
  const hero = document.querySelector('.hero'), qb = document.getElementById('ask');
  const mobile = matchMedia('(max-width:620px)').matches;
  function setT(s, tx, d, ease){ qb.style.transition = d ? `transform ${d}ms ${ease || 'cubic-bezier(.16,1,.3,1)'}` : 'none'; qb.style.transform = `translateX(${tx}px) scale(${s})`; }
  function heroIntro(){
    if (reduce){ hero.classList.remove('is-intro'); cycle(); return; }
    hero.classList.add('is-intro');
    const S0 = mobile ? 1.55 : 2.2, vw = document.documentElement.clientWidth;
    setT(1, 0, 0); const r = qb.getBoundingClientRect();
    let tx = Math.max(16, vw * .05) - r.left; setT(S0, tx, 0);
    const caret = hero.querySelector('.caret'); typed.textContent = '';
    setTimeout(() => typeKeys(current.textContent, () => {
      const cr = caret.getBoundingClientRect(), over = cr.right + 30 - vw * .9;
      if (over > 0){ tx -= over; setT(S0, tx, 180); }
    }, () => requestAnimationFrame(() => {
      setT(1, 0, 900, 'cubic-bezier(.45,0,.2,1)');
      setTimeout(() => { hero.classList.remove('is-intro'); hero.classList.add('is-out'); cycle(); }, 820);
    })), 280);
  }

  // 시작 화면 (세션당 한 번, 눌러서 건너뛰기)
  const intro = document.getElementById('intro');
  let seen = false; try { seen = sessionStorage.getItem('kkIntro') === '1'; } catch(e){}
  const deep = location.hash && location.hash !== '#home';
  function startHero(){ if (!deep) heroIntro(); else cycle(); }
  if (!reduce && !seen && !deep){
    try { sessionStorage.setItem('kkIntro', '1'); } catch(e){}
    intro.hidden = false; hero.classList.add('is-intro');
    let ended = false;
    const end = () => { if (ended) return; ended = true; intro.classList.add('done'); setTimeout(() => { intro.hidden = true; }, 600); startHero(); };
    intro.addEventListener('click', end); setTimeout(end, 2100);
  } else startHero();

  function openTopic(topic){
    document.querySelectorAll('.topic').forEach(el => el.classList.toggle('on', el.id === 't-' + topic));
    document.getElementById('topics').scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
  }
  chips.forEach(c => c.addEventListener('click', () => {
    clearTimeout(timer);
    chips.forEach(x => x.setAttribute('aria-pressed', x === c ? 'true' : 'false'));
    current = c; typed.textContent = c.textContent; openTopic(c.dataset.topic);
  }));
  document.getElementById('ask').addEventListener('submit', e => { e.preventDefault(); openTopic(current.dataset.topic); });

  // 더크루 화면 넘김
  const shots = [...document.querySelectorAll('#scr img')];
  if (!reduce){ let s = 0; setInterval(() => { shots[s].classList.remove('on'); s = (s + 1) % shots.length; shots[s].classList.add('on'); }, 2400); }

  }
  // ───── 서고 · 프롬프트 ─────
  const D = JSON.parse((document.getElementById('kk-data')||{}).textContent||'{"arts":[],"prompts":[]}');
  const TOP = {people:'직원·알바', money:'매출', mkt:'손님 모으기', ai:'AI 쓰는 법'};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const LOCAL = {};
  const artHref = a => '/content/' + a.slug;
  const ext = a => '';
  const badges = a => '<div class="badges">' + a.topics.map(t => `<span class="badge">${TOP[t]}</span>`).join('') + (a.prompts ? `<span class="badge p">AI 질문 ${a.prompts}개</span>` : '') + '</div>';
  const acard = a => `<a class="acard${a.act === 2 ? ' new' : ''}" href="${artHref(a)}"${ext(a)}><div class="no">${esc(a.no)}</div><h3>${esc(a.t)}</h3>${badges(a)}</a>`;
  document.querySelectorAll('.cA,#cntA').forEach(e => e.textContent = D.arts.length);
  document.querySelectorAll('.cP,#cntP,#cntP2').forEach(e => e.textContent = D.prompts.length);
  if (D.arts.length) document.querySelectorAll('[data-kc]').forEach(e => e.textContent = D.arts.filter(a => a.kind === e.dataset.kc).length);
  let lk = null; // 콘텐츠 칸(생각·정보·자료) 거르기 — 전체 글 목록을 같이 씀

  // 프롬프트 카드
  const pcard = (p, i) => `<article class="pcard"><div class="src"><b>${esc(p.no)}</b> · ${esc(p.art)}</div><h3>${esc(p.h)}</h3><pre id="pc${i}">${esc(p.body)}</pre><div class="acts"><button type="button" class="copy" data-copy="pc${i}">복사</button><button type="button" class="ghost-btn" data-more>펼치기</button><a class="to" href="/content/${p.slug}">쓰는 법 →</a></div></article>`;
  const lpTopic = document.getElementById('lpTopic');
  let lfil = null;
  if (lpTopic) {
  // 고민별 줄
  const newest = D.arts.filter(a => a.act === 2);
  let html = `<div class="row-h"><h2>새로 나온 글<small>${newest.length}</small></h2></div><div class="rail2">${newest.map(acard).join('')}</div>`;
  for (const k of Object.keys(TOP)){
    const arr = D.arts.filter(a => a.topics.includes(k));
    html += `<div class="row-h"><h2>${TOP[k]}<small>${arr.length}</small></h2><button type="button" data-goall="${k}">전체 보기 →</button></div><div class="rail2">${arr.map(acard).join('')}</div>`;
  }
  document.getElementById('lpTopic').innerHTML = html;

  // 전체 글: 찾기 + 칩
  let lf = 'all';
  lfil = document.getElementById('lfil'), lq = document.getElementById('lq');
  const LF = [['all','전체'],['prompt','AI 질문 있는 글'],...Object.entries(TOP)];
  lfil.innerHTML = LF.map(([k,v]) => `<button type="button" data-f="${k}" aria-pressed="${k === 'all'}">${v}</button>`).join('');
  function renderList(){
    const q = lq.value.trim();
    const arr = D.arts.filter(a => (!lk || a.kind === lk) && (lf === 'all' || (lf === 'prompt' ? a.prompts > 0 : a.topics.includes(lf))) && (!q || a.t.includes(q)));
    document.getElementById('lcount').textContent = arr.length + '개의 글';
    document.getElementById('llist').innerHTML = arr.length ? arr.map(a => `<li><a href="${artHref(a)}"${ext(a)}><span class="sq${a.act === 2 ? ' n2' : ''}">${esc(a.no.replace('No.',''))}</span><div><h3>${esc(a.t)}</h3>${badges(a)}</div></a></li>`).join('') : '<li class="empty">맞는 글이 없어요. 다른 말로 찾아보세요.</li>';
  }
  lfil.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lf = b.dataset.f; lfil.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); renderList(); });
  lq.addEventListener('input', renderList); renderList();

  let pf = 'all';
  const pfil = document.getElementById('pfil');
  const PS = [['all','전체'], ...[...new Set(D.prompts.map(p => p.slug))].map(s => [s, D.prompts.find(p => p.slug === s).short])];
  pfil.innerHTML = PS.map(([k,v]) => `<button type="button" data-f="${k}" aria-pressed="${k === 'all'}">${esc(v)}</button>`).join('');
  function renderP(){ document.getElementById('plist').innerHTML = D.prompts.map((p, i) => [p, i]).filter(([p]) => pf === 'all' || p.slug === pf).map(([p, i]) => pcard(p, i)).join(''); }
  pfil.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; pf = b.dataset.f; pfil.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); renderP(); });
  renderP();

  }
  const teaser = document.getElementById('teaser');
  if (teaser){
    const seenS = new Set(), T = [];
    D.prompts.forEach((p, i) => { if (!seenS.has(p.slug) && T.length < 3){ seenS.add(p.slug); T.push([p, i]); } });
    teaser.innerHTML = T.map(([p, i]) => pcard(p, i)).join('').replace(/id="pc/g, 'id="tc').replace(/data-copy="pc/g, 'data-copy="tc');
  }
  // 이번 주 글: 최신 2막 글 3편
  const wp = document.getElementById('weekPosts');
  if (wp) wp.innerHTML = D.arts.filter(a => a.act === 2).slice(0, 3).map(a => `<a class="post" href="/content/${a.slug}"><span class="no">${esc(a.no)}</span><div><h3>${esc(a.t)}</h3><div class="meta">${a.topics.map(t => TOP[t]).join(' · ')}</div></div><span class="arr" aria-hidden="true">→</span></a>`).join('');
  // 탭 전환
  const ltabs = [...document.querySelectorAll('[data-lt]')];
  function openTab(k){
    if (k === 'prompt') k = 'prompts';
    ltabs.forEach(b => b.setAttribute('aria-selected', b.dataset.lt === k));
    const kindTab = k === 'think' || k === 'info';
    if (k === 'all'){ lk = null; } else if (kindTab){ lk = k; }
    const panel = kindTab ? 'all' : k;
    document.querySelectorAll('[data-lp]').forEach(p => p.hidden = p.dataset.lp !== panel);
    if (lfil && kindTab){ const fa = lfil.querySelector('[data-f="all"]'); if (fa) fa.click(); }
  }
  ltabs.forEach(b => b.addEventListener('click', () => openTab(b.dataset.lt)));
  if (lfil){
    const qs = new URLSearchParams(location.search);
    if (qs.get('tab')) openTab(qs.get('tab'));
    if (qs.get('k')) openTab(qs.get('k'));
    if (qs.get('f')){ openTab('all'); const fb = lfil.querySelector(`[data-f="${qs.get('f')}"]`); if (fb) fb.click(); }
  }
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-goall]'); if (g && lfil){ openTab('all'); lk = null; lfil.querySelector(`[data-f="${g.dataset.goall}"]`).click(); window.scrollTo(0, 0); return; }
    const lt = e.target.closest('[data-ltab]'); if (lt){ setTimeout(() => openTab(lt.dataset.ltab), 0); }
    
    const m = e.target.closest('[data-more]'); if (m){ const c = m.closest('.pcard'); c.classList.toggle('open'); m.textContent = c.classList.contains('open') ? '접기' : '펼치기'; return; }
    const j = e.target.closest('[data-jump]'); if (j){ e.preventDefault(); document.querySelector(j.getAttribute('href')).scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'}); return; }
    const c = e.target.closest('[data-copy]'); if (c){
      const pre = c.dataset.copy ? document.getElementById(c.dataset.copy) : c.closest('.pbox').querySelector('pre'); if (!pre) return;
      const ok = () => { c.textContent = '복사됨 ✓'; c.classList.add('done'); setTimeout(() => { c.textContent = '복사'; c.classList.remove('done'); }, 1800); };
      const sel = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); c.textContent = '선택됨 · 길게 눌러 복사'; };
      try { navigator.clipboard.writeText(pre.innerText).then(ok, sel); } catch(err){ sel(); }
    }
  });

  // 판매가 계산기
  const cb = document.getElementById('ocalcBox');
  if (cb){
    const v = k => parseFloat(cb.querySelector(`[data-c="${k}"]`).value) || 0;
    const won = n => Math.round(n).toLocaleString('ko-KR') + '원';
    const calc = () => {
      const per = Math.max(1, v('per')), fee = Math.min(90, v('fee')) / 100;
      const base = v('food') + v('pack') + v('ship') / per + v('gain');
      const price = Math.ceil(base / (1 - fee) / 100) * 100;
      document.getElementById('calcOut').textContent = won(price);
      document.getElementById('calcBrk').textContent = `재료 ${won(v('food'))} + 포장 ${won(v('pack'))} + 택배 나눠서 ${won(v('ship')/per)} + 이익 ${won(v('gain'))} → 수수료 ${Math.round(fee*100)}% 떼고도 남게 (100원 단위 올림)`;
    };
    cb.addEventListener('input', calc); calc();
  }
  // 고민별 칸에 '이 고민 글 전체' 링크
  document.querySelectorAll('.topic').forEach(t => {
    const k = t.id.replace('t-', ''), n = D.arts.filter(a => a.topics.includes(k)).length;
    t.querySelector('.body').insertAdjacentHTML('beforeend', `<a class="all" href="/content?f=${k}">${TOP[k]} 글 ${n}편 전체 →</a>`);
  });

  // 숫자 올라가기 (처음 화면에는 최종 숫자가 그대로 보인다)
  if (!reduce && 'IntersectionObserver' in window){
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; io.unobserve(en.target);
      const el = en.target, to = parseFloat(el.dataset.to), dec = +el.dataset.dec, unit = el.querySelector('small').outerHTML;
      const t0 = performance.now(), dur = 1200;
      (function step(now){
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4), v = to * e;
        let s = v.toFixed(dec); if (el.dataset.comma) s = Math.round(v).toLocaleString('ko-KR');
        el.innerHTML = s + unit; if (p < 1) requestAnimationFrame(step);
      })(t0);
    }), {threshold: .4});
    document.querySelectorAll('.num[data-to]').forEach(n => {
      if (n.getBoundingClientRect().top > innerHeight){ const u = n.querySelector('small').outerHTML; n.innerHTML = (n.dataset.comma ? '0' : (0).toFixed(+n.dataset.dec)) + u; }
      io.observe(n);
    });
  }
})();

// 김꾼 혼자서: 카드 등장·도장·맡은 일 숫자
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var jobs = [].slice.call(document.querySelectorAll('.job'));
  var tally = document.getElementById('tally'), n = document.getElementById('jobN');
  var twist = document.getElementById('twist');
  if (!n || !twist) return;
  function setCount(){
    var c = jobs.filter(function(j){return j.classList.contains('in')}).length;
    if (String(c) !== n.textContent){ n.textContent = c; tally.classList.remove('bump'); void tally.offsetWidth; tally.classList.add('bump'); }
  }
  if (reduce || !('IntersectionObserver' in window)){ n.textContent = jobs.length; return; }
  document.documentElement.classList.add('solo-anim');
  
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      if (e.target.classList.contains('job')) setTimeout(setCount, 380);
    });
  }, {threshold:.35, rootMargin:'0px 0px -8% 0px'});
  jobs.forEach(function(j){ io.observe(j); });
  io.observe(twist);
})();

// AWC 카드: 화면에 들어오면 전기 효과 시작
(function(){var c=document.querySelector('.awc-card');if(!c)return;if(!('IntersectionObserver' in window)){c.classList.add('in');return;}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){c.classList.add('in');o.disconnect();}})},{threshold:.3});o.observe(c);})();


/* 콘텐츠 펼침 메뉴 (2026-11-06 개편 1차): 위 메뉴·아래 탭의 [data-mm] 단추가 같은 판을 연다 */
(() => {
  const btns = [...document.querySelectorAll('[data-mm]')];
  if (!btns.length) return;
  const panel = document.getElementById(btns[0].dataset.mm);
  const dim = document.querySelector('.mm-dim');
  if (!panel) return;
  const set = (open) => {
    btns.forEach(b => b.setAttribute('aria-expanded', open ? 'true' : 'false'));
    document.querySelector('.top')?.classList.toggle('mm-open', open);
    if (open){ panel.hidden = false; dim.hidden = false; panel.classList.remove('in'); void panel.offsetWidth; panel.classList.add('in'); }
    else { panel.hidden = true; dim.hidden = true; panel.classList.remove('in'); }
  };
  btns.forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); set(panel.hidden); }));
  dim.addEventListener('click', () => set(false));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden){ set(false); btns[0].focus(); } });
  if (location.pathname.startsWith('/content')) document.querySelectorAll('.tabbar [data-mm]').forEach(b => b.classList.add('on'));
})();


/* 손맛 효과 예시 (2026-11-06): 글 속 굵은 글씨에 손 밑줄, 화면에 들어오면 그어짐 */
(() => {
  document.querySelectorAll('.art .txt strong').forEach(b => b.classList.add('hand-u'));
  const first = document.querySelector('#lpTopic .acard.new');
  if (first && !first.querySelector('.sticker')) first.insertAdjacentHTML('beforeend', '<span class="sticker">새 글</span>');
  const els = document.querySelectorAll('.hand-u,.hand-note,.hand-o');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('on')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } }), {threshold: .6});
  els.forEach(e => io.observe(e));
})();
