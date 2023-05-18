(() => {
    const { setEmail, logout } = window['@iterable/web-sdk'].initialize(
      '1799be9d1a7e4d859fbffc9340422fbe',
      () => Promise.resolve('')
    
    );
  
  ///
  var objappVersion = navigator.appVersion;
  var browserAgent = navigator.userAgent;
  var browserName = navigator.appName;
  var browserVersion = '' + parseFloat(navigator.appVersion);
  var browserMajorVersion = parseInt(navigator.appVersion, 10);
  var Offset, OffsetVersion, ix;
    
  // For Chrome 
  if ((OffsetVersion = browserAgent.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      browserVersion = browserAgent.substring(OffsetVersion + 7);
  }
    
  // For Safari
  else if ((OffsetVersion = browserAgent.indexOf("Safari")) != -1) {
      browserName = "Safari";
      browserVersion = browserAgent.substring(OffsetVersion + 7);
      if ((OffsetVersion = browserAgent.indexOf("Version")) != -1)
          browserVersion = browserAgent.substring(OffsetVersion + 8);
  }
    
  // Trimming the fullVersion string at 
  // semicolon/space if present 
  if ((ix = browserVersion.indexOf(";")) != -1)
      browserVersion = browserVersion.substring(0, ix);
  if ((ix = browserVersion.indexOf(" ")) != -1)
      browserVersion = browserVersion.substring(0, ix);
    
    
  browserMajorVersion = parseInt('' + browserVersion, 10);
  if (isNaN(browserMajorVersion)) {
      browserVersion = '' + parseFloat(navigator.appVersion);
      browserMajorVersion = parseInt(navigator.appVersion, 10);
  }
  if (browserName == 'Chrome') {
    const { request, pauseMessageStream, resumeMessageStream } = window[
      "@iterable/web-sdk"
    ].getInAppMessages(
      {
        count: 20,
        displayInterval: 1000,
        packageName: "com.mjbenefiel.webinapptest",
        handleLinks: "open-all-same-tab",
        closeButton: {
          color: 'white',
          position: 'top-right',
          size: 30,
          iconPath: '/assets/close-button.png',
          sideOffset: '35%',
          topOffset: '20%'
        }
      },
      {display:'immediate'}
    );
    setEmail('+')
    .then(() => {
      request();
    })
    .catch(() => {})
    console.log('webSDK fired')
  }
  
  if (browserName == 'Safari') {
    const { request, pauseMessageStream, resumeMessageStream } = window[
      "@iterable/web-sdk"
    ].getInAppMessages(
      {
        count: 20,
        displayInterval: 1000,
        packageName: "com.mjbenefiel.webinapptest-mobile",
        handleLinks: "open-all-same-tab"
      },
      {display:'immediate'}
    );
    setEmail('michael.benefiel@iterable.com')
    .then(() => {
      request();
    })
    .catch(() => {})
    console.log('webSDK mobile fired')
  }
  
  })()
  
  