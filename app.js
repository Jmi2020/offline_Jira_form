document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jira-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    try {
      // Save form data locally
      const timestamp = new Date().getTime();
      localStorage.setItem(`form-${timestamp}`, JSON.stringify(formJSON));
      
      // Show a success message
      showMessage('Form data saved locally.', 'success');
    } catch (error) {
      console.error('Error saving form data locally:', error.message);
      showMessage('Error saving form data locally.', 'error');
    }

    // Check if online and sync with Jira API
    if (navigator.onLine) {
      await syncWithJira();
    }
  });
});

window.addEventListener('online', async () => {
  await syncWithJira();
});

async function syncWithJira() {
  for (const key in localStorage) {
    if (key.startsWith('form-')) {
      const formJSON = JSON.parse(localStorage.getItem(key));

      // Transform form data to match Jira API requirements
      const jiraData = {
        fields: {
          project: { key: formJSON.project },
          issuetype: { name: formJSON['issue-type'] },
          summary: formJSON.summary,
          components: [{ name: formJSON.components }],
          customfield_rigtype: formJSON['rig-type'],
          customfield_rigid: formJSON['rig-id'],
          description: formJSON.description,
          priority: { name: formJSON.priority },
          environment: formJSON.environment,
        },
      };

      try {
        // Replace with your Jira API URL and credentials
        const response = await fetch('https://your-instance.atlassian.net/rest/api/3/issue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('email@example.com:your-api-token'),
          },
          body: JSON.stringify(jiraData),
        });

        if (response.ok) {
          // Remove successfully synced form data from local storage
          localStorage.removeItem(key);
          showMessage('Form data synced with Jira successfully.', 'success');
        } else {
          console.error('Error syncing with Jira:', response.statusText);
          showMessage('Error syncing with Jira. Please try again later.', 'error');
        }
      } catch (error) {
        console.error('Error syncing with Jira:', error.message);
        showMessage('Error syncing with Jira. Please try again later.', 'error');
      }
    }
  }
}

function showMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;

  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}
