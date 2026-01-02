/**
 * Auto-Scale Resume to Fit One Page
 * 
 * This script automatically scales resume content to fit exactly one A4 page
 * Add this script to the HTML before </body>
 */

(function () {
    function scaleResumeToFit() {
        // Find the resume container
        const resume = document.querySelector('.resume-container') ||
            document.querySelector('.resume') ||
            document.querySelector('[class*="resume"]') ||
            document.querySelector('[class*="cv"]') ||
            document.body.firstElementChild;

        if (!resume) {
            console.warn('No resume container found');
            return;
        }

        // A4 dimensions in pixels (at 96 DPI)
        const A4_WIDTH_PX = 794; // 210mm
        const A4_HEIGHT_PX = 1123; // 297mm

        // Get actual content dimensions
        const actualHeight = resume.scrollHeight;
        const actualWidth = resume.scrollWidth;

        console.log('Resume dimensions:', { actualWidth, actualHeight });
        console.log('Target dimensions:', { width: A4_WIDTH_PX, height: A4_HEIGHT_PX });

        // Calculate scale factors
        const scaleX = A4_WIDTH_PX / actualWidth;
        const scaleY = A4_HEIGHT_PX / actualHeight;

        // Use the smaller scale to ensure everything fits
        const scale = Math.min(scaleX, scaleY, 1); // Never scale up, only down

        if (scale < 1) {
            console.log(`Scaling resume to ${(scale * 100).toFixed(1)}% to fit one page`);

            // Apply transform
            resume.style.transformOrigin = 'top left';
            resume.style.transform = `scale(${scale})`;
            resume.style.width = `${100 / scale}%`;
            resume.style.height = 'auto';

            // Adjust body height to match scaled content
            document.body.style.height = `${actualHeight * scale}px`;
        } else {
            console.log('Resume already fits on one page');
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scaleResumeToFit);
    } else {
        scaleResumeToFit();
    }

    // Run before print
    window.addEventListener('beforeprint', scaleResumeToFit);
})();
