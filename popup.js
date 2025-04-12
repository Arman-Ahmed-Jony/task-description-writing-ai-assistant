const taskTemplate = `Task: [Briefly describe the task]

Description:
[describe the task here.]
Update or implement [feature/module] to handle [specific functionality] based on the following conditions:

Conditions:

- [condition 1]
- [condition 2]
- [condition 3]

Acceptance Criteria:

- [Expected outcome 1]
- [Expected outcome 2]
- [Expected outcome 3]
- [Additional requirements, like performance, UX, or error handling]`;

const makePrompt = (simpleTaskText) => {
  const prompt = `Assume you are a project manager and describing a task to a software developer in an easy and understandable way.
    Improve the following simple task description by elaborating on it and structuring it using the template below. 
    (Briefly describe the task, Description, Update or implement, Conditions, Acceptance Criteria) 
    from the provided text. If some information is missing, indicate it within the brackets.

    Simple Task Text:
    ${simpleTaskText}
    
    Template:
    ${taskTemplate}
    
    Provide the improved task description.`;

  return prompt;
};
// Wait for the DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the HTML elements
  const taskDetails = document.getElementById("taskDetails");
  const submitButton = document.getElementById("submitButton");
  const settingsButton = document.getElementById("settingsButton");
  const statusDiv = document.getElementById("status");
  const responseDiv = document.getElementById("response");
  const configWarning = document.getElementById("configWarning");

  // Load saved task details from storage
  chrome.storage.local.get(
    ["taskDetails", "apiKey", "model"],
    function (result) {
      if (result.taskDetails) {
        taskDetails.value = result.taskDetails;
      }

      // Check if API key and model are set
      if (!result.apiKey || !result.model) {
        configWarning.style.display = "block";
        submitButton.disabled = true;
      }
    }
  );

  // Save task details when they change
  taskDetails.addEventListener("input", function () {
    chrome.storage.local.set({
      taskDetails: taskDetails.value,
    });
  });

  // Handle the settings button click
  settingsButton.addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
  });

  // Handle the submit button click
  submitButton.addEventListener("click", makeApiCall);

  // Handle the copy button click
  copyButton.addEventListener("click", function () {
    // Copy the response text to clipboard
    const textToCopy = responseDiv.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(function () {
        // Visual feedback that copy was successful
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = `
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#137333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `;

        // Reset the button after a short delay
        setTimeout(function () {
          copyButton.innerHTML = originalText;
        }, 2000);
      })
      .catch(function (error) {
        console.error("Could not copy text: ", error);
        showStatus("Failed to copy text", "error");
      });
  });

  // Function to make the API call
  function makeApiCall() {
    // Check if task details are entered
    if (!taskDetails.value.trim()) {
      showStatus("Please enter task details", "error");
      return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    responseDiv.style.display = "none";
    copyButton.style.display = 'none';

    // Get API key and model from storage
    chrome.storage.local.get(["apiKey", "model"], function (result) {
      // Validate API key and model are set
      if (!result.apiKey || !result.model) {
        showStatus("Please configure API key and model in settings", "error");
        submitButton.disabled = false;
        submitButton.textContent = "Send to Gemini";
        configWarning.style.display = "block";
        return;
      }

      const prompt = makePrompt(taskDetails.value);

      // Prepare the request data
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        //   TODO: we will add settings for temperature and maxOutputTokens
        //   generationConfig: {
        //     temperature: 0.7,
        //     maxOutputTokens: 800
        //   }
      };

      // Construct the API URL
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${result.model}:generateContent?key=${result.apiKey}`;

      // Make the API call
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Show success message
          //   showStatus('Request successful!', 'success');

          // Display the response
          if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content
          ) {
            const textResponse = data.candidates[0].content.parts[0].text;
            responseDiv.textContent = textResponse;
            responseDiv.style.display = "block";
            copyButton.style.display = 'flex'; // Show the copy button
          } else {
            responseDiv.textContent =
              "No text response found in the API result.";
            responseDiv.style.display = "block";
            copyButton.style.display = 'flex'; // Show the copy button
          }

          console.log("Success:", data);
        })
        .catch((error) => {
          // Show error message
          showStatus("Error: " + error.message, "error");
          console.error("Error:", error);
        })
        .finally(() => {
          // Reset button state
          submitButton.disabled = false;
          submitButton.textContent = "Send to Gemini";
        });
    });
  }

  // Function to show status messages
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = "status " + type;
    statusDiv.style.display = "block";

    // Hide the status message after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = "none";
    }, 5000);
  }
});
