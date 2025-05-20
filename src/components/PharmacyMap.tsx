'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/patience.module.css';

// Google Maps-ийн төрлийн тодорхойлолт
declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }
}

// PharmacyMap компонентын пропсууд
interface PharmacyMapProps {
  apiKey: string; // Google Maps API түлхүүр
  searchType?: string; // Хайлтын төрөл (жишээ: pharmacy, pharmacy,drugstore)
}

export default function PharmacyMap({ apiKey, searchType = 'pharmacy' }: PharmacyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Google Maps-ийг эхлүүлэх функц
  const initMap = async () => {
    console.log('initMap эхэллээ'); // Дибаг
    if (!mapRef.current) {
      console.error('mapRef.current байхгүй байна');
      return;
    }

    let center = { lat: -33.8688, lng: 151.2093 }; // Анхны байршил
    let userLocation: google.maps.LatLngLiteral | null = null;

    // Хэрэглэгчийн байршлыг авах
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        center = userLocation; // Газрын зургийг хэрэглэгчийн байршилд төвлөрүүлэх
        console.log('Хэрэглэгчийн байршил:', userLocation); // Дибаг
      } catch (error) {
        console.error('Geolocation алдаа, анхны байршлыг ашиглана:', error);
      }
    } else {
      console.warn('Geolocation дэмжигдээгүй байна');
    }

    // Google Maps-ийн номын сангуудыг ачаалах
    console.log('Google Maps номын сангуудыг ачаалж байна'); // Дибаг
    try {
      const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
      const { PlacesService, PlacesServiceStatus } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

      // Газрын зургийг эхлүүлэх
      console.log('Газрын зургийг эхлүүлж байна'); // Дибаг
      const map = new Map(mapRef.current, {
        zoom: 12,
        center: center,
        mapId: 'DEMO_MAP_ID', // Заавал биш, хэрэв загварын ID байхгүй бол хас
      });

      // Хэрэглэгчийн байршлын маркер нэмэх
      if (userLocation) {
        const userMarkerContent = document.createElement('div');
        userMarkerContent.style.width = '40px';
        userMarkerContent.style.height = '40px';
        userMarkerContent.style.backgroundImage = 'url(https://maps.google.com/mapfiles/ms/icons/blue-dot.png)';
        userMarkerContent.style.backgroundSize = 'contain';
        userMarkerContent.style.backgroundRepeat = 'no-repeat';

        const userMarker = new AdvancedMarkerElement({
          map: map,
          position: userLocation,
          title: 'Таны байршил',
          content: userMarkerContent,
        });

        const userInfoWindow = new google.maps.InfoWindow({
          content: '<h3>Таны байршил</h3><p>Энд таны одоогийн байршил байна.</p>',
        });

        userMarker.addListener('click', () => {
          userInfoWindow.open(map, userMarker);
        });
        console.log('Хэрэглэгчийн маркер нэмэгдлээ'); // Дибаг
      }

      // Places Service ашиглан хайлт хийх
      const service = new PlacesService(map);
      service.nearbySearch(
        {
          location: center,
          radius: 5000, // 5км радиус
          keyword: searchType.includes(',') ? searchType.replace(',', ' ') : searchType,
        },
        (results, status) => {
          console.log('nearbySearch дуудлага:', { status, results }); // Дибаг
          if (status === PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              const place = results[i];
              if (place.geometry && place.geometry.location) {
                const marker = new AdvancedMarkerElement({
                  map: map,
                  position: place.geometry.location,
                  title: place.name,
                });
                const infoWindow = new google.maps.InfoWindow({
                  content: `<h3>${place.name || 'Газар'}</h3><p>${place.vicinity || 'Хаяг байхгүй'}</p>`,
                });
                marker.addListener('click', () => {
                  infoWindow.open(map, marker);
                });
              } else {
                console.warn(`Газрын байршлын мэдээлэл байхгүй: ${place.name}`);
              }
            }
          } else {
            console.error('Хайлт амжилтгүй:', status);
          }
        }
      );
    } catch (error) {
      console.error('Google Maps номын сан ачааллахад алдаа гарлаа:', error);
    }
  };

  // Google Maps скрипт ачаалах ба initMap дуудах
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    console.log('useEffect эхэллээ, apiKey:', apiKey); // Дибаг
    if (window.google && window.google.maps) {
      console.log('Google Maps аль хэдийн ачаалагдсан'); // Дибаг
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,places,marker&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Google Maps скрипт ачааллахад алдаа гарлаа');
      };
      script.onload = () => {
        console.log('Google Maps скрипт амжилттай ачаалагдлаа'); // Дибаг
      };
      window.initMap = initMap;
      document.head.appendChild(script);
      console.log('Google Maps скриптийг ачаалж байна'); // Дибаг

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        delete window.initMap;
      };
    }
  }, [apiKey]);

  return (
    <section id="pharmacy-map" className={styles.history}>
      <h2 className={styles.title}>Ойролцоох {searchType.includes(',') ? 'эмийн сангууд' : searchType}</h2>
      <div ref={mapRef} style={{ height: '500px', width: '100%', backgroundColor: '#f0f0f0' }} />
    </section>
  );
}