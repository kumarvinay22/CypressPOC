# PowerShell script to copy all essential files
# Run this in the source directory

$destinationPath = "C:\YourNewProject\CypressFromHybrid"  # Change this path

# Create destination directory
New-Item -ItemType Directory -Path $destinationPath -Force

# Essential files to copy
$essentialFiles = @(
    "package.json",
    "package-lock.json", 
    "cypress.config.js",
    "test.config.js",
    "test.config.templates.js",
    "switch-config.js",
    "run-tests.js",
    "tsconfig.json",
    ".cypress-cucumber-preprocessorrc.json",
    "cucumber-cypress.js",
    "cucumber-cypress.json",
    "cucumber-reporter.js",
    "README.md",
    "CONFIG-GUIDE.md"
)

# Copy essential files
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination $destinationPath -Force
        Write-Host "✅ Copied: $file"
    } else {
        Write-Host "❌ Missing: $file"
    }
}

# Copy directories with their contents
$directories = @(
    "config",
    "cypress\support",
    "features",
    "scripts"
)

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        $destDir = Join-Path $destinationPath $dir
        New-Item -ItemType Directory -Path $destDir -Force
        Copy-Item "$dir\*" -Destination $destDir -Recurse -Force
        Write-Host "✅ Copied directory: $dir"
    } else {
        Write-Host "❌ Missing directory: $dir"
    }
}

Write-Host "`n🎉 File copy completed!"
Write-Host "📁 Destination: $destinationPath"
Write-Host "`n🚀 Next steps:"
Write-Host "1. cd `"$destinationPath`""
Write-Host "2. npm install"
Write-Host "3. npm run test:config"
