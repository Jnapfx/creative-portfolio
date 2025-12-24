# Photo Gallery

A minimal, elegant photo gallery website designed for GitHub Pages. Features a responsive grid layout, lightbox viewer, and full-resolution downloads.

![Gallery Preview](assets/img/preview.png)

## Features

- 📱 **Responsive Grid**: 2 columns on mobile, 3 on tablet, 4 on desktop
- 🖼️ **Lightbox Viewer**: Full-screen image viewing with smooth transitions
- ⬇️ **Full-Res Downloads**: Download original resolution images directly
- ⌨️ **Keyboard Navigation**: ESC to close, ←/→ arrows to navigate
- 👆 **Touch Support**: Swipe gestures on mobile devices
- ♿ **Accessible**: Proper alt text, ARIA labels, focus management
- ⚡ **Performance Optimized**: Lazy loading, image preloading

## Project Structure

```
/
├── index.html              # Main gallery page
├── README.md               # This file
└── assets/
    ├── css/
    │   └── styles.css      # All styles
    ├── js/
    │   ├── main.js         # Gallery & lightbox logic
    │   └── photos.js       # Photo data array
    └── img/
        ├── thumbs/         # Thumbnail images
        └── full/           # Full resolution images
```

## How to Add/Replace Images

### 1. Prepare Your Images

Create two versions of each photo:

| Type | Location | Recommended Size | Format |
|------|----------|------------------|--------|
| **Thumbnail** | `assets/img/thumbs/` | ~1200px long edge | JPG (60-80% quality) |
| **Full Resolution** | `assets/img/full/` | Original size | JPG or PNG |

### 2. Name Your Files

Use consistent naming, for example:
- `assets/img/thumbs/01.jpg`
- `assets/img/full/01.jpg`

### 3. Update `photos.js`

Edit `assets/js/photos.js` to add your photos:

```javascript
const PHOTOS = [
    {
        id: 1,
        thumb: "assets/img/thumbs/01.jpg",
        full: "assets/img/full/01.jpg",
        alt: "Description of the photo",
        caption: "Optional caption shown in lightbox"
    },
    // Add more photos...
];
```

### Photo Object Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier (number) |
| `thumb` | Yes | Path to thumbnail image |
| `full` | Yes | Path to full resolution image |
| `alt` | Yes | Descriptive text for accessibility |
| `caption` | No | Optional caption in lightbox (leave empty string if none) |

## Image Optimization Tips

### Creating Thumbnails

Using ImageMagick:
```bash
# Resize to 1200px on longest edge, 75% quality
convert input.jpg -resize 1200x1200\> -quality 75 output.jpg
```

Using macOS Preview:
1. Open image → Tools → Adjust Size
2. Set longest edge to 1200px
3. File → Export → JPEG, ~75% quality

### Recommended Sizes

- **Thumbnails**: 800-1200px long edge, 50-150KB per image
- **Full Resolution**: Original size, optimize without quality loss

### Batch Processing (Optional)

```bash
# Create thumbnails from all images in a folder
for img in *.jpg; do
    convert "$img" -resize 1200x1200\> -quality 75 "thumbs/${img}"
done
```

## Deploy to GitHub Pages

### Step 1: Create Repository

1. Create a new GitHub repository
2. Clone it locally or upload files directly

### Step 2: Upload Files

```bash
git add .
git commit -m "Initial gallery upload"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your site will be live at: `https://username.github.io/repository-name`

### Step 4: Verify

Wait 1-2 minutes for deployment, then visit your URL.

## Customization

### Change Title & Subtitle

Edit `index.html`:
```html
<h1 class="header-title">Your Gallery Title</h1>
<p class="header-subtitle">Your subtitle here</p>
```

### Modify Colors

Edit CSS variables in `assets/css/styles.css`:
```css
:root {
    --color-bg: #fafafa;        /* Background color */
    --color-surface: #ffffff;   /* Card background */
    --color-text: #1a1a1a;      /* Main text color */
    --color-text-muted: #666666;/* Secondary text */
    --radius: 12px;             /* Border radius */
}
```

### Adjust Grid Layout

Modify breakpoints in CSS:
```css
/* 2 columns on mobile (default) */
.gallery {
    grid-template-columns: repeat(2, 1fr);
}

/* 3 columns on tablet (640px+) */
@media (min-width: 640px) {
    .gallery {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 4 columns on desktop (1024px+) */
@media (min-width: 1024px) {
    .gallery {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

1. **Optimize thumbnails** - Keep under 150KB each
2. **Use WebP** - If browser support allows, use WebP for smaller files
3. **Enable caching** - GitHub Pages handles this automatically
4. **Limit gallery size** - For 50+ images, consider pagination

## Troubleshooting

### Images not loading?
- Check file paths in `photos.js` match actual file locations
- Ensure file extensions match exactly (case-sensitive on some servers)
- Verify images are committed to git

### Lightbox not opening?
- Open browser console (F12) and check for JavaScript errors
- Ensure `photos.js` loads before `main.js` in HTML

### Layout broken on mobile?
- Check viewport meta tag exists in `<head>`
- Verify CSS file is loading correctly

## License

Free to use for personal and commercial projects.

---

Made with ❤️ for beautiful photo galleries
c