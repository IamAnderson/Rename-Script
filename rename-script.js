const fs = require('fs');
const path = require('path');

// Folder path where your images are located
const folderPath = './extracted'; // Change this to your folder path

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

// Read all files in the directory
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter only image files
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });

    // Sort files to ensure consistent ordering
    imageFiles.sort();

    // Rename each image file
    imageFiles.forEach((file, index) => {
        const extension = path.extname(file);
        const newName = `${index + 1}${extension}`;
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(folderPath, newName);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Error renaming ${file}:`, err);
            } else {
                console.log(`Renamed ${file} to ${newName}`);
            }
        });
    });
});