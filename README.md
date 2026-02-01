# Personal Portfolio

A modern, minimal portfolio website with admin panel for managing content.

## 🚀 Features

- **Notion-style design** - Warm, minimal aesthetic
- **Admin panel** - Edit profile, work experience, and projects
- **Persistent data** - Changes save instantly to frontend
- **Docker support** - Easy containerized deployment
- **Test suite** - 39 unit tests

## 📦 Quick Start

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Run development server
npm run dev
```

Open http://localhost:3000

### Docker Deployment

```bash
# Build and run
docker-compose up -d

# Access at http://localhost:3030
```

## ⚙️ Environment Variables

Create `.env.local` with:

```env
# NextAuth (generate: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name
```

## 🚀 Deploy to Vercel

1. **Push to GitHub**
2. **Import to Vercel**: https://vercel.com/import
3. **Add Environment Variables** in Vercel dashboard:
   - `NEXTAUTH_SECRET` - Generate a secure key
   - `NEXTAUTH_URL` - Your Vercel URL (e.g., `https://your-app.vercel.app`)
   - `ADMIN_EMAIL` - Your admin email
   - `ADMIN_PASSWORD` - Your admin password
   - `ADMIN_NAME` - Your display name

4. **Deploy!**

## 🧪 Testing

```bash
npm test           # Run tests
npm run test:coverage  # With coverage
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/     # Homepage
│   ├── admin/        # Admin panel
│   └── api/          # API routes
├── components/       # UI components
├── data/            # Portfolio content (JSON)
└── lib/             # Auth config
```

## 🔐 Admin Access

After deployment, login at `/admin/login` with your configured credentials.

## 📝 License

MIT
