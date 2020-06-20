import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { GeoLocationMap } from './GeoLocationMap';
import './App.css';

export function Home() {
  const [doFetch, setDoFetch] = useState(true);
  const [items, setItems] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:4202/')
        .then(response => response.json())
        .then(data => {
          setItems(data.items);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error ? error : <GeoLocationMap coordinates={items}></GeoLocationMap>}
    </div>
  );
}
