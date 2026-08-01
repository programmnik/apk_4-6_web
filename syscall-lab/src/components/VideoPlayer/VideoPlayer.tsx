import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import type { VideoPlayerProps } from './types/VideoPlayer.types'
import {
  PlayerWrapper,
  PlayButton,
} from './VideoPlayer.styles'

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className
}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<HTMLVideoElement>(null)

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const PlayIcon = ({ size = 64 }) => (
    <PlayButton>
      <svg viewBox='0 0 24 24' width={size} height={size}>
        <polygon points='5,3 19,12 5,21' />
      </svg>
    </PlayButton>
  )

  const PauseIcon = ({ size = 64 }) => (
    <PlayButton>
      <svg viewBox='0 0 24 24' width={size} height={size}>
        <rect x={6} y={4} width={4} height={16} />
        <rect x={14} y={4} width={4} height={16} />
      </svg>
    </PlayButton>
  )

  const [isHovering, setIsHovering] = useState(false);

  return (
    <PlayerWrapper
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ReactPlayer
        playIcon={<PlayIcon size={32} />}
        ref={playerRef}
        src={src}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={false}
        onPlay={handlePlay}
        onPause={handlePause}
      />

      {isHovering && (
        <PlayButton onClick={togglePlay}>
          {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </PlayButton>
      )}
    </PlayerWrapper>
  );
};