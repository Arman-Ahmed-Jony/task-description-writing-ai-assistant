// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the HTML elements
    const taskDetails = document.getElementById('taskDetails');
    const submitButton = document.getElementById('submitButton');
    const settingsButton = document.getElementById('settingsButton');
    const statusDiv = document.getElementById('status');
    const responseDiv = document.getElementById('response');
    const configWarning = document.getElementById('configWarning');
    
    // Load saved task details from storage
    chrome.storage.local.get(['taskDetails', 'apiKey', 'model'], function(result) {
      if (result.taskDetails) {
        taskDetails.value = result.taskDetails;
      }
      
      // Check if API key and model are set
      if (!result.apiKey || !result.model) {
        configWarning.style.display = 'block';
        submitButton.disabled = true;
      }
    });
    
    // Save task details when they change
    taskDetails.addEventListener('input', function() {
      chrome.storage.local.set({
        'taskDetails': taskDetails.value
      });
    });
    
    // Handle the settings button click
    settingsButton.addEventListener('click', function() {
      chrome.runtime.openOptionsPage();
    });
    
    // Handle the submit button click
    submitButton.addEventListener('click', makeApiCall);
    
    // Function to make the API call
    function makeApiCall() {
      // Check if task details are entered
      if (!taskDetails.value.trim()) {
        showStatus('Please enter task details', 'error');
        return;
      }
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Processing...';
      responseDiv.style.display = 'none';
      
      // Get API key and model from storage
      chrome.storage.local.get(['apiKey', 'model'], function(result) {
        // Validate API key and model are set
        if (!result.apiKey || !result.model) {
          showStatus('Please configure API key and model in settings', 'error');
          submitButton.disabled = false;
          submitButton.textContent = 'Send to Gemini';
          configWarning.style.display = 'block';
          return;
        }
        
        // Prepare the request data
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
        
        // Construct the API URL
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${result.model}:generateContent?key=${result.apiKey}`;
        
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
        //   showStatus('Request successful!', 'success');
          
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