// components/VideoPlayer/VideoPlayer.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  Play,
  Pause,
  SpeakerHigh,
  SpeakerNone,
  ArrowsIn,
  ArrowsOut,
  SkipForward,
  SkipBack,
  PictureInPicture,
} from 'phosphor-react';

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
  aspect-ratio: 16/9;
  user-select: none;
  cursor: default;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
  cursor: pointer;
`;

const PosterOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.2);
`;

const PlayButtonOverlay = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.5);
  }

  svg {
    color: white;
    width: 40px;
    height: 40px;
    margin-left: 4px;
  }
`;

const ControlsContainer = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85) 60%);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: height 0.2s ease;

  &:hover {
    height: 6px;
  }
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  width: ${({ $progress }) => $progress}%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  ${ProgressBar}:hover &::after {
    opacity: 1;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    color: #fff;
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TimeDisplay = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  min-width: 90px;
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
  }
`;

const SpeedIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
  padding: 12px 24px;
  border-radius: 8px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-family: 'JetBrains Mono', monospace;
`;

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<number | null>(null);
  const speedIndicatorTimeoutRef = useRef<number | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [_, setIsPiP] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedIndicator, setShowSpeedIndicator] = useState(false);
  const [speedIndicatorText, setSpeedIndicatorText] = useState('');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowPoster(false);
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!videoRef.current.paused);
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = x * videoRef.current.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      
      // Не перехватываем, если ввод в инпуте
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          videoRef.current.currentTime += 10;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          videoRef.current.currentTime -= 5;
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowUp':
          e.preventDefault();
          videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
          setVolume(videoRef.current.volume);
          break;
        case 'ArrowDown':
          e.preventDefault();
          videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
          setVolume(videoRef.current.volume);
          break;
        default:
          break;
      }
    },
    [togglePlay]
  );

  const handleDoubleClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      videoRef.current.currentTime += 10;
    } else {
      videoRef.current.currentTime -= 5;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  };

  const changePlaybackRate = useCallback(() => {
    if (!videoRef.current) return;
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    videoRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
    setSpeedIndicatorText(`${newRate}x`);
    setShowSpeedIndicator(true);
    
    if (speedIndicatorTimeoutRef.current) {
      clearTimeout(speedIndicatorTimeoutRef.current);
    }
    speedIndicatorTimeoutRef.current = window.setTimeout(() => {
      setShowSpeedIndicator(false);
    }, 1000);
  }, [playbackRate]);

  // Mouse hold acceleration - 2x при зажатии
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!videoRef.current) return;
    // Не активируем если клик по контролам
    if ((e.target as HTMLElement).closest('button')) return;
    
    videoRef.current.playbackRate = 2;
    setPlaybackRate(2);
    setSpeedIndicatorText('2x');
    setShowSpeedIndicator(true);
    
    if (speedIndicatorTimeoutRef.current) {
      clearTimeout(speedIndicatorTimeoutRef.current);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!videoRef.current) return;
    // Возвращаем к 1x
    if (videoRef.current.playbackRate === 2) {
      videoRef.current.playbackRate = 1;
      setPlaybackRate(1);
      setSpeedIndicatorText('1x');
      setShowSpeedIndicator(true);
      
      if (speedIndicatorTimeoutRef.current) {
        clearTimeout(speedIndicatorTimeoutRef.current);
      }
      speedIndicatorTimeoutRef.current = window.setTimeout(() => {
        setShowSpeedIndicator(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setShowPoster(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPoster(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowPoster(true);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handlePiPChange = () => {
      setIsPiP(!!document.pictureInPictureElement);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('enterpictureinpicture', handlePiPChange);
    document.addEventListener('leavepictureinpicture', handlePiPChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('enterpictureinpicture', handlePiPChange);
      document.removeEventListener('leavepictureinpicture', handlePiPChange);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = () => {
      setShowControls(true);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
        hideControlsTimeoutRef.current = null;
      }
      hideControlsTimeoutRef.current = window.setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
        hideControlsTimeoutRef.current = null;
      }
    };
  }, [isPlaying]);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      if (speedIndicatorTimeoutRef.current) {
        clearTimeout(speedIndicatorTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PlayerContainer ref={containerRef} className={className}>
      <VideoElement
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {showPoster && (
        <PosterOverlay $visible={true} onClick={togglePlay}>
          <PlayButtonOverlay>
            <Play weight="fill" />
          </PlayButtonOverlay>
        </PosterOverlay>
      )}

      <ControlsContainer $visible={showControls}>
        <ProgressContainer>
          <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
          <ProgressBar onClick={handleProgressClick}>
            <ProgressFill $progress={(currentTime / duration) * 100 || 0} />
          </ProgressBar>
          <TimeDisplay>{formatTime(duration)}</TimeDisplay>
        </ProgressContainer>

        <ControlsRow>
          <ControlButton onClick={togglePlay}>
            {isPlaying ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" />}
          </ControlButton>

          <ControlButton onClick={() => videoRef.current && (videoRef.current.currentTime -= 5)}>
            <SkipBack size={20} />
          </ControlButton>

          <ControlButton onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}>
            <SkipForward size={20} />
          </ControlButton>

          <ControlButton onClick={toggleMute}>
            {isMuted || volume === 0 ? <SpeakerNone size={20} /> : <SpeakerHigh size={20} />}
          </ControlButton>

          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />

          <ControlButton onClick={changePlaybackRate} title="Скорость воспроизведения">
            <span style={{ fontSize: '12px', fontWeight: '600' }}>{playbackRate}x</span>
          </ControlButton>

          <div style={{ flex: 1 }} />

          {title && (
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginRight: '8px' }}>
              {title}
            </span>
          )}

          <ControlButton onClick={togglePiP} title="Картинка в картинке">
            <PictureInPicture size={20} />
          </ControlButton>

          <ControlButton onClick={toggleFullscreen} title="Полный экран">
            {isFullscreen ? <ArrowsIn size={20} /> : <ArrowsOut size={20} />}
          </ControlButton>
        </ControlsRow>
      </ControlsContainer>

      <SpeedIndicator style={{ opacity: showSpeedIndicator ? 1 : 0 }}>
        {speedIndicatorText}
      </SpeedIndicator>
    </PlayerContainer>
  );
};