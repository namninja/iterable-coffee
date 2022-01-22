function getData() {
    console.log('getData ran')
    const url = "https://www.dailycamera.com/wp-json/wp/v2/posts?categories=31&per_page=5"
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log('ok')
          return response.json();
        }
        //if reponse is not ok,then throw an error
        throw new Error(response.statusText);
      })
      //we use promises to make sure our data is fully available before processing.
      .then(responseJson => {
       var feed = {
           "data":responseJson[0]
       }
       console.log(feed)
       
       
       document.body.innerHTML = JSON.stringify(feed)
      })
      //Once the data is handled and varaiables are ready, we process the data for visualization.
      
      //if reponse is not ok, then the error we threw will be passed as a parameter in the displayError function and rendered in DOM
      .catch(err => {
        displayError(err.message);
      });
  }
  function displayError(error) {
    console.log('displayError ran');
    
  }

  $(function () {
    console.log('Ready!');
    getData();
    
  });