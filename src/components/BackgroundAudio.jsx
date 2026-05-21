import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import tronSoundtrack from '../assets/Sea of Simulation.mp3';
import liquidGlassSoundtrack from '../assets/Lambent Rag.mp3';
import googleMaterialSoundtrack from '../assets/googleio.mp3';
import linuxTerminalSoundtrack from '../assets/linux.mp3';

export default function BackgroundAudio({ theme = 'tron' }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('audio:mute-change', { detail: isMuted }));
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const isLiquidGlass = theme === 'liquid-glass';
    const isGoogleMaterial = theme === 'google-material';
    const isLinuxTerminal = theme === 'linux-terminal';
    audio.volume = isLiquidGlass ? 0.18 : (isGoogleMaterial ? 0.14 : (isLinuxTerminal ? 0.12 : 0.05));
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

    const handleProjectAudioPlay = () => {
      if (isLiquidGlass || isGoogleMaterial || isLinuxTerminal) return;
      audio.pause();
      syncStarted();
    };

    const handleProjectAudioStop = async () => {
      if (isLiquidGlass || isGoogleMaterial || isLinuxTerminal) {
        syncStarted();
        return;
      }

      if (isMuted) {
        syncStarted();
        return;
      }

      try {
        await audio.play();
        syncStarted();
      } catch {
        // Ignore resume failures until the next user interaction.
      }
    };

    const handleToggleMute = () => {
      setIsMuted((current) => !current);
    };

    const handleMuteShortcut = (event) => {
      const target = event.target;
      const isEditableTarget = target instanceof HTMLElement && (
        target.isContentEditable ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      );

      if (isEditableTarget || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() === 'm') {
        setIsMuted((current) => !current);
      }
    };

    audio.addEventListener('play', syncStarted);
    audio.addEventListener('pause', syncStarted);
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('project-audio:play', handleProjectAudioPlay);
    window.addEventListener('project-audio:stop', handleProjectAudioStop);
    window.addEventListener('audio:toggle-mute', handleToggleMute);
    window.addEventListener('keydown', handleMuteShortcut);

    return () => {
      audio.removeEventListener('play', syncStarted);
      audio.removeEventListener('pause', syncStarted);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('project-audio:play', handleProjectAudioPlay);
      window.removeEventListener('project-audio:stop', handleProjectAudioStop);
      window.removeEventListener('audio:toggle-mute', handleToggleMute);
      window.removeEventListener('keydown', handleMuteShortcut);
    };
  }, [isMuted, theme]);

  const toggleMute = () => {
    window.dispatchEvent(new CustomEvent('audio:toggle-mute'));
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={
          theme === 'liquid-glass'
            ? liquidGlassSoundtrack
            : theme === 'google-material'
            ? googleMaterialSoundtrack
            : theme === 'linux-terminal'
            ? linuxTerminalSoundtrack
            : tronSoundtrack
        }
        preload="auto"
      />
      <button
        type="button"
        className="audio-toggle"
        onClick={toggleMute}
        aria-label={!hasStarted ? 'Enable background audio with M shortcut' : (isMuted ? 'Unmute audio with M shortcut' : 'Mute audio with M shortcut')}
        title={!hasStarted ? 'Enable audio (M)' : (isMuted ? 'Unmute (M)' : 'Mute (M)')}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{!hasStarted ? 'Enable Audio (M)' : (isMuted ? 'Muted (M)' : 'Audio On (M)')}</span>
      </button>
    </>
  );
}
