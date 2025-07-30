# AI Task Describer - Browser Extension

## Overview

**AI Task Describer** is a powerful browser extension that leverages Google's Gemini AI to automatically generate detailed, structured task descriptions from simple input text. It's designed to help project managers, team leads, and developers create comprehensive task documentation quickly and efficiently.

## What This App Does

The extension transforms brief task descriptions into well-structured, professional task documentation using a standardized template. It takes simple input like "add user authentication" and converts it into a detailed task description with:

- **Task Overview**: Brief description of the task
- **Detailed Description**: Comprehensive explanation of what needs to be done
- **Implementation Details**: Specific features or modules to update/implement
- **Conditions**: Requirements and constraints
- **Acceptance Criteria**: Expected outcomes and success metrics

## Who This App Is For

### Primary Users:
- **Project Managers**: Create detailed task descriptions for development teams
- **Team Leads**: Structure work items for better team understanding
- **Product Managers**: Convert feature requests into actionable development tasks
- **Scrum Masters**: Generate well-defined user stories and acceptance criteria
- **Technical Writers**: Create structured documentation for development tasks

### Use Cases:
- Converting vague feature requests into detailed specifications
- Creating consistent task documentation across projects
- Standardizing task descriptions for better team communication
- Generating acceptance criteria for quality assurance
- Documenting technical requirements for development teams

## Features

### 🤖 AI-Powered Task Enhancement
- Uses Google's Gemini 2.0 Flash model for intelligent task processing
- Automatically infers missing information and suggests improvements
- Maintains consistent formatting and structure

### ⚙️ Easy Configuration
- Simple settings interface for API key management
- Secure local storage of credentials
- Model selection options

### 📋 Structured Output
- Consistent task template with all necessary sections
- Professional formatting for team collaboration
- Easy-to-copy responses for integration with project management tools

### 🔒 Privacy & Security
- API keys stored locally on your device
- No data sent to third-party servers
- Direct communication with Google's Gemini API

## Installation & Setup

### Prerequisites
1. **Google Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Chrome Browser**: Compatible with Chrome and Chromium-based browsers

### Installation Steps

1. **Download the Extension**
   - Clone or download this repository
   - Extract the files to a local folder

2. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the folder containing the extension files

3. **Configure API Settings**
   - Click the extension icon in your browser toolbar
   - Click the settings icon (gear) in the top right
   - Enter your Gemini API key
   - Select "Gemini 2 Flash" as the model
   - Click "Save Settings"

## How to Use

### Basic Usage

1. **Open the Extension**
   - Click the AI Task Describer icon in your browser toolbar

2. **Enter Task Details**
   - In the text area, describe your task in simple terms
   - Example: "Add user login functionality with email and password"

3. **Generate Enhanced Description**
   - Click "Send to Gemini"
   - Wait for the AI to process and structure your task

4. **Copy and Use**
   - Review the generated structured task description
   - Click "Copy" to copy the formatted text
   - Paste into your project management tool (Jira, Asana, etc.)

### Example Input/Output

**Input:**
```
Add user authentication with email login
```

**Output:**
```
Task: Implement user authentication system with email-based login

Description:
Update or implement the authentication module to handle user login functionality using email addresses as the primary identifier. The system should provide secure access control for the application.

Conditions:
- Users must provide valid email address
- Password must meet security requirements
- Session management for logged-in users
- Error handling for invalid credentials

Acceptance Criteria:
- Users can register with email and password
- Users can login with valid credentials
- Invalid login attempts are properly handled
- Session persists across browser sessions
- Password reset functionality is available
- Security measures prevent brute force attacks
```

## Configuration

### API Key Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in the extension settings
4. The key is stored locally and never shared

### Model Selection
- Currently supports Gemini 2.0 Flash
- Additional models may be added in future updates

## Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Google Gemini API (REST)
- **Storage**: Chrome Extension Storage API
- **Security**: Local credential storage, HTTPS-only API calls

### API Integration
- Uses Google's Generative Language API
- Temperature setting: 0.2 (for consistent output)
- Structured prompt engineering for reliable results

### Browser Compatibility
- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)
- Manifest V3 compliant

## Troubleshooting

### Common Issues

**"Please configure your API key"**
- Go to settings and enter your valid Gemini API key
- Ensure the key is active and has proper permissions

**"Error: Status: 400"**
- Check that your API key is correct
- Verify you have sufficient API quota
- Ensure the selected model is available

**Extension not loading**
- Verify all files are present in the extension directory
- Check Chrome's developer console for errors
- Ensure "Developer mode" is enabled in chrome://extensions/

### Getting Help
- Check that your API key is valid and has proper permissions
- Verify your internet connection
- Ensure the extension has proper permissions

## Privacy & Security

### Data Handling
- **No data collection**: The extension doesn't collect or store your task descriptions
- **Local storage only**: API keys and settings stored locally on your device
- **Direct API calls**: All communication goes directly to Google's Gemini API
- **No third-party servers**: Your data never passes through our servers

### Security Features
- API keys stored securely in Chrome's extension storage
- HTTPS-only communication with Google's API
- No logging or tracking of user interactions

## Contributing

This extension is open for contributions! Areas for improvement:
- Additional AI model support
- Custom task templates
- Integration with project management tools
- Enhanced UI/UX features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or feature requests:
- Check the troubleshooting section above
- Review the technical documentation
- Submit issues through the project repository

---

**Created by Arman Ahmed** | Version 1.0 | Built with ❤️ for better task management 