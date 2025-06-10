export const registerServiceWorker = async() : Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker registrado exitosamente: ', registration);

      registration.addEventListener('updatefound', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {

          if (confirm('New version availabe! Reload? ')){
            window.location.reload();
          }
        }
      });

    } catch(error){
      console.error('Service worker registation failed: ', error);
    }
  }
}




export const isPWA = () : boolean =>{
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
};


export const canInstallPWA = () : boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

let deferredPrompt: any;

export const setupInstallPRompt = () : void => {
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
