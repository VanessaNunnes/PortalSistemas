document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar mobile
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggleMobile = document.querySelector('.sidebar-toggle-mobile');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    sidebarToggleMobile.addEventListener('click', function() {
        sidebar.classList.add('open');
    });
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.remove('open');
    });
    
    // Fechar sidebar ao clicar fora
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && event.target !== sidebarToggleMobile) {
            sidebar.classList.remove('open');
        }
    });
    
    // Ativar links da sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Adicionar ao main.js
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Adicionar ao main.js ou criar um novo arquivo calendar.js
document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        // Limpar calendário
        calendarGrid.innerHTML = '';
        
        // Configurar mês atual
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        // Atualizar cabeçalho
        currentMonthElement.textContent = new Intl.DateTimeFormat('pt-BR', { 
            month: 'long', 
            year: 'numeric' 
        }).format(currentDate).replace(/^./, c => c.toUpperCase());
        
        // Obter primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay();
        
        // Obter último dia do mês
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Dias da semana
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        // Adicionar cabeçalhos dos dias
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day-header');
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Espaços vazios para dias do mês anterior
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }
        
        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Verificar se é hoje
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Verificar se tem eventos (simulação)
            if (Math.random() > 0.8) {
                dayElement.classList.add('has-events');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Navegação do calendário
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Filtros de eventos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Atualizar botão ativo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar eventos
            eventCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Inicializar calendário
    renderCalendar();
});

// Adicionar ao main.js
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.news-filters .filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Atualizar botão ativo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar notícias
            newsCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});