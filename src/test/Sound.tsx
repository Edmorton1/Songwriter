import { useState } from 'react';
import note from "@/assets/guitar-electric/A2.wav"
import * as Tone from 'tone';

function Sound() {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = new Tone.Player({
    url: note,
    autostart: false,
    loop: false,
  });

  const pitchShift = new Tone.PitchShift(1).toDestination();

  player.connect(pitchShift);

  const togglePlayback = () => {
    if (isPlaying) {
      player.stop();
      setIsPlaying(false);
    } else {
      player.start();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div>
        <h1>Play Your Track with Tone.js</h1>
        <button
          onClick={() => {Tone.start(), player.start();}}>
          Запустить
        </button>
      </div>
    </>
  );
}

export default Sound;
