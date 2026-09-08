# GROFASTO DIGITAL SOLUTION
## Official Website & Lead Generation Engine - Hostinger Deployment Guide

**Tagline:** Your Business | Our Technology | More Growth  
**Website:** [www.grofasto.com](https://www.grofasto.com)  
**Location:** Meerut, Uttar Pradesh, India  
**Phone / WhatsApp:** +91 9457690255  
**Core Business:** Website Development, Google Business Profile, Local SEO, Google Ads & Digital Marketing

---

## Complete Project Structure for Hostinger `public_html`

```text
public_html/
│
├── index.html / index.php         # Main High-Conversion Homepage
├── contact.html / contact.php     # Dedicated Clean URL Lead Landing Page (/contact)
├── .htaccess                      # Clean URLs, Security & Performance Headers
├── robots.txt                     # SEO Crawl Rules
├── sitemap.xml                    # Google XML Sitemap
│
├── config/
│   └── database.php               # MySQL Database Connection (PDO) & Business Config
│
├── api/
│   └── submit-lead.php            # Anti-Spam, Validation, MySQL Insert API
│
├── admin/
│   ├── index.php                  # CRM Dashboard & Metrics Overview
│   ├── login.php                  # Secure Admin Authentication (password_verify)
│   ├── leads.php                  # Lead Table & Filtering
│   ├── lead-view.php              # Full Marketing & Attribution Viewer
│   ├── lead-update.php            # Status Management
│   ├── lead-delete.php            # Secure Lead Deletion
│   └── logout.php                 # Session Termination
│
├── assets/
│   ├── css/                       # Stylesheets
│   ├── js/                        # JavaScript & Tracking Handlers
│   └── images/                    # Logos, Icons, Retina Visual Assets
│
├── database/
│   └── database.sql               # MySQL/MariaDB Tables & Initial Admin Schema
│
└── README.md                      # Hostinger Shared Hosting Manual
```

---

## 1. How to Create MySQL Database in Hostinger (hPanel)

1. Log in to your **Hostinger Control Panel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Under your hosting plan, navigate to **Databases** > **Management** (or **MySQL Databases**).
3. Under **Create a New MySQL Database and Database User**:
   - **MySQL Database name:** e.g., `u123456789_grofasto_db`
   - **MySQL Username:** e.g., `u123456789_grofasto_user`
   - **Password:** Enter a strong password (e.g., `Grof@stoSecure#2026`).
4. Click **Create**.
5. Note down the full Database Name, Username, and Password.

---

## 2. How to Import `database.sql`

1. In Hostinger hPanel, go to **Databases** > **phpMyAdmin**.
2. Click **Enter phpMyAdmin** next to your newly created Grofasto database.
3. In phpMyAdmin, click on the **Import** tab at the top.
4. Click **Choose File** and select `database/database.sql` from this project.
5. Click **Go** at the bottom of the page.
6. The `leads` and `admins` tables will be created automatically with indexes.

---

## 3. Where to Enter Database Credentials

Open the file `config/database.php` in your Hostinger File Manager code editor or text editor:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_grofasto_db');        // Put your Hostinger DB Name here
define('DB_USER', 'u123456789_grofasto_user');      // Put your Hostinger DB User here
define('DB_PASSWORD', 'YourHostingerDBPassword');   // Put your Hostinger DB Password here
```

Save the file. Your website is now connected to MySQL.

---

## 4. How to Upload Files to `public_html`

1. In Hostinger hPanel, click **File Manager** (Files > File Manager).
2. Open the **`public_html`** directory.
3. You can either:
   - Click the **Upload** button (top right) and upload the extracted files/folders.
   - Or in the Grofasto Admin Dashboard, click **"Download Hostinger ZIP"**, upload `grofasto-hostinger-deployment.zip` to `public_html`, right-click it, and click **Extract**.
4. Ensure files like `index.html` / `index.php` and `.htaccess` sit directly inside `public_html`.

---

## 5. How to Enable HTTPS (SSL)

1. In Hostinger hPanel, go to **Security** > **SSL**.
2. If not already active, click **Install SSL** on your domain (`grofasto.com`). Hostinger provisions free Let's Encrypt SSL certificates automatically.
3. Once active, toggle **Force HTTPS** to ON.
4. The `.htaccess` file provided with this website also has HTTPS redirect rules ready.

---

## 6. How to Open the Admin Panel

- Open: `https://www.grofasto.com/admin/`
- **Initial Username:** `admin`
- **Initial Password:** `Grof@stoAdmin#2026`

---

## 7. How to Change Admin Password

To generate a new password hash:
1. In phpMyAdmin, go to the `admins` table.
2. You can generate a new hash using PHP: `echo password_hash('YourNewPassword', PASSWORD_BCRYPT);`
3. Edit the row for `admin` and paste the new hash into the `password` field.

---

## 8. How to Change Phone Number

1. In `config/database.php`, change:
   ```php
   define('BUSINESS_PHONE', '+919457690255');
   ```
2. Any `tel:+919457690255` links will route automatically.

---

## 9. How to Change WhatsApp Number

1. In `config/database.php`, update:
   ```php
   define('WHATSAPP_NUMBER', '+919457690255');
   ```
2. In frontend files, WhatsApp links use:
   `https://wa.me/919457690255?text=Hello%20Grofasto...`

---

## 10. How to Add Google Ads Conversion Tracking

Open `contact.php` (or `src/components/ContactPage.tsx`), locate the Google Ads hook:
```javascript
// Add Google Ads Global Site Tag in <head>:
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX'); // Insert your Google Ads ID
</script>

// On Form Submission, trigger conversion:
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXX/YOUR_CONVERSION_LABEL'
});
```

---

## 11. How to Add Google Analytics (GA4)

Add your GA4 Measurement ID (`G-XXXXXXXXXX`) inside the `<head>` of `index.html` / `index.php`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 12. How to Create Google Ads Landing Page URLs

The `/contact` page is engineered specifically for Google Ads quality score.
You can append `?purpose=` to automatically select the customer's requirement:

- **Google Ads Campaign:**  
  `https://www.grofasto.com/contact?purpose=Google%20Ads`
- **School Websites:**  
  `https://www.grofasto.com/contact?purpose=School%20Website`
- **Doctor / Clinic Portals:**  
  `https://www.grofasto.com/contact?purpose=Doctor%20Website`
- **Hospital Websites:**  
  `https://www.grofasto.com/contact?purpose=Hospital%20Website`
- **Google Business Profile / Maps:**  
  `https://www.grofasto.com/contact?purpose=Google%20Business%20Profile`
- **Retail & Shops:**  
  `https://www.grofasto.com/contact?purpose=Retail%20Business`

---

## 13. How to Use UTM Parameters

When running Google Ads, Meta Ads, or SMS campaigns, append standard UTM parameters:

```text
https://www.grofasto.com/contact?purpose=Google%20Ads&utm_source=google&utm_medium=cpc&utm_campaign=meerut_local_biz&utm_term=website_designer&gclid=TEST12345
```

All 6 parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`) are captured and stored in MySQL and viewable in the Admin Dashboard.

---

## 14. Troubleshooting Common Errors

- **404 on `/contact`:** Ensure `.htaccess` is uploaded to `public_html`. Make sure `mod_rewrite` is enabled on Apache (standard on Hostinger).
- **"Database connection failed":** Double-check `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in `config/database.php`. On Hostinger, database host is almost always `localhost`.
- **Admin login fails:** Ensure `database/database.sql` was imported into phpMyAdmin so the `admins` table has the default row.
