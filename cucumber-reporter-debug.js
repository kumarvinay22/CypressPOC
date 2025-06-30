const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Function to format date for folder name
function getFormattedDate() {
    const date = new Date();
    return date.getFullYear() +
           ('0' + (date.getMonth() + 1)).slice(-2) +
           ('0' + date.getDate()).slice(-2) + '_' +
           ('0' + date.getHours()).slice(-2) +
           ('0' + date.getMinutes()).slice(-2) +
           ('0' + date.getSeconds()).slice(-2);
}

// Create timestamped report directory
const timestamp = getFormattedDate();
const reportDir = `reports/cucumber-html-report_${timestamp}`;

// Make sure report directory exists
if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

// Check and copy video files 
const videosDir = path.join(__dirname, 'reports', 'videos');
const reportVideosDir = path.join(__dirname, reportDir, 'videos');
const videos = [];

if (fs.existsSync(videosDir)) {
    if (!fs.existsSync(reportVideosDir)) {
        fs.mkdirSync(reportVideosDir, { recursive: true });
    }
    
    fs.readdirSync(videosDir)
        .filter(file => file.endsWith('.mp4'))
        .forEach(file => {
            const sourceVideoPath = path.join(videosDir, file);
            const destVideoPath = path.join(reportVideosDir, file);
            try {
                fs.copyFileSync(sourceVideoPath, destVideoPath);
                videos.push({
                    name: file,
                    path: destVideoPath
                });
                console.log(`Copied video: ${file} to ${destVideoPath}`);
            } catch (error) {
                console.error(`Error copying video ${file}:`, error);
            }
        });
    console.log('Available videos:', videos.map(v => v.name));
}

// Check and copy screenshot files
const screenshotsDir = path.join(__dirname, 'reports', 'screenshots');
const reportScreenshotsDir = path.join(__dirname, reportDir, 'screenshots');
const screenshots = [];

if (fs.existsSync(screenshotsDir)) {
    if (!fs.existsSync(reportScreenshotsDir)) {
        fs.mkdirSync(reportScreenshotsDir, { recursive: true });
    }
    
    fs.readdirSync(screenshotsDir)
        .filter(file => file.endsWith('.png'))
        .forEach(file => {
            const sourceScreenshotPath = path.join(screenshotsDir, file);
            const destScreenshotPath = path.join(reportScreenshotsDir, file);
            try {
                fs.copyFileSync(sourceScreenshotPath, destScreenshotPath);
                screenshots.push({
                    name: file,
                    path: destScreenshotPath
                });
                console.log(`Copied screenshot: ${file} to ${destScreenshotPath}`);
            } catch (error) {
                console.error(`Error copying screenshot ${file}:`, error);
            }
        });
    console.log('Available screenshots:', screenshots.map(s => s.name));
}

// Add a debug information file to report
const debugInfoFile = path.join(reportDir, 'debug-info.html');
const debugInfo = `
<!DOCTYPE html>
<html>
<head>
    <title>Report Debug Information</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { color: #333; }
        .section { margin-bottom: 30px; }
        .file-list { background: #f5f5f5; padding: 10px; border-radius: 4px; }
        .file-item { margin-bottom: 10px; }
        img { max-width: 100%; border: 1px solid #ddd; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>Report Debug Information</h1>
    
    <div class="section">
        <h2>Screenshots</h2>
        <div class="file-list">
            ${screenshots.map(s => `
                <div class="file-item">
                    <p><strong>Filename:</strong> ${s.name}</p>
                    <p><strong>Path:</strong> ${s.path}</p>
                    <img src="../screenshots/${s.name}" alt="${s.name}" />
                </div>
            `).join('<hr>')}
        </div>
    </div>

    <div class="section">
        <h2>Videos</h2>
        <div class="file-list">
            ${videos.map(v => `
                <div class="file-item">
                    <p><strong>Filename:</strong> ${v.name}</p>
                    <p><strong>Path:</strong> ${v.path}</p>
                    <video width="320" height="240" controls>
                        <source src="../videos/${v.name}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `).join('<hr>')}
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync(debugInfoFile, debugInfo);
console.log(`Debug info written to: ${debugInfoFile}`);

// Generate the report
reporter.generate({
    jsonDir: 'reports/cucumber/',
    reportPath: reportDir,
    pageTitle: 'Unified Test Framework Report',
    reportName: `Test Execution Report - ${timestamp}`,
    metadata: {
        browser: {
            name: process.env.BROWSER || 'chrome',
            version: '116'
        },
        device: process.env.DEVICE || 'Local test machine',
        platform: {
            name: process.platform === 'win32' ? 'windows' : process.platform,
            version: process.env.OS_VERSION || '10'
        }
    },
    displayDuration: true,
    durationInMS: true,
    displayReportTime: true,
    hideMetadata: false,
    disableLog: false,
    // Use customData to show a link to our debug page
    customData: {
        title: 'Test Execution Info',
        data: [
            {label: 'Debug Info Page', value: `<a href="debug-info.html" target="_blank">Click here for debug info</a>`},
            {label: 'Project', value: 'Unified Test Framework'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Test Runner', value: process.env.TEST_RUNNER || 'Not specified'},
            {label: 'Device', value: process.env.DEVICE || 'Not specified'}
        ]
    }
});

console.log(`
===========================================================================
    Multiple Cucumber HTML report generated in:
    ${path.join(__dirname, reportDir, 'index.html')}
===========================================================================

    Debug information available at:
    ${path.join(__dirname, debugInfoFile)}
===========================================================================
`);
