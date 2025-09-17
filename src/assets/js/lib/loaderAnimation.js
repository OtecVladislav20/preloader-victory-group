export default function loaderAnimation() {
    const progressBar = document.querySelector('.loadbar');
        const percentElement = document.querySelector('.preloader__percent');

        if (!progressBar || !percentElement) {
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
                    }, 500);
                }
                
                progressBar.style.width = progress + '%';
                percentElement.textContent = Math.round(progress) + '%';
                
            }, interval);
        };
        
        setTimeout(animateProgress, 300);
}
