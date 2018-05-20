// GLOBAL VARIABLES //////
// inputs //
let mic, song, xo, ratatat;
let currentSource = 'song';
// re amplitude //
let amplitude, smoothing
// re freq fft //
let binCount, bins, fft;
// re sketch
let canvas, spectrum, width, height, wSeg, hSeg, level, size;

function preload() {
  // add load method with the path to your sound
  xo = loadSound('./audio/sweet-adeline.mp3');
  ratatat = loadSound('./audio/el-pico.mp3');
};

function setup() {
  // MIC SETUP //
  mic = new p5.AudioIn();
  currentSource = mic;
  currentSource.start();

  // CHANGE USER CONTROLS TEXT //
  $('#loading').addClass('invisible');
  $('#icons').removeClass('invisible');

  // CANVAS //
  canvas = createCanvas(windowWidth, windowHeight); // this sets width & height
  width = windowWidth;
  height = windowHeight;
  canvas.parent('canvas');
  background(30);
  // SOUND ANALYSIS: FFT //
  binCount = 256;
  bins = new Array(binCount);
  smoothing = 0.6;
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(currentSource);
  // SOUND ANALYSIS: AMPLITUDE //
  amplitude = new p5.Amplitude()

  // SET SOURCE //
  toggleInput(1); // start with elliot smith
  // toggleInput(0); // start with mic

  // USER CONTROLS FOR CLEARING CANVAS //
  $('#refresh').on('click', function() {
    refreshCanvas();
  });

  // USER CONTROLS FOR MODE //
  $('#mic').on('click', function() {
    toggleInput(0);
  });
  $('#xo').on('click', function() {
    toggleInput(1)
  });
  $('#ratatat').on('click', function() {
    toggleInput(2)
  });

  // USER CONTROLS FOR PLAYING AUDIO /////////////////////
  $('#play').on('click', function() {
    if (currentSource.isPlaying() === false) {
      currentSource.play();
    }
  });
  $('#pause').on('click', function() {
    if (currentSource.isPlaying()) {
      currentSource.pause();
    }
  })
  $('#stop').on('click', function() {
    currentSource.stop();
    refreshCanvas();
  });
};

const random = function(min,max) {
  // getting a random integer:
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
