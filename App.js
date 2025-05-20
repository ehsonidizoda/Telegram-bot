import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import './styles.css';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Имитация получения видео с сервера
  useEffect(() => {
    async function fetchVideos() {
      // Тут позже можно подключить API
      const fakeVideos = [
        { id: 1, url: '/videos/video1.mp4' },
        { id: 2, url: '/videos/video2.mp4' },
        { id: 3, url: '/videos/video3.mp4' }
      ];
      setVideos(fakeVideos);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  return (
    <div className="app">
      <header>
        <div className="logo">Ачали Петкахо</div>
      </header>

      {loading ? (
        <p>Загрузка видео...</p>
      ) : (
        <div className="video-grid">
          {videos.map((video, index) => (
            <VideoPlayer key={video.id} video={video} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}