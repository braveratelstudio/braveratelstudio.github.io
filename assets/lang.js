// One page, four languages: ?lang= wins, then the browser language, else English.
(function(){
  var langs=['ko','en','es','ja'];
  var q=new URLSearchParams(location.search).get('lang');
  var nav=(navigator.languages&&navigator.languages[0]||navigator.language||'en').slice(0,2).toLowerCase();
  var pick=langs.indexOf(q)>=0?q:(langs.indexOf(nav)>=0?nav:'en');
  function show(l){
    document.documentElement.lang=l;
    document.querySelectorAll('[data-lang]').forEach(function(e){e.classList.toggle('on',e.getAttribute('data-lang')===l)});
    document.querySelectorAll('.langs button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.set===l)});
    var t=document.querySelector('[data-lang="'+l+'"] [data-title]');if(t)document.title=t.getAttribute('data-title');
  }
  document.addEventListener('click',function(e){var b=e.target.closest('.langs button');if(!b)return;show(b.dataset.set);var u=new URL(location);u.searchParams.set('lang',b.dataset.set);history.replaceState(null,'',u)});
  show(pick);
})();
