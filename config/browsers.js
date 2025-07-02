const devices = {
    iPhone: {
        viewportWidth: 390,
        viewportHeight: 844,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        deviceScaleFactor: 3,
        name: 'iPhone 13 Pro'
    },
    pixel: {
        viewportWidth: 412,
        viewportHeight: 915,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36',
        isMobile: true,
        deviceScaleFactor: 2.625,
        name: 'Pixel 6'
    },
    iPad: {
        viewportWidth: 1024,
        viewportHeight: 1366,
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        deviceScaleFactor: 2,
        name: 'iPad Pro 12.9'
    },
    androidTablet: {
        viewportWidth: 1280,
        viewportHeight: 800,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        isMobile: true,
        deviceScaleFactor: 1.5,
        name: 'Samsung Galaxy Tab S7'
    },
    desktop: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        isMobile: false,
        deviceScaleFactor: 1,
        name: 'Desktop Chrome'
    }
};

module.exports = {
    cypress: {
        chrome: {
            name: 'Chrome',
            devices: devices
        },
        firefox: {
            name: 'Firefox',
            devices: { desktop: devices.desktop }
        },
        edge: {
            name: 'Edge',
            devices: devices
        }
    }
};
