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

// Function to copy video files and return their paths
function copyAndGetVideoFiles(reportDir) {
    const videosDir = path.join(__dirname, 'reports', 'videos');
    const reportVideosDir = path.join(__dirname, reportDir, 'videos');
    let videos = [];

    if (fs.existsSync(videosDir)) {
        // Create videos directory in report folder
        if (!fs.existsSync(reportVideosDir)) {
            fs.mkdirSync(reportVideosDir, { recursive: true });
        }

        // Copy and track videos
        videos = fs.readdirSync(videosDir)
            .filter(file => file.endsWith('.mp4'))
            .map(file => {
                const sourceVideoPath = path.join(videosDir, file);
                const destVideoPath = path.join(reportVideosDir, file);
                
                try {
                    fs.copyFileSync(sourceVideoPath, destVideoPath);
                    console.log(`Copied video: ${file} to ${destVideoPath}`);
                    return {
                        name: file,
                        relativePath: `videos/${file}`
                    };
                } catch (error) {
                    console.error(`Error copying video ${file}:`, error);
                    return null;
                }
            })
            .filter(video => video !== null);

        console.log('Available videos:', videos);
    } else {
        console.log('No videos directory found at:', videosDir);
    }

    return videos;
}

// Function to copy screenshot files and return their paths
function copyAndGetScreenshotFiles(reportDir) {
    const screenshotsDir = path.join(__dirname, 'reports', 'screenshots');
    const reportScreenshotsDir = path.join(__dirname, reportDir, 'screenshots');
    let screenshots = [];

    if (fs.existsSync(screenshotsDir)) {
        // Create screenshots directory in report folder
        if (!fs.existsSync(reportScreenshotsDir)) {
            fs.mkdirSync(reportScreenshotsDir, { recursive: true });
        }

        // Copy and track screenshots
        screenshots = fs.readdirSync(screenshotsDir)
            .filter(file => file.endsWith('.png'))
            .map(file => {
                const sourceScreenshotPath = path.join(screenshotsDir, file);
                const destScreenshotPath = path.join(reportScreenshotsDir, file);
                
                try {
                    fs.copyFileSync(sourceScreenshotPath, destScreenshotPath);
                    console.log(`Copied screenshot: ${file} to ${destScreenshotPath}`);
                    return {
                        name: file,
                        relativePath: `screenshots/${file}`
                    };
                } catch (error) {
                    console.error(`Error copying screenshot ${file}:`, error);
                    return null;
                }
            })
            .filter(screenshot => screenshot !== null);

        console.log('Available screenshots:', screenshots);
    } else {
        console.log('No screenshots directory found at:', screenshotsDir);
    }

    return screenshots;
}

// Function to generate HTML for media (video or image)
function generateMediaHtml(mediaPath, scenarioName, type = 'video') {
    // Convert Windows path to web path
    const relativePath = mediaPath.replace(/\\/g, '/');
    
    if (type === 'video') {
        return `
            <div class="embed" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 10px; color: #0366d6; font-size: 16px; font-weight: bold;">🎥 Test Recording for: ${scenarioName}</div>
                <video style="width: 100%; max-width: 800px; margin: 0 auto; display: block; border-radius: 4px;" controls>
                    <source src="../${relativePath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
    } else {
        // For images, try both relative and direct paths
        const directPath = relativePath.startsWith('screenshots/') ? relativePath : `screenshots/${relativePath}`;
        return `
            <div class="embed" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 10px; color: #dc3545; font-size: 16px; font-weight: bold;">📷 Failure Screenshot for: ${scenarioName}</div>
                <img src="../${directPath}" 
                     onerror="this.onerror=null; this.src='../${relativePath}';"
                     style="max-width: 100%; height: auto; margin: 0 auto; display: block; border-radius: 4px; border: 1px solid #ddd;" />
            </div>
        `;
    }
}

// Create timestamped report directory
const timestamp = getFormattedDate();
const reportDir = `reports/cucumber-html-report_${timestamp}`;

// Get execution start time
const startTime = new Date();

// Create the report directory if it doesn't exist
if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

// Copy videos and screenshots and get their paths
const videos = copyAndGetVideoFiles(reportDir);
const screenshots = copyAndGetScreenshotFiles(reportDir);

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
    customData: {
        title: 'Test Execution Info',
        data: [
            {label: 'Project', value: 'Unified Test Framework'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Test Runner', value: process.env.TEST_RUNNER || 'Not specified'},
            {label: 'Device', value: process.env.DEVICE || 'Not specified'},
            {label: 'Execution Start Time', value: startTime.toISOString()},
            {label: 'Execution End Time', value: new Date().toISOString()}
        ]
    },
    displayDuration: true,
    durationInMS: true,
    displayReportTime: true,
    hideMetadata: false,
    disableLog: false,
    postProcessFeatureData: (featureData) => {
        console.log('\nProcessing feature:', featureData.name);
        
        featureData.elements.forEach(scenario => {
            console.log('\nProcessing scenario:', scenario.name);
            const scenarioName = scenario.name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();

            // Embed video with absolute path
            const expectedVideoName = `${scenarioName}.mp4`;
            const matchingVideo = videos.find(video => video.name === expectedVideoName);
            if (matchingVideo) {
                const videoAbsPath = path.join(reportDir, matchingVideo.relativePath);
                console.log('Embedding video with absolute path:', videoAbsPath);
                const videoStep = {
                    keyword: 'After',
                    name: '📼 Test Recording',
                    result: {
                        status: 'passed',
                        duration: 0
                    },
                    embeddings: [{
                        data: `<div class="embed"><video style="max-width:100%;border-radius:4px;" controls><source src="file://${videoAbsPath}" type="video/mp4">Your browser does not support the video tag.</video></div>`,
                        mime_type: 'text/html'
                    }]
                };
                if (!scenario.steps) scenario.steps = [];
                scenario.steps.push(videoStep);
            }

            // Embed screenshot with absolute path for failed scenarios
            if (scenario.status === 'failed') {
                const expectedScreenshotName = `${scenarioName}.png`;
                const matchingScreenshot = screenshots.find(screenshot => screenshot.name.toLowerCase() === expectedScreenshotName);
                if (matchingScreenshot) {
                    const screenshotAbsPath = path.join(reportDir, matchingScreenshot.relativePath);
                    console.log('Embedding screenshot with absolute path:', screenshotAbsPath);
                    const screenshotStep = {
                        keyword: 'After',
                        name: '📸 Failure Screenshot',
                        result: {
                            status: 'failed',
                            duration: 0
                        },
                        embeddings: [{
                            data: `<div class="embed"><img src="file://${screenshotAbsPath}" style="max-width:100%;border:1px solid #ddd;" /></div>`,
                            mime_type: 'text/html'
                        }]
                    };
                    if (!scenario.steps) scenario.steps = [];
                    scenario.steps.push(screenshotStep);
                }
            }
        });
        
        return featureData;
    },
    scenarioTimestamp: true
});

function embedMediaAsBase64(filePath, type) {
    const mediaData = fs.readFileSync(filePath).toString('base64');
    if (type === 'image') {
        return `<img src="data:image/png;base64,${mediaData}" style="max-width:100%;border:1px solid #ddd;" />`;
    } else if (type === 'video') {
        return `<video style="max-width:100%;border-radius:4px;" controls><source src="data:video/mp4;base64,${mediaData}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }
    return '';
}
