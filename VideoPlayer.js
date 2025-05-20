import React, { useRef, useEffect, useState } from 'react';

export default function VideoPlayer({ video, index }) {
  const videoRef = useRef(null);
  const adRef = useRef(null);

  const [showAd, setShowAd] = useState(false);
  const [adPosition, setAdPosition] = useState('start');
  const [adPlayed, setAdPlayed] = useState(false);
  const [mainPaused, setMainPaused] = useState(false);

  const adVideos = [
    '/ads/ad1.mp4',
    '/ads/ad2.mp4',
    '/ads/ad3.mp4'
  ];

  useEffect(() => {
    // Определяем, где показывать рекламу
    const positions = ['middle', 'end', 'start'];
    setAdPosition(positions[index % positions.length]);
  }, [index]);

  const handleTimeUpdate = () => {
    if (!videoRef.current || adPlayed) return;

    const video = videoRef.current;
    const currentTime = video.currentTime;
    const duration = video.duration;

    if (
      (adPosition === 'middle' && currentTime >= duration / 2) ||
      (adPosition === 'end' && currentTime >= duration - 10)
    ) {
      playAd();
    }
  };

  const playAd = () => {
    if (videoRef.current && !adPlayed) {
      videoRef.current.pause();
      setShowAd(true);
      setMainPaused(true);
      setAdPlayed(true);

      setTimeout(() => {
        setShowAd(false);
        videoRef.current.play();
        setMainPaused(false);
      }, 10000);
    }
  };

  const handleStart = () => {
    if (adPosition === 'start' && !adPlayed) {
      playAd();
    }
  };

  return (
    <div className="video-wrapper">
      {showAd ? (
        <video
          ref={adRef}
          src={adVideos[index % adVideos.length]}
          autoPlay
          muted
          className="ad-video"
        />
      ) : (
        <video
          ref={videoRef}
          src={video.url}
          controls
          onPlay={handleStart}
          onTimeUpdate={handleTimeUpdate}
          className="main-video"
        />
      )}
    </div>
  );
}