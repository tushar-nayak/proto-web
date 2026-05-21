import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import soundtrack from '../assets/Sea of Simulation.mp3';

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.32;
    audio.loop = true;
    audio.muted = isMuted;

    const syncStarted = () => {
      setHasStarted(!audio.paused);
    };

    const startPlayback = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
        syncStarted();
      } catch {
        // Ignore autoplay failures until the next interaction.
      }
    };

    const handleFirstInteraction = () => {
      startPlayback();
    };

    audio.addEventListener('play', syncStarted);
    audio.addEventListener('pause', syncStarted);
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      audio.removeEventListener('play', syncStarted);
      audio.removeEventListener('pause', syncStarted);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isMuted]);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasStarted || audio.paused) {
      try {
        await audio.play();
        setIsMuted(false);
        setHasStarted(true);
      } catch {
        return;
      }
      return;
    }

    setIsMuted((current) => !current);
  };

  return (
    <>
      <audio ref={audioRef} src={soundtrack} preload="auto" />
      <button
        type="button"
        className="audio-toggle"
        onClick={toggleMute}
        aria-label={!hasStarted ? 'Enable background audio' : (isMuted ? 'Unmute background audio' : 'Mute background audio')}
        title={!hasStarted ? 'Enable audio' : (isMuted ? 'Unmute' : 'Mute')}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{!hasStarted ? 'Enable Audio' : (isMuted ? 'Muted' : 'Audio On')}</span>
      </button>
    </>
  );
}
