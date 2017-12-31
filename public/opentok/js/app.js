
// replace these values with those generated in your TokBox Account
var apiKey = "46028732";
var sessionId = "2_MX40NjAyODczMn5-MTUxNDY4NDY0Njg1MX5JQmFHRDlsOVFlVnNIdXNIemJ2MGNsaVd-fg";
var token = 'T1==cGFydG5lcl9pZD00NjAyODczMiZzaWc9ODNhYjkwZjU2MGU5NDA2YzMxMmMzOTAxNDc1ZjZmZTA1MmUzYWY4ODpzZXNzaW9uX2lkPTJfTVg0ME5qQXlPRGN6TW41LU1UVXhORFk0TkRZME5qZzFNWDVKUW1GSFJEbHNPVkZsVm5OSWRYTkllbUoyTUdOc2FWZC1mZyZjcmVhdGVfdGltZT0xNTE0Njg0Njk3Jm5vbmNlPTAuMjUwNzUyNjY2Njc0MTc2NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE3Mjc2Njk2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';


// (optional) add server code here
initializeSession();


// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}