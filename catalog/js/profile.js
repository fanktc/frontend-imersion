// Read active profile from localStorage and update navbar display
(function(){
  const KEY = 'activeProfile';
  function applyProfile(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return;
      const data = JSON.parse(raw);
      if(!data) return;
      const name = data.name || '';
      const basename = data.imageBasename || '';
      // update name in navbar
      const nameEl = document.querySelector('.kids-link');
      if(nameEl && name) nameEl.textContent = name;
      // update profile image, resolve path relative to catalog page
      const imgEl = document.querySelector('.profile-icon');
      if(imgEl && basename){
        imgEl.setAttribute('src', '../assets/' + basename);
      }
    }catch(e){
      // ignore
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyProfile);
  else applyProfile();
})();
