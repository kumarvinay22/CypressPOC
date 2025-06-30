const devices = {
    iPhone: {
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        deviceScaleFactor: 3,
        name: 'iPhone 13 Pro'
    },
    pixel: {
        viewport: { width: 412, height: 915 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36',
        isMobile: true,
        deviceScaleFactor: 2.625,
        name: 'Pixel 6'
    },
    iPad: {
        viewport: { width: 1024, height: 1366 },
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        deviceScaleFactor: 2,
        name: 'iPad Pro 12.9'
    },
    androidTablet: {
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        isMobile: true,
        deviceScaleFactor: 1.5,
        name: 'Samsung Galaxy Tab S7'
    },
    desktop: {
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        isMobile: false,
        deviceScaleFactor: 1,
        name: 'Desktop Chrome'
    }
};

module.exports = {
    playwright: {
        chrome: {
            name: 'Chrome',
            usePlaywright: true,
            devices: devices
        },
        firefox: {
            name: 'Firefox',
            usePlaywright: true,
            devices: { desktop: devices.desktop }
        },
        webkit: {
            name: 'WebKit',
            usePlaywright: true,
            devices: {
                desktop: devices.desktop,
                iPhone: devices.iPhone,
                iPad: devices.iPad
            }
        },
        edge: {
            name: 'Edge',
            usePlaywright: true,
            devices: devices
        }
    },
    cypress: {
        chrome: {
            name: 'Chrome',
            usePlaywright: false,
            devices: Object.fromEntries(
                Object.entries(devices).map(([key, device]) => [
                    key,
                    {
                        viewportWidth: device.viewport.width,
                        viewportHeight: device.viewport.height,
                        userAgent: device.userAgent,
                        isMobile: device.isMobile,
                        deviceScaleFactor: device.deviceScaleFactor
                    }
                ])
            )
        },
        firefox: {
            name: 'Firefox',
            usePlaywright: false,
            devices: { desktop: {
                viewportWidth: devices.desktop.viewport.width,
                viewportHeight: devices.desktop.viewport.height,
                userAgent: devices.desktop.userAgent,
                isMobile: devices.desktop.isMobile,
                deviceScaleFactor: devices.desktop.deviceScaleFactor
            } }
        },
        edge: {
            name: 'Edge',
            usePlaywright: false,
            devices: Object.fromEntries(
                Object.entries(devices).map(([key, device]) => [
                    key,
                    {
                        viewportWidth: device.viewport.width,
                        viewportHeight: device.viewport.height,
                        userAgent: device.userAgent,
                        isMobile: device.isMobile,
                        deviceScaleFactor: device.deviceScaleFactor
                    }
                ])
            )
        }
    }
};
