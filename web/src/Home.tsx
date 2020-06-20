import React, { useEffect, useState } from 'react';
import { GeoLocationMap } from './GeoLocationMap';

export function Home() {
  const [items, setItems] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(process.env.URL_DEV)
        .then(response => response.json())
        .then(data => {
          setItems(data.items);
        })
        .catch(err => setError(err));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error ? error : <GeoLocationMap coordinates={items}></GeoLocationMap>}
    </div>
  );
}
