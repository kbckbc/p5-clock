let cSize; // clock Size
let cx, cy; // clock position
let gap; // gap pixel between h, m, s
let fontSize;

// Size for timer hand
let shWidth;
let mhWidth;
let hhWidth;

// Size for arc
let sWidth;
let mWidth;
let hWidth;

// Color for text, h, m, s
let tColor;
let hColor;
let mColor;
let sColor;

function setup() {
  init(windowWidth, windowHeight);

  createCanvas(cSize, cSize);
  angleMode(DEGREES);
  tColor = color(255, 255, 255);
  hColor = color(255, 100, 150);
  mColor = color(100, 255, 150);
  sColor = color(150, 100, 200);
}


function init(width, height) {
  if( width > height ) {
    cSize = height;
  }
  else {
    cSize = width;
  }
  cx = cSize / 2
  cy = cSize / 2;
  gap = cSize / 15;
  fontSize = cSize / 9;
  
  // for timer hand
  shWidth = cSize / 3;
  mhWidth = shWidth - gap;
  hhWidth = mhWidth - gap;

  // for arc
  sWidth = cSize - gap;
  mWidth = sWidth - gap;
  hWidth = mWidth - gap;
}


function windowResized() {
  init(windowWidth, windowHeight);
  resizeCanvas(cSize, cSize);
}


function draw() {
  background(0);
  translate(cx, cx);
  noFill();

  let hh = hour();
  let mm = minute();
  let ss = second();
  let meridiem = "AM"; // Default is AM
  if (hh >= 12) {
    hh = hh - 12;
    meridiem = "PM";
  }

  // for text
  // 0 AM and 0 PM should read as 12
  let textHour = hh;
  if (textHour == 0) {
    textHour = 12;
  }
  strokeWeight(1);
  stroke(tColor);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text(
    meridiem + " " + textHour + ":" + nf(mm, 2, 0) + ":" + nf(ss, 2, 0),
    0,
    fontSize * 1.8
  );

  // for drawing arc
  rotate(-90);
  // for hour
  stroke(hColor);
  strokeWeight(4);
  let hourAngle;
  hourAngle = map(hh + mm / 60, 0, 12, 0, 360);
  arc(0, 0, hWidth, hWidth, 0, hourAngle);

  push();
  rotate(hourAngle);
  line(0, 0, hhWidth, 0);
  pop();

  // for minute
  stroke(mColor);
  strokeWeight(5);
  let minAngle = map(mm, 0, 60, 0, 360);
  arc(0, 0, mWidth, mWidth, 0, minAngle);

  push();
  rotate(minAngle);
  line(0, 0, mhWidth, 0);
  pop();

  // for second
  stroke(sColor);
  strokeWeight(4);
  let secAngle = map(ss, 0, 60, 0, 360);
  arc(0, 0, sWidth, sWidth, 0, secAngle);

  push();
  rotate(secAngle);
  line(0, 0, shWidth, 0);
  pop();
}
