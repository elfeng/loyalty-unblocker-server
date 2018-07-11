import React, { Component } from 'react'
import { getProducts } from 'actions';
import { connect } from 'react-redux';

let lexruntime;
let lexUserId;
let sessionAttributes;

class Lex extends Component {
  componentWillMount() {
    lexruntime = new window.AWS.LexRuntime();
    lexUserId = 'chatbot-demo' + Date.now();
    sessionAttributes = {};
  }

  render() {
    return (
        <div>
            <div id="conversation" class="bot"></div>
            <form id="chatform" style={{marginTop: '10px'}} onSubmit={e => pushChat(this.props.getProducts, e)}>
                <input type="text" id="wisdom" size="80" placeholder="What would you like to do"/>
            </form>
        </div>
    );
  }
}

export default connect(null, { getProducts })(Lex)

function pushChat(getProducts, e) {

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
    // we always cancel form submission
    e.preventDefault();
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
                btn.addEventListener("click", function(){
                    var wisdomText = document.getElementById('wisdom');
                    wisdomText.value = btnText;
                    pushChat();
                });
            }
        }
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}
