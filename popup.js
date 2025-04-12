// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the HTML elements
    const apiKey = document.getElementById('apiKey');
    const model = document.getElementById('model');
    const taskDetails = document.getElementById('taskDetails');
    const submitButton = document.getElementById('submitButton');
    const statusDiv = document.getElementById('status');
    const responseDiv = document.getElementById('response');
    
    // Load saved values from storage when popup opens
    chrome.storage.local.get(['apiKey', 'model', 'taskDetails'], function(result) {
      if (result.apiKey) apiKey.value = result.apiKey;
      if (result.model) model.value = result.model;
      if (result.taskDetails) taskDetails.value = result.taskDetails;
    });
    
    // Save input values whenever they change
    apiKey.addEventListener('input', saveValues);
    model.addEventListener('change', saveValues);
    taskDetails.addEventListener('input', saveValues);
    
    // Handle the submit button click
    submitButton.addEventListener('click', makeApiCall);
    
    // Function to save values to storage
    function saveValues() {
      chrome.storage.local.set({
        'apiKey': apiKey.value,
        'model': model.value,
        'taskDetails': taskDetails.value
      });
    }
    
    // Function to make the API call
    function makeApiCall() {
      // Validate inputs
      if (!apiKey.value.trim()) {
        showStatus('Please enter your Gemini API key', 'error');
        return;
      }
      
      if (!model.value) {
        showStatus('Please select a model', 'error');
        return;
      }
      
      if (!taskDetails.value.trim()) {
        showStatus('Please enter task details', 'error');
        return;
      }
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Processing...';
      responseDiv.style.display = 'none';
      
      // Prepare the request data based on the selected model
      const data = {
        contents: [
          {
            parts: [
              {
                text: taskDetails.value
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      };
      
      // Construct the API URL based on the selected model
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model.value}:generateContent?key=${apiKey.value}`;
      
      // Make the API call
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        showStatus('Request successful!', 'success');
        
        // Display the response
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          const textResponse = data.candidates[0].content.parts[0].text;
          responseDiv.textContent = textResponse;
          responseDiv.style.display = 'block';
        } else {
          responseDiv.textContent = "No text response found in the API result.";
          responseDiv.style.display = 'block';
        }
        
        console.log('Success:', data);
      })
      .catch((error) => {
        // Show error message
        showStatus('Error: ' + error.message, 'error');
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Send to Gemini';
      });
    }
    
    // Function to show status messages
    function showStatus(message, type) {
      statusDiv.textContent = message;
      statusDiv.className = 'status ' + type;
      statusDiv.style.display = 'block';
      
      // Hide the status message after 5 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  });