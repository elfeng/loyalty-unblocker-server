import React, { Component } from 'react'
import { getProducts } from 'actions';
import { connect } from 'react-redux';
import { tap } from 'utils';

let lexruntime;
let lexUserId;
let sessionAttributes;
let waveform;
let message;
let message1;
let config, conversation;

class Lex extends Component {
  componentDidMount() {
      const p = this.props;
    lexruntime = new window.AWS.LexRuntime();
    lexUserId = 'chatbot-demo' + Date.now();
    sessionAttributes = {};
    message = document.getElementById('message');
    message1 = document.getElementById('message1');

    if (message) {
        console.log('audio');
        message.textContent = 'Passive';
        lexAudio();
        waveform = window.Waveform();

    document.getElementById('audio-control').onclick = function () {

        config = {
            lexConfig: { botName: 'BookTrip' }
        };

        conversation = new window.LexAudio.conversation(config, function (state) {
            message.textContent = state + '...';
            if (state === 'Listening') {
                waveform.prepCanvas();
            }
            if (state === 'Sending') {
                waveform.clearCanvas();
            }
        }, function (data) {
            message1.textContent = 'Transcript: ' + data.inputTranscript + ", Response: " + tap(data).message;
            if (data.dialogState === 'Fulfilled')
                p.getProducts(data.slots);
        }, function (error) {
            message1.textContent = error;
        }, function (timeDomain, bufferLength) {
            waveform.visualizeAudioBuffer(timeDomain, bufferLength);
        });
        conversation.advanceConversation();
    };
    }

  }

  render() {
    return ( this.props.isAudio ?
        <div class="audio-control">
            <p id="audio-control" class="white-circle">
                <img src="lex.png"/>
                <canvas class="visualizer"></canvas>
            </p>
            <p><span id="message"></span></p>
            <p><span id="message1"></span></p>
        </div> :
        <div>
            <div id="conversation" class="bot"></div>
            <form id="chatform" style={{marginTop: '10px'}} onSubmit={e => pushChat1(this.props.getProducts, e)}>
                <input type="text" id="wisdom" size="80" placeholder="What would you like to do"/>
            </form>
        </div>
    );
  }
}

export default connect(s => ({ isAudio: s.isAudio }), { getProducts })(Lex)

function pushChat1(getProducts, e) {
    pushChat(getProducts);
    e.preventDefault();
}

function pushChat(getProducts) {

    // if there is text to be sent...
    var wisdomText = document.getElementById('wisdom');
    if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {

        // disable input to show we're sending it
        var wisdom = wisdomText.value.trim();
        wisdomText.value = '...';
        wisdomText.locked = true;

        // send it to the Lex runtime
        var params = {
            botAlias: '$LATEST',
            botName: 'BookTrip',
            inputText: wisdom,
            userId: lexUserId,
            sessionAttributes: sessionAttributes
        };
        showRequest(wisdom);
        lexruntime.postText(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
                // capture the sessionAttributes for the next cycle
                sessionAttributes = data.sessionAttributes;
                // show response and/or error/dialog status
                showResponse(data, getProducts);
            }
            // re-enable input
            wisdomText.value = '';
            wisdomText.locked = false;
        });
    }
}

function showRequest(daText) {

    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function showResponse(lexResponse, getProducts) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
        responsePara.appendChild(document.createTextNode(lexResponse.message));
        responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
        responsePara.appendChild(document.createTextNode(
            'Ready for fulfillment'));
        // TODO:  show slot values
    } else if (lexResponse.dialogState === 'Fulfilled') {
        getProducts(lexResponse.slots);
    } else {
        if (lexResponse.slotToElicit == 'CruiseLine' || lexResponse.slotToElicit == 'Destination' || lexResponse.slotToElicit == 'StateRoom') {
            var  responseCardOptions = lexResponse.responseCard.genericAttachments[0].buttons;
            for (var i = 0; i < responseCardOptions.length; i++) {
                var btn = document.createElement("button");
                var btnText = responseCardOptions[i].value;
                var t = document.createTextNode(btnText);
                btn.appendChild(t);
                responsePara.appendChild(btn);
                btn.addEventListener("click", function(e){
                    var wisdomText = document.getElementById('wisdom');
                    wisdomText.value = e.srcElement.innerText;
                    pushChat(getProducts);
                });
            }
        }
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}


const lexAudio = function() {
    var canvas = document.querySelector('.visualizer');
    var canvasCtx = canvas.getContext('2d');
    var listening = true;
  
    /**
     * Will render an audio buffer as wave form. Right now, it expects 
     * a canvas element to be on the page with class name "visualizer".
     */
    window.Waveform = function() {
      /**
       * Clears the canvas element.
       */
      var clearCanvas = function() {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        listening = false;
      };
  
      /**
       * Sets the listening flag to true.
       */
      var prepCanvas = function() {
        listening = true;
      };
  
      /**
       * Clears the canvas and draws the dataArray. 
       * @param {Uint8Array} dataArray - The time domain audio data to visualize.
       * @param {number} bufferLength - The FFT length.
       */
      var visualizeAudioBuffer = function(dataArray, bufferLength) {
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var animationId;
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
        /**
         * Will be called at about 60 times per second. If listening, draw the dataArray. 
         */
        function draw() {
          if (!listening) {
            return;
          }
  
          canvasCtx.fillStyle = 'rgb(249,250,252)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.lineWidth = 1;
          canvasCtx.strokeStyle = 'rgb(0,125,188)';
          canvasCtx.beginPath();
  
          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;
  
          for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
          }
  
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
        }
  
        // Register our draw function with requestAnimationFrame. 
        if (typeof animationId === 'undefined') {
          animationId = requestAnimationFrame(draw);
        }
      };
      return {
        clearCanvas: clearCanvas,
        prepCanvas: prepCanvas,
        visualizeAudioBuffer: visualizeAudioBuffer
      };
    };
  };