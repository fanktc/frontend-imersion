/* Theme toggle: dark / light
   - Persists choice in localStorage
   - Honors `prefers-color-scheme` on first load
   - Uses `data-theme="light"` on <body> to apply light variables
*/
(function(){
  const KEY = 'site-theme';
  const root = document.documentElement;
  const body = document.body;

  function systemPrefersDark(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getStored(){
    try{ return localStorage.getItem(KEY); }catch(e){return null}
  }

  function store(v){
    try{ localStorage.setItem(KEY, v); }catch(e){}
  }

  function apply(theme){
    if(theme === 'light'){
      body.setAttribute('data-theme','light');
    } else {
      body.removeAttribute('data-theme');
    }
    const btn = document.getElementById('theme-toggle');
    if(btn){
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.textContent = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
    }
  }

  function init(){
    let theme = getStored();
    if(!theme){ theme = systemPrefersDark() ? 'dark' : 'light'; }
    apply(theme);

    document.addEventListener('click', function(e){
      const t = e.target;
      if(!t) return;
      if(t.id === 'theme-toggle'){
        const currentIsLight = body.getAttribute('data-theme') === 'light';
        const next = currentIsLight ? 'dark' : 'light';
        apply(next);
        store(next);
      }
    }, {passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
