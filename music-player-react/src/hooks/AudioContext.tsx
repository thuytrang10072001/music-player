import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';

import music from "../assets/audio/song.mp3"
import { togglePlay, pause, play, setVolume, setCurrentTime, setDuration, playNext } from '../store/MusicPlayerSlice';

interface AudioContextType {
    audioRef: React.RefObject<HTMLAudioElement>; // Non-nullable
    play: () => void;
    pause: () => void;
    setVolume: (volume: number) => void;
    setCurrentTime: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null!); // Non-null assertion
    const dispatch = useDispatch();
    const { repeatMode, currentSong } = useSelector((state: RootState) => state.musicPlayer);

    useEffect(() => {
        if(currentSong){
            handlePlay();
        }
    }, [currentSong]);

    // Update duration and currentTime
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current.currentTime));
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            dispatch(setDuration(audioRef.current.duration));
        }
    };

    // Handle song end
    const handleAudioEnded = () => {
        if (repeatMode === 'one') {
            // Replay the same song
            dispatch(setCurrentTime(0));
            handlePlay();
        } else {
            // Play next song in playlist
            dispatch(playNext());
        }
    };

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => console.error('Playback failed:', error));
            dispatch(play());
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            dispatch(pause());
        }
    };

    const handleSetVolume = (newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            dispatch(setVolume(newVolume));
        }
    };

    const handleSetCurrentTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            dispatch(setCurrentTime(time));
        }
    };

    return (
        <AudioContext.Provider
            value={{
                audioRef,
                play: handlePlay,
                pause: handlePause,
                setVolume: handleSetVolume,
                setCurrentTime: handleSetCurrentTime,
            }}
        >
            <audio
                ref={audioRef}
                src={currentSong?.file_path}
                // src={music}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
                hidden
            />
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};