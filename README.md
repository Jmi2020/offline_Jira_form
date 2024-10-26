# Offline Jira Form

This project provides an offline form for submitting issues to Jira. The form data is saved locally when offline and synced with Jira when the user is back online.

## Project Structure
.   
├── app.js  
├── index.html   
├── manifest.appcache   
└── style.css  

### Files

- **app.js**: Contains the JavaScript code for handling form submission, saving data locally, and syncing with Jira.
- **index.html**: The HTML file that contains the form structure.
- **manifest.appcache**: The cache manifest file for enabling offline capabilities.
- **style.css**: The CSS file for styling the form.

## Features

- **Offline Form Submission**: Save form data locally when offline.
- **Online Sync**: Automatically sync form data with Jira when back online.
- **User Notifications**: Show success or error messages to the user.