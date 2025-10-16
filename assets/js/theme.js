// Shared theme toggle script for the site
// Persists selection to localStorage ('site_theme') and applies data-theme on <html>
(function(){
  var THEME_KEY = 'site_theme'; // 'light' | 'dark' | 'system'

  // Canonical toggle markup (copied from home.html). theme.js will inject this when
  // pages include a placeholder container with id="themeToggleContainer".
  var CANONICAL_TOGGLE = '\n<button id="themeToggle" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">\n  <!-- System icon (desktop + phone / gear-like) -->\n  <svg class="icon icon-system" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n    <path d="M3 6h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n    <rect x="7" y="8" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>\n  </svg>\n\n  <!-- Dark mode (moon) -->\n  <svg class="icon icon-dark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n  </svg>\n\n  <!-- Light mode (sun) -->\n  <svg class="icon icon-light" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>\n    <path d="M12 2v1.5M12 20.5V22M4.2 4.2l1.06 1.06M18.74 18.74l1.06 1.06M2 12h1.5M20.5 12H22M4.2 19.8l1.06-1.06M18.74 5.26l1.06-1.06" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n  </svg>\n\n  <span>Theme</span>\n</button>\n';

  function storedTheme(){
    try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; }
  }

  function effectiveIsDark(){
    // priority: explicit stored setting -> html[data-theme] -> system preference
    var s = storedTheme();
    if(s === 'light') return false;
    if(s === 'dark') return true;
    var forced = document.documentElement.getAttribute('data-theme');
    if(forced === 'light') return false;
    if(forced === 'dark') return true;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateThemeColor(){
    var dark = effectiveIsDark();
    var color = null;
    try{ color = getComputedStyle(document.documentElement).getPropertyValue('--bg-start').trim(); }catch(e){}
    if(!color) color = dark ? '#061021' : '#f5f8fb';
    var meta = document.querySelector('meta[name="theme-color"]');
    if(!meta){ meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = color;
  }

  function updateToggleUI(mode){
    var btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.setAttribute('data-theme', mode);
    btn.setAttribute('title', 'Theme: ' + (mode === 'system' ? 'System' : mode.charAt(0).toUpperCase() + mode.slice(1)));
    btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    var span = btn.querySelector('span');
    if(span) span.textContent = (mode === 'system' ? 'System' : (mode === 'dark' ? 'Dark' : 'Light'));
  }

  function applyStoredTheme(){
    var t = storedTheme() || 'system';
    if(t === 'light' || t === 'dark'){
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateToggleUI(t);
    updateThemeColor();
  }

  function cycleTheme(){
    var cur = storedTheme() || 'system';
    var next = cur === 'system' ? 'dark' : (cur === 'dark' ? 'light' : 'system');
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
    applyStoredTheme();
  }

  // Inject canonical toggle markup into placeholder containers if the page doesn't already
  // include an element with id="themeToggle" (home.html has it inline so we skip injection there).
  function injectToggleIfNeeded(){
    if(document.getElementById('themeToggle')) return; // already present
    var containers = document.querySelectorAll('[data-theme-toggle-container], #themeToggleContainer');
    if(!containers || containers.length === 0) return;
    containers.forEach(function(c){
      // insert the canonical markup and mark container as hidden for accessibility until JS finishes
      c.innerHTML = CANONICAL_TOGGLE;
      c.setAttribute('aria-hidden', 'false');
    });
  }

  function init(){
    injectToggleIfNeeded();
    applyStoredTheme();
    var btn = document.getElementById('themeToggle');
    if(btn){ btn.addEventListener('click', cycleTheme); }
    if(window.matchMedia){
      try{
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){ if((storedTheme() || 'system') === 'system') updateThemeColor(); });
      }catch(e){ /* older browsers */ }
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // expose for debug
  window.__applyStoredTheme = applyStoredTheme;
})();
