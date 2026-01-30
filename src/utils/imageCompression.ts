/**
 * Compresses an image file using HTML5 Canvas
 * @param file The original File object
 * @param maxWidth Maximum width of the output image
 * @param quality Quality from 0 to 1 (default 0.7)
 * @returns Promise resolving to a compressed Blob/File or DataURL
 */
export const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.7
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Resize logic
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Export as JPEG with quality reduction
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };

            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
