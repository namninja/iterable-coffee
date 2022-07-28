var myHeaders = new Headers();
myHeaders.append("api_key", "c344ad8eb2864ca4a8ef681bceb82468");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.iterable.com/api/inApp/getMessages?email=nam.ngo%2Bweb%40iterable.com&count=1&platform=Web&SDKVersion=None&packageName=com.namngo.webinapptest\n", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      
      if (result.inAppMessages[0].customPayload.showLightbox == true) {
          document.cookie = "namioh=test";
                  }
  }).then(setTimeout(() => {
  DIGIOH_API.LIGHTBOX.checkConditionsLoad();
}, "2000"))
  .catch(error => console.log('error', error));

  var myHeaders = new Headers();
  myHeaders.append("api_key", "c344ad8eb2864ca4a8ef681bceb82468");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://api.iterable.com/api/inApp/getMessages?email=nam.ngo%2Bweb%40iterable.com&count=1&platform=Web&SDKVersion=None&packageName=com.namngo.webinapptest\n", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        
        if (result.inAppMessages[0].customPayload.fromJourney == true) {
            document.cookie = "namioh=test";
                    }
    }).then(setTimeout(() => {
    DIGIOH_API.LIGHTBOX.checkConditionsLoad();
  }, "2000"))
    .catch(error => console.log('error', error));