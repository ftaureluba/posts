export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Only check for updates in production to avoid development reload loops
      if (process.env.NODE_ENV === 'production') {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, notify user
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};


export const isPWA = () : boolean =>{
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
};


export const canInstallPWA = () : boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

let deferredPrompt: any;

export const setupInstallPrompt = () : void => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    //custom??
    showInstallButton();

  })
}

export const showInstallPrompt = async(): Promise<void> => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome} el prompt de instalacion`);
    deferredPrompt = null;

  }
}


const showInstallButton = () : void => {

  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', showInstallPrompt);
  }

}
