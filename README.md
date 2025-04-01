# Custom Shopify Theme

A modern, responsive Shopify theme built with best practices in mind.

## Theme Structure

```
theme/
├── assets/           # Theme assets (CSS, JS, images)
├── config/          # Theme settings and configuration
├── layout/          # Theme layouts
├── sections/        # Theme sections
├── snippets/        # Reusable code snippets
├── templates/       # Page templates
└── locales/         # Translation files
```

## Features

- Responsive design
- Mobile-first approach
- Modern CSS with CSS Grid and Flexbox
- Optimized performance
- Customizable through theme settings
- Product variant selection
- Add to cart functionality
- Lazy loading images
- Mobile menu support

## Customization

### Theme Settings

1. Navigate to your Shopify admin
2. Go to Online Store > Themes
3. Click "Customize" on your theme
4. Use the theme editor to modify:
   - Colors
   - Typography
   - Layout
   - Header and footer content
   - Product page settings

### Code Customization

To modify the theme's code:

1. Make changes in the appropriate files:
   - `assets/base.css` for global styles
   - `assets/theme.js` for JavaScript functionality
   - `sections/` for page sections
   - `templates/` for page layouts

2. Test your changes locally using the Shopify CLI:
   ```bash
   shopify theme dev
   ```

3. Deploy your changes to your store

## Development

### Prerequisites

- Shopify CLI
- Node.js (for development tools)
- Git (for version control)

### Local Development

1. Install the Shopify CLI:
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. Clone this repository:
   ```bash
   git clone [repository-url]
   ```

3. Start local development:
   ```bash
   shopify theme dev
   ```

### Best Practices

- Use semantic HTML
- Follow BEM naming convention for CSS
- Keep JavaScript modular and maintainable
- Optimize images before uploading
- Test across different devices and browsers

## Support

For support, please contact [your contact information].

## License

This theme is licensed under the MIT License - see the LICENSE file for details. 