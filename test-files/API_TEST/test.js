import fetch from 'node-fetch'

const baseUrl = "http://ip-api.com/json/"

// const makeRequest = function() {
// 	fetch(`${baseUrl}/search?q=sunflowers`)
// 	  .then(function(response) {
// 	    return response.json()
// 	  }).then(function(json) {
// 	    console.log(json)
// 	  }).catch(function(error) {
// 	    console.error(error)
// 	  })
// }

const makeRequest = async function() {
	try {
		const response = await fetch($,{baseUrl}) 
	
		const json = await response.json()
	
		console.log(json)
	} catch (error) {
	  console.error(error)
	}
}

makeRequest()
//what the hell are callbacks?
//WHAT THE HELL IS CURLING

// $.getJSON('http://ip-api.com/json/{query}?callback={callback}', function(data) {
//     console.log(JSON.stringify(data, null, 2));
//   });

