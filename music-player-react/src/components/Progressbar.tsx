import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaAnglesLeft, FaAnglesRight, FaCirclePlay,
    FaVolumeHigh,FaVolumeLow, FaVolumeXmark, FaCirclePause } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';

import {togglePlay, pause, play, setVolume, setCurrentTime} from '../store/MusicPlayerSlice';
import { RootState } from "../store/Store";
import { btnIcon } from "../utils/helper";

const ProgressBar = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isPlaying, volume, currentTime, currentSong } = useSelector((state: RootState) => state.musicPlayer);
    const dispatch = useDispatch();

    const handleTogglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        dispatch(togglePlay());
    };

    const [duration, setDuration] = useState(0);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const css = {
        nameSong: "name song text-2xl font-bold",
        nameArtist: "name-artist text-xl font-bold",
        highlightLyrics: "bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent",
        icon: "text-3xl",
    }

    // Format thời gian kiểu phút:giây
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    // Khi nhạc phát thì cập nhật currentTime và duration
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            dispatch(setCurrentTime(audio.currentTime));
            setDuration(audio.duration || 0);
        }
    };

    const toggleVolumeSlider = () => {
        const show = showVolumeSlider
        setShowVolumeSlider(!show);
        setTimeout(() => setShowVolumeSlider(show), 3000)
    };

    const handleAudioEnded = () => {
        setCurrentTime(0);
        dispatch(pause());
    };

    const handleVolumeChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);

        dispatch(setVolume(vol));

        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * duration;

        if (!audioRef.current) return;
        audioRef.current.currentTime = newTime;
    };

    // Tính phần trăm tiến trình
    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="space-y-2 w-full max-w-lg mx-auto">
             {/*Audio element*/}
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={handleAudioEnded}
                controls
                className="w-full mt-2"
                hidden
            />
            <div className="flex items-center justify-content-end gap-2">
                {showVolumeSlider && (
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 accent-cyan-50"
                    />
                )}
                <Button className={btnIcon()} onClick={toggleVolumeSlider}>
                    {volume === 0 ?
                        FaVolumeXmark({className: ''}) : volume < 0.5 ?
                            FaVolumeLow({className: ''}) : FaVolumeHigh({className:''})
                    }
                </Button>
            </div>
            {/* Progress Bar */}
            <div className="relative" onClick={handleSeek}>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="bg-slate-900 dark:bg-slate-950 h-2 transition-all duration-200"
                        style={{width: `${progress}%`}}
                        role="progressbar"
                        aria-valuenow={currentTime}
                        aria-valuemin={0}
                        aria-valuemax={duration}
                    />
                </div>
                <div
                    className="bg-transparent absolute"
                    style={{left: `${progress}%`, top: "50%", transform: "translate(-50%, -50%)"}}
                >
                    <div className="w-4 h-4 flex items-center justify-center bg-white rounded-full shadow">
                        <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-slate-950 rounded-full"/>
                    </div>
                </div>
            </div>

            {/* Time display */}
            <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                <div className="text-cyan-500 dark:text-slate-100">{formatTime(currentTime)}</div>
                <div className="text-slate-100">{formatTime(duration)}</div>
            </div>

            <div className="btn-action w-full max-w-xs mx-auto flex justify-content-between">
                <Button className={btnIcon()}>
                    {FaAnglesLeft({className:css.icon})}
                </Button>
                <Button className={btnIcon()} onClick={handleTogglePlay}>
                    {isPlaying ?
                        FaCirclePause({className: 'text-5xl'})
                        : FaCirclePlay({className: 'text-5xl'})

                    }
                </Button>
                <Button className={btnIcon()}>
                    {FaAnglesRight({className:css.icon})}
                    {/*<FaAnglesRight className={css.icon}/>*/}
                </Button>
            </div>
        </div>
    );
};

export default ProgressBar;
