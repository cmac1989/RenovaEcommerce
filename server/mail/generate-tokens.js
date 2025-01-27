const { google } = require('googleapis');
const app = require('express');

// OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
    '595612368789-11lkfbgcgn8decreuaijcp8dknjuampn.apps.googleusercontent.com', // Client ID
    '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', // Client Secret
    'http://localhost:3000/oauth2callback' // Your registered redirect URI (replace with your own if needed)
);

// Scopes define the permissions your app will request
const scopes = ['https://mail.google.com/'];

// Generate Auth URL
const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

console.log('Authorize this app by visiting this url:', url);

// Handle OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;  // Extract the authorization code from the query parameters
    try {
        const { tokens } = await oauth2Client.getToken(code);  // Exchange code for tokens
        oauth2Client.setCredentials(tokens);
        res.send('Authorization successful! Tokens received.');
    } catch (error) {
        res.send('Error while trying to retrieve access token.');
        console.error(error);
    }
});
