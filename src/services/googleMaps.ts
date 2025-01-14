import toast from 'react-hot-toast';

class GoogleMapsService {
  private static instance: GoogleMapsService;
  private loadingPromise: Promise<void> | null = null;
  
  private constructor() {}

  static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService();
    }
    return GoogleMapsService.instance;
  }

  loadGoogleMaps(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      if (window.google?.maps) {
        resolve();
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        toast.error('Google Maps API key is missing');
        reject(new Error('Google Maps API key is missing'));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google?.maps) {
          resolve();
        } else {
          reject(new Error('Google Maps failed to load'));
        }
      };

      script.onerror = () => {
        toast.error('Failed to load Google Maps');
        reject(new Error('Failed to load Google Maps script'));
      };

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }
}

export const googleMapsService = GoogleMapsService.getInstance();