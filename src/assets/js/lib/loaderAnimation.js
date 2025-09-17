export default function loaderAnimation() {
    const progressBar = document.querySelector('.preloader__footer-bar__wrapper-loadbar');
    const percentElement = document.querySelector('.preloader__footer-percent');
    const percentScreen = document.querySelector('.preloader');

    if (!progressBar || !percentElement || !percentScreen) {
        console.error('Элементы для анимации не найдены!');
        return;
    }
    
    let progress = 0;
    const targetProgress = 100;
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    const increment = targetProgress / steps;
    
    const animateProgress = () => {
        const timer = setInterval(() => {
            progress += increment;
            
            if (progress >= targetProgress) {
                progress = 100;
                clearInterval(timer);
                setTimeout(() => {
                    console.log('Загрузка завершена!');
                    hidePreloaderScreen();
                }, 500);
            }
            
            progressBar.style.width = progress + '%';
            percentElement.textContent = Math.round(progress) + '%';
            
        }, interval);
    };

    function hidePreloaderScreen() {
        percentScreen.style.transition = 'top 0.8s ease-in-out';
        percentScreen.style.top = '-100vh';
        
        setTimeout(() => {
            percentScreen.style.display = 'none';
            
            document.body.style.overflow = 'auto';
        }, 1000);
    }
    
    document.body.style.overflow = 'hidden';
    
    setTimeout(animateProgress, 300);
}

