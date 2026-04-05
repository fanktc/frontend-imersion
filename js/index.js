console.log("index.js loaded");

// Store selected profile to localStorage so catalog page can show active profile
(function(){
	const KEY = 'activeProfile';
	document.addEventListener('click', function(e){
		const a = e.target.closest && e.target.closest('a.profile');
		if(!a) return;
		const figure = a.querySelector && a.querySelector('figure');
		if(!figure) return;
		const img = figure.querySelector('img');
		const caption = figure.querySelector('figcaption');
		const name = caption ? caption.textContent.trim() : '';
		const src = img ? img.getAttribute('src') : '';
		// store basename of image so catalog page can resolve path
		const parts = src ? src.split('/') : [];
		const basename = parts.length ? parts[parts.length-1] : '';
		const payload = { name: name, imageBasename: basename };
		try{ localStorage.setItem(KEY, JSON.stringify(payload)); }catch(e){}
		// allow navigation to proceed
	}, {capture:true});
})();