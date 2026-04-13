# Style Specification: etecGamesRemake-frontend

## Color Palette

### Primary Colors
- **Primary Purple**: `#6e42ca` - Used for main interactive elements, buttons, and accents
- **Light Purple**: `#a67eec` - Used for hover states and secondary accents

### Background Colors
- **Background Dark**: `#0f1117` - Main page background
- **Surface Dark**: `#13151f` - Card backgrounds, form elements
- **Border Color**: `#1c1e2e` - Borders and dividers
- **Faint Background**: `#3a3d52` - Subtle backgrounds and placeholders

### Text Colors
- **Primary Text**: `#f0f0f8` - Main text color
- **Muted Text**: `#555878` - Secondary text, labels, and placeholders
- **Faint Text**: `#3a3d52` - Very light text for subtle elements

### Interactive Elements
- **Hover States**: `#5a32b0` - Darker purple for button hover states
- **Selection Background**: `rgba(110, 66, 202, 0.3)` - Text selection highlight

## Typography

### Font Families
- **Display Font**: 'Syne', sans-serif - Used for headings and titles
- **Body Font**: 'DM Sans', sans-serif - Used for body text and interface elements

### Font Sizes and Weights
- **Headings**: 
  - H1/H2: 1.8rem to 2.8rem (clamp function for responsive sizing)
  - H3/H4: 1.5rem to 2rem
- **Body Text**: 16px base size (1rem)
- **Labels/Small Text**: 0.78rem to 0.95rem
- **Weights**:
  - Regular: 400, 500
  - Bold: 700, 800

## Spacing System

### Margins and Paddings
- **Small**: 8px
- **Medium**: 12px, 16px
- **Large**: 20px, 24px, 32px
- **Extra Large**: 40px, 48px, 64px

### Component Spacing
- Buttons: 7px to 13px padding
- Inputs: 12px to 16px padding
- Cards: 24px to 48px padding
- Sections: 20px to 40px spacing

## Component Styles

### Buttons
#### Primary Button (`.nav-btn-primary`, `.ag-btn-primary`)
- Background: `#6e42ca`
- Hover: `#5a32b0` with shadow
- Text Color: White
- Border Radius: 8px
- Shadow on hover: `0 8px 24px rgba(110, 66, 202, 0.35)`

#### Ghost Button (`.nav-btn-ghost`, `.ag-btn-ghost`)
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Text Color: `#c0c4d8`
- Hover: Background and border change to purple tones

#### Outline Button (`.nav-btn-outline`)
- Background: Transparent
- Border: `1px solid #2a2d3e`
- Text Color: `#7b7f96`
- Hover: Text color changes to `#f0f0f8` and border becomes `#555878`

### Forms and Inputs
- Background: `#13151f`
- Border: `1px solid #1c1e2e`
- Focus State: Border becomes `#6e42ca` with glow effect
- Placeholder Color: `#3a3d52`
- Border Radius: 8px

### Cards and Containers
- Background: `#13151f`
- Border: `1px solid #1c1e2e`
- Rounded Corners: 8px to 12px
- Box Shadow: Light shadow for depth

### Navigation Bar
- Background: `rgba(15, 17, 23, 0.7)` with backdrop blur
- Scrolled State: `rgba(13, 15, 24, 0.95)` with box shadow
- Border Bottom: `1px solid rgba(110, 66, 202, 0.2)`

### Footer
- Background: `#0d0f18`
- Gradient Line: Linear gradient from transparent to `#6e42ca` to transparent
- Social Buttons: Hover with purple background and shadow

## Responsive Design

### Breakpoints
- Mobile: Up to 768px
- Tablet: 769px and above
- Desktop: 1024px and above

### Grid System
- Main Container: Max width of 1280px
- Games Page: Two-column layout (sidebar + main content)
- Add Game Page: Responsive grid that stacks on mobile

## Interactive Elements

### Hover States
- Buttons: Transform with slight lift and shadow
- Links: Color change to purple tones
- Form elements: Border color change and glow effect

### Transitions
- All interactive elements have smooth transitions (0.2s)
- Background changes, color changes, and transforms are animated

## Visual Effects

### Shadows
- Buttons on hover: 0 8px 24px rgba(110, 66, 202, 0.35)
- Navigation bar: 0 4px 32px rgba(0, 0, 0, 0.4)
- Scrollbar thumb: Hover effect to purple

### Gradients
- Background gradients for cards and sections
- Text gradients for accent elements (e.g., `.auth-side-accent`)
- Social buttons with hover effects

## Design Principles

1. **Dark Theme**: Consistent dark interface with purple accents
2. **Modern UI**: Clean, minimal design with appropriate spacing
3. **Consistency**: Uniform styling across all components and pages
4. **Accessibility**: Sufficient color contrast ratios for text elements
5. **Responsive**: Adapts to different screen sizes and devices

## Components

### Navbar
- Fixed top position
- Backdrop blur effect
- Responsive behavior on scroll
- Purple accent colors for interactive elements

### Footer
- Gradient line separator
- Social media buttons with hover effects
- Copyright information with purple links

### Forms
- Consistent input styling
- Clear visual hierarchy
- Appropriate spacing between fields
- Validation error states

### Cards
- Rounded corners with subtle shadows
- Consistent padding and margins
- Purple accent borders for important elements

This specification provides a comprehensive guide to the visual design system used throughout the etecGamesRemake-frontend application, ensuring consistency and maintainability of the user interface.