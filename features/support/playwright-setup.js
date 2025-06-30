const { Before, After } = require('@cucumber/cucumber');
const path = require('path');

Before(async function() {
    if (process.env.TEST_RUNNER === 'playwright') {
        // Initialize the World object which contains our browser and page
        await this.init();
    }
});

After(async function(scenario) {
    if (process.env.TEST_RUNNER === 'playwright' && this.page) {
        // Take screenshot if scenario failed
        if (scenario.result.status === 'FAILED') {
            console.log('Taking screenshot for failed scenario:', scenario.pickle.name);
            try {
                const screenshotFileName = `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
                const screenshotDir = path.join(__dirname, '..', '..', 'reports', 'screenshots');
                const screenshotPath = path.join(screenshotDir, screenshotFileName);
                
                // Ensure screenshots directory exists
                if (!require('fs').existsSync(screenshotDir)) {
                    require('fs').mkdirSync(screenshotDir, { recursive: true });
                }
                
                console.log('Screenshot path:', screenshotPath);
                
                // Take the screenshot
                const buffer = await this.page.screenshot({
                    path: screenshotPath,
                    fullPage: true
                });
                
                // Convert buffer to base64
                const imageData = buffer.toString('base64');
                
                // Attach both the file path and base64 data
                await this.attach(`Screenshot saved to: ${screenshotPath}`, 'text/plain');
                await this.attach(imageData, 'image/png');
                
                console.log('Screenshot saved and attached successfully');
            } catch (error) {
                console.error('Failed to take screenshot:', error);
            }
        }

        // Get video path before closing
        let videoPath = null;
        try {
            videoPath = await this.page.video()?.path();
        } catch (e) {
            console.error('Failed to get video path:', e);
        }

        // Close browser resources
        await this.close();

        // Rename video if available
        if (videoPath) {
            const newVideoPath = `reports/videos/${scenario.pickle.name.replace(/\s+/g, '-').toLowerCase()}.mp4`;
            try {
                require('fs').renameSync(videoPath, newVideoPath);
            } catch (e) {
                console.error('Failed to rename video:', e);
            }
        }
    }
});
