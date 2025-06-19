document.addEventListener('DOMContentLoaded', function() {
    const highContrastBtn = document.getElementById('high-contrast');
    const increaseFontBtn = document.getElementById('increase-font');
    const acessibilidadeCSS = document.getElementById('acessibilidade-css');
    
    // Alto contraste
    highContrastBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        
        if (document.body.classList.contains('high-contrast')) {
            acessibilidadeCSS.removeAttribute('disabled');
        } else {
            acessibilidadeCSS.setAttribute('disabled', 'true');
        }
    });
    
    // Aumentar fonte
    increaseFontBtn.addEventListener('click', function() {
        document.body.classList.toggle('large-text');
    });
});