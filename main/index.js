var FOREGROUND_IMG = null;
var ENCRYPTED_IMG = null;
var AUDIO_INDEX = new Audio('./smack.mp3');
var AUDIO_OTHERS = new Audio('./cash.mp3');


// ----------------------UPLOAD & RESIZING SECTION----------------------------------
function upload1() {
    var f = document.getElementById("FOREGROUND_INP_ID");
    FOREGROUND_IMG = new SimpleImage(f);
    FOREGROUND_IMG.drawTo(FIRST_CANVAS_ID);
  }

  
  function isForeGroundImageUploaded() {
    if (FOREGROUND_IMG == null || !FOREGROUND_IMG.complete()) {
      alert("Please upload a Foreground image");
      return false;
    }
    return true;
  }


//   --------------------------------------------------------------------


function extractBits(value) {
    return (value % 16) * 16;
  }
  
  function extractHiddenImage(image) {
    for (var px of image.values()) {
      px.setRed(extractBits(px.getRed()));
      px.setGreen(extractBits(px.getGreen()));
      px.setBlue(extractBits(px.getBlue()));
    }
    return image;
  }
  

  function decrypt() {
    if (isForeGroundImageUploaded()) {
        var extractedImg = extractHiddenImage(FOREGROUND_IMG);
        extractedImg.drawTo(DECRYPT_CANVAS_ID);
        AUDIO_OTHERS.play();
       document.getElementById("decrypt_btn").disabled = true; 
  
    }
  }

  //-------------------------------------------------------------------


  function soundIndex() {
    AUDIO_INDEX.play();
  }

  //-------------------------------------------

  function clearCanvas(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }



  function clearStegenography() {
    clearCanvas(DECRYPT_CANVAS_ID);
    clearCanvas(FIRST_CANVAS_ID);
    document.getElementById("FOREGROUND_INP_ID").value="" ;
    document.getElementById("BACKGROUND_INP_ID").value="" ;
    FOREGROUND_IMG = null;
    document.getElementById("encrypt_btn").disabled = false; 
    document.getElementById("decrypt_btn").disabled = false; 
  
  }