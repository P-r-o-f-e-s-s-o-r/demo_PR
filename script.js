/**
 * NEOBRUTALISM MINIMAL INTERACTIVE ENGINE
 * MUKESHWAR RAUDRA J
 */

(function () {
  'use strict';

  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPopSound() {
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  const nameBox = document.querySelector('.name-box');
  const palette = ['#FFE600', '#FF5E8E', '#00D2FF', '#05FFA1', '#C4A1FF', '#FFFFFF'];
  let colorIdx = 0;

  if (nameBox) {
    nameBox.addEventListener('click', () => {
      colorIdx = (colorIdx + 1) % palette.length;
      nameBox.style.setProperty('--card-bg', palette[colorIdx]);
      nameBox.style.backgroundColor = palette[colorIdx];
      playPopSound();
    });
  }
})();
