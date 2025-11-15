# SEO Setup Guide for Monk

This guide covers the manual SEO tasks that need to be completed after deployment.

---

## 1. Google Search Console: Verify Site & Submit Sitemap

### Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property" → "URL prefix"
4. Enter: `https://monk.haus`
5. Click "Continue"

### Step 2: Verify Ownership
Choose one of these verification methods:

**Option A: HTML File Upload (Recommended)**
1. Download the HTML verification file Google provides
2. Place it in your `public/` folder
3. Deploy the site
4. Click "Verify" in Search Console

**Option B: HTML Tag**
1. Copy the meta tag Google provides (looks like: `<meta name="google-site-verification" content="..."/>`)
2. Add it to `app/layout.tsx` in the `<head>` section
3. Deploy the site
4. Click "Verify" in Search Console

**Option C: DNS Record**
1. Add the TXT record Google provides to your domain's DNS settings
2. Wait for DNS propagation (can take up to 48 hours)
3. Click "Verify" in Search Console

### Step 3: Submit Sitemap
1. Once verified, go to "Sitemaps" in the left sidebar
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Your sitemap URL is: `https://monk.haus/sitemap.xml`

### Step 4: Monitor
- Check "Coverage" report for indexing status
- Review "Performance" for search queries and clicks
- Fix any errors in "Enhancements" section

---

## 2. Google Analytics (GA4): Installation

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon) → "Create Property"
3. Enter property name: `Monk`
4. Select timezone and currency
5. Click "Next" → "Create"

### Step 2: Get Measurement ID
1. In your new property, go to "Admin" → "Data Streams"
2. Click "Add stream" → "Web"
3. Enter:
   - Website URL: `https://monk.haus`
   - Stream name: `Monk Website`
4. Click "Create stream"
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Website
**Option A: I can add it for you**
- Provide me with your Measurement ID (e.g., `G-XXXXXXXXXX`)
- I'll add the GA4 script to your site

**Option B: Add it yourself**
1. In GA4, go to "Admin" → "Data Streams" → Click your stream
2. Scroll to "Tagging instructions"
3. Copy the `gtag.js` script
4. Add it to `app/layout.tsx` in the `<head>` section, before the closing `</head>` tag

### Step 4: Verify Installation
1. Visit your site: `https://monk.haus`
2. In GA4, go to "Reports" → "Realtime"
3. You should see your visit appear within 30 seconds

---

## 3. Directory Submissions: Design/Dev Directories

Submit your site to these directories for backlinks and visibility:

### Design Directories
1. **Awwwards** (https://www.awwwards.com/)
   - Submit: `https://monk.haus`
   - Category: Portfolio/Studio
   - Wait for jury review

2. **The FWA** (https://thefwa.com/)
   - Submit: `https://monk.haus`
   - Category: Portfolio
   - Free submission available

3. **CSS Design Awards** (https://www.cssdesignawards.com/)
   - Submit: `https://monk.haus`
   - Category: Portfolio

4. **SiteInspire** (https://www.siteinspire.com/)
   - Submit: `https://monk.haus`
   - Category: Portfolio

5. **Dribbble** (https://dribbble.com/)
   - Post screenshots of your work
   - Link to `https://monk.haus` in profile

### Development Directories
1. **GitHub** (if you have a public repo)
   - Add link to `https://monk.haus` in README
   - Add to profile bio

2. **Product Hunt** (https://www.producthunt.com/)
   - Submit as a "Product" or "Maker"
   - Launch on a Tuesday-Thursday for best visibility

3. **Hacker News** (https://news.ycombinator.com/)
   - Post in "Show HN" format
   - Title: "Show HN: Monk – A Studio for Intentional Web Design"

### Local/Business Directories
1. **Google Business Profile** (if applicable)
   - Create/claim your business listing
   - Add website URL

2. **LinkedIn Company Page**
   - Update company page with website URL
   - Post about the launch

---

## 4. Launch Strategy: Share on Owned Channels

### Social Media Posts

**Instagram** (`@_monk.haus_`)
```
We build with intention.

Monk is a studio for focused craft. We create digital experiences with discipline, clarity, and an uncompromising commitment to the work.

Our process is the product.

Visit monk.haus to explore our chronicles.

#webdesign #webdevelopment #designstudio #intentionaldesign
```

**LinkedIn**
```
We're excited to share Monk – a studio for intentional web design and development.

After months of careful craft, we've launched our new website that embodies our philosophy: building with intention, clarity, and an uncompromising commitment to the work.

Our process is the product.

Explore our chronicles at monk.haus

#webdesign #webdevelopment #designstudio #digitalcraft
```

**Twitter/X**
```
We build with intention.

Monk is a studio for focused craft. We create digital experiences with discipline, clarity, and an uncompromising commitment to the work.

Our process is the product.

monk.haus

#webdesign #webdevelopment
```

### Email Announcement (if you have a list)
**Subject:** Introducing Monk – A Studio for Intentional Web Design

**Body:**
```
We're excited to introduce Monk – a studio for intentional web design and development.

After months of careful craft, we've launched our new website that embodies our philosophy: building with intention, clarity, and an uncompromising commitment to the work.

Our process is the product.

Explore our chronicles: monk.haus

We'd love to hear your thoughts.

—
Monk
```

### Blog Post (if you have a blog)
- Write about the design process
- Share behind-the-scenes insights
- Link to specific project pages
- Include screenshots and process images

### Press/Media Outreach
- Reach out to design blogs (Smashing Magazine, A List Apart, etc.)
- Contact design podcast hosts for potential interviews
- Submit to design newsletters (Sidebar, Web Design Weekly, etc.)

---

## Quick Checklist

- [ ] Google Search Console: Property added and verified
- [ ] Google Search Console: Sitemap submitted (`sitemap.xml`)
- [ ] Google Analytics: GA4 property created
- [ ] Google Analytics: Measurement ID added to website
- [ ] Google Analytics: Verified tracking works
- [ ] Awwwards: Submission completed
- [ ] The FWA: Submission completed
- [ ] CSS Design Awards: Submission completed
- [ ] SiteInspire: Submission completed
- [ ] Dribbble: Profile updated with website link
- [ ] LinkedIn: Company page updated
- [ ] Instagram: Launch post published
- [ ] LinkedIn: Launch post published
- [ ] Twitter/X: Launch post published
- [ ] Email: Announcement sent (if applicable)

---

## Notes

- **Sitemap URL**: `https://monk.haus/sitemap.xml`
- **Robots.txt URL**: `https://monk.haus/robots.txt`
- **Canonical URLs**: Already set on all pages
- **Structured Data**: Already implemented (ProfessionalService on homepage, Article on project pages)

---

## Need Help?

If you need me to:
- Add Google Analytics code: Provide your Measurement ID
- Add Google Search Console verification tag: Provide the meta tag
- Update any other code: Let me know what you need

