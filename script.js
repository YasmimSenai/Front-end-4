document.addEventListener("DOMContentLoaded", () => {
  
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playSertanejoSound(type) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        if (type === 'berrante') {
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); 
            oscillator.frequency.linearRampToValueAtTime(145, audioCtx.currentTime + 0.3);
            oscillator.frequency.linearRampToValueAtTime(130, audioCtx.currentTime + 0.8);
            
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.9);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.9);
            
        } else if (type === 'chicote') {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);
            
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.09);
        } else if (type === 'clique') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(350, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        }
    }

    const hoverBtn = document.getElementById("js-hover-btn");
    
    hoverBtn.addEventListener("mouseenter", () => {
        playSertanejoSound('berrante'); 
        hoverBtn.style.backgroundColor = "var(--vermelho-berrante)";
        hoverBtn.style.color = "#fff";
        hoverBtn.style.borderColor = "#fff";
        hoverBtn.style.boxShadow = "0 0 25px var(--vermelho-berrante), 0 0 50px rgba(204, 41, 41, 0.5)";
        hoverBtn.style.transform = "scale(1.08) translateY(-3px)";
    });

    hoverBtn.addEventListener("mouseleave", () => {
       
        hoverBtn.style.backgroundColor = "var(--dourado-barretos)";
        hoverBtn.style.color = "#221208";
        hoverBtn.style.borderColor = "#fff";
        hoverBtn.style.boxShadow = "0 0.5rem 1.5rem rgba(0, 0, 0, 0.3)";
        hoverBtn.style.transform = "scale(1) translateY(0)";
    });



    const countBtn = document.getElementById("js-count-btn");
    const counterValue = document.getElementById("counter-value");
    let montariasCount = 0;

    countBtn.addEventListener("click", () => {
        montariasCount++;
        counterValue.textContent = montariasCount;
        
        playSertanejoSound('chicote'); 

       
        counterValue.classList.remove("shake-animation");
        void counterValue.offsetWidth; 
        counterValue.classList.add("shake-animation");
    });

    const openModalBtn = document.getElementById("js-open-modal");
    const modalOverlay = document.getElementById("custom-modal");

    openModalBtn.addEventListener("click", () => {
        playSertanejoSound('clique');
        modalOverlay.classList.add("active");
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });

    const thumbs = document.querySelectorAll(".gallery-thumb");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            playSertanejoSound('clique');
            lightboxImg.src = thumb.src;
            lightbox.classList.add("active");
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            playSertanejoSound('clique');
            const targetTab = button.getAttribute("data-tab");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanels.forEach(panel => panel.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });

});

