# DriveFleet Frontend

React + Vite frontend application for the DriveFleet luxury car rental platform.

## Features

- **Modern React 19** with TypeScript
- **Vite** for ultra-fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Framer Motion** for smooth animations
- **React Hot Toast** for notifications

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Explore.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── MyBookings.tsx
│   ├── MyCars.tsx
│   ├── AddCar.tsx
│   └── NotFound.tsx
├── components/         # Reusable components
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── PublicLayout.tsx
│       └── PrivateLayout.tsx
├── context/           # React Context
│   └── AuthContext.tsx
├── lib/              # Utilities
│   └── axios.ts      # API client
├── App.tsx           # Main app
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
cd drivefleet_frontend_cpanel
npm install
```

### Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Configuration

### API Base URL
Update `VITE_API_BASE_URL` in `.env.production` to point to your backend:

```
VITE_API_BASE_URL=https://api.yourdomain.com
```

For development, the default is `http://localhost:3000`.

## Environment Variables

See `.env.example` for a template.

### Development (.env.local)
```
VITE_API_BASE_URL=http://localhost:3000
```

### Production (.env.production)
```
VITE_API_BASE_URL=https://api.yourdomain.com
```

## API Integration

The frontend communicates with the backend API at `/api` endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Current user info
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Add new car
- `DELETE /api/cars/:id` - Delete car
- `POST /api/bookings` - Create booking
- `GET /api/bookings/mine` - Get user bookings

See `src/lib/axios.ts` for the configured API client.

## Features by Page

### Home
- Hero section with featured car
- Stats display
- Call-to-action buttons

### Explore
- List all available vehicles
- Search functionality
- Booking modal with date picker
- Real-time filtering

### Login / Register
- Form validation
- Password requirements
- Error handling
- Redirect to home on success

### My Bookings
- View all user bookings
- Booking details and status
- Dates and total price

### My Cars (Fleet)
- View uploaded vehicles
- Add new vehicle
- Delete vehicle with confirmation
- Track booking count

### Add Car
- Form with all vehicle details
- Image URL input
- Price and description
- Redirect to fleet on success

## Styling

The app uses Tailwind CSS with custom configuration in `tailwind.config.js`. Key colors:

- Primary Dark: `#0a0a0b`
- Secondary Dark: `#161618`
- Accent: `#d4af37` (Gold)
- Text: `#e5e5e7` (White)
- Muted: `#71717a` (Gray)

## Deployment

This app is configured for deployment to **Cloudflare Pages** as a Single Page Application (SPA).

### Quick Deploy to Cloudflare Pages

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/drivefleet-frontend.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Go to Workers & Pages → Create application → Pages
   - Import your GitHub repository
   - Configure build settings:

   | Setting | Value |
   |---------|-------|
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build directory | `dist` |

3. **Deploy**
   - Click "Deploy" and your site will be live at `https://your-project.pages.dev`

### Environment Variables

The API URL is configured via the `.env` file:
```
VITE_API_BASE_URL=https://drivefleet-backend-vercel-6cn38h87h-syfulsharifs-projects.vercel.app
```

### Cloudflare Pages Configuration

The following files handle SPA routing and headers:

- **`public/_redirects`** - Routes all paths to `index.html`
- **`public/_headers`** - Security and cache headers
- **`public/_routes.json`** - Modern Pages routing config

## Dependencies

### Production
- react & react-dom 19.0
- react-router-dom 7.15+
- axios 1.16+
- framer-motion 12.40+
- react-hot-toast 2.6+
- tailwindcss 4.1+
- lucide-react 0.546+

### Development
- vite 6.2+
- typescript 5.8+
- tailwindcss vite plugin

## Common Issues

### API calls return 401
- User session expired
- Check backend is running
- Verify JWT_SECRET matches between frontend and backend

### Pages not loading after build
- Check `.htaccess` is in place
- Verify browser cache is cleared
- Check console for errors

### Tailwind styles not showing
- Run `npm run build` again
- Clear browser cache
- Check Tailwind config is correct

## Performance Tips

- Images are lazy-loaded
- CSS is minified in production
- JavaScript is tree-shaken
- Vite optimizes dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - DriveFleet Project
