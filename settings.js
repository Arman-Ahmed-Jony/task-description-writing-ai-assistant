// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the HTML elements
    const apiKey = document.getElementById('apiKey');
    const model = document.getElementById('model');
    const saveButton = document.getElementById('saveButton');
    const backButton = document.getElementById('backButton');
    const statusDiv = document.getElementById('status');
    
    // Load saved values from storage
    chrome.storage.local.get(['apiKey', 'model'], function(result) {
      if (result.apiKey) apiKey.value = result.apiKey;
      if (result.model) model.value = result.model;
    });
    
    // Handle the save button click
    saveButton.addEventListener('click', saveSettings);
    
    // Handle the back button click
    backButton.addEventListener('click', function() {
      // Close the settings page and go back to popup
      window.close();
    });
    
    // Function to save settings
    function saveSettings() {
      // Validate inputs
      if (!apiKey.value.trim()) {
        showStatus('Please enter your Gemini API key', 'error');
        return;
      }
      
      if (!model.value) {
        showStatus('Please select a model', 'error');
        return;
      }
      
      // Save values to storage
      chrome.storage.local.set({
        'apiKey': apiKey.value,
        'model': model.value
      }, function() {
        showStatus('Settings saved successfully!', 'success');
      });
    }
    
    // Function to show status messages
    function showStatus(message, type) {
      statusDiv.textContent = message;
      statusDiv.className = 'status ' + type;
      statusDiv.style.display = 'block';
      
      // Hide the status message after 5 seconds if it's a success message
      if (type === 'success') {
        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 3000);
      }
    }
  });