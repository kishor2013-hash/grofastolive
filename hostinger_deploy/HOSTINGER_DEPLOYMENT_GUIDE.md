# Grofasto Digital Solution - Hostinger Deployment & Google Ads Setup Guide

यह गाइड आपकी वेबसाइट (grofasto.com) को **Hostinger cPanel/hPanel** पर लाइव करने और नए **Dedicated Landing Page (`contact.html`)** को Google Ads कैंपेन में इस्तेमाल करने के लिए तैयार की गई है।

---

## 1. Database Schema Update (Hostinger phpMyAdmin)

यदि आपने पहले `leads` टेबल बनाई हुई थी, तो `form_type` कॉलम को `VARCHAR(50)` पर अपडेट करना ज़रूरी है ताकि नए Google Ads और Demo ट्रैकिंग टैग्स बिना किसी एरर के सुरक्षित स्टोर हो सकें।

### Step 1: phpMyAdmin में लॉगिन करें
1. Hostinger **hPanel** में जाएँ -> **Databases** -> **phpMyAdmin** ओपन करें।
2. अपना डेटाबेस सेलेक्ट करें (उदा. `u123456789_grofasto_db`)।
3. ऊपर मेन्यू में **SQL** टैब पर क्लिक करें।

### Step 2: नीचे दिया गया SQL कोड पेस्ट करके "Go" दबाएँ:

```sql
-- Leads Table Schema
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `form_type` VARCHAR(50) NOT NULL DEFAULT 'Lead' COMMENT 'Type of submission (e.g. Lead, Appointment, Contact, google_ads_lead, demo_request)',
  `name` VARCHAR(150) NOT NULL COMMENT 'Customer or Business contact full name',
  `email` VARCHAR(150) DEFAULT NULL COMMENT 'Contact email address',
  `phone` VARCHAR(20) NOT NULL COMMENT '10-digit mobile number',
  `business_name` VARCHAR(200) DEFAULT NULL COMMENT 'School / Clinic / Shop / Enterprise name',
  `service` VARCHAR(150) DEFAULT NULL COMMENT 'Selected service or website category',
  `appointment_date` DATE DEFAULT NULL COMMENT 'Requested appointment date',
  `appointment_time` VARCHAR(50) DEFAULT NULL COMMENT 'Preferred appointment slot or time',
  `message` TEXT DEFAULT NULL COMMENT 'Specific requirements, inquiries or notes',
  `status` ENUM('New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed') NOT NULL DEFAULT 'New' COMMENT 'CRM Lead Workflow Status',
  `utm_source` VARCHAR(100) DEFAULT NULL COMMENT 'Marketing tracking source (e.g. google, facebook)',
  `utm_medium` VARCHAR(100) DEFAULT NULL COMMENT 'Marketing medium (e.g. cpc, organic)',
  `utm_campaign` VARCHAR(100) DEFAULT NULL COMMENT 'Ad campaign name',
  `utm_term` VARCHAR(100) DEFAULT NULL COMMENT 'Search keyword',
  `utm_content` VARCHAR(100) DEFAULT NULL COMMENT 'Ad content identifier',
  `gclid` VARCHAR(255) DEFAULT NULL COMMENT 'Google Click ID',
  `landing_page` VARCHAR(500) DEFAULT NULL COMMENT 'Landing URL visited',
  `referrer` VARCHAR(500) DEFAULT NULL COMMENT 'HTTP Referrer',
  `ip_address` VARCHAR(45) DEFAULT NULL COMMENT 'Client IP address',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Submission timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  INDEX `idx_phone` (`phone`),
  INDEX `idx_form_type` (`form_type`),
  INDEX `idx_status` (`status`),
  INDEX `idx_service` (`service`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- यदि टेबल पहले से मौजूद है, तो कॉलम टाइप को अपडेट करने के लिए यह चलाएँ:
ALTER TABLE `leads` MODIFY COLUMN `form_type` VARCHAR(50) NOT NULL DEFAULT 'Lead';
```

---

## 2. API Database Credentials (`api/submit.php`)

Hostinger सर्वर पर `api/submit.php` फ़ाइल खोलें और लाइन्स 34-37 में अपने Hostinger MySQL के असली क्रेडेंशियल्स दर्ज करें:

```php
define('DB_HOST', 'localhost');                  // Hostinger पर 'localhost' ही रहता है
define('DB_USER', 'u123456789_grofasto_user');  // आपका MySQL Username
define('DB_PASS', 'YourStrongPassword@2026');   // आपका MySQL Password
define('DB_NAME', 'u123456789_grofasto_db');    // आपका MySQL Database Name
```

---

## 3. Hostinger `public_html` में फ़ाइलें अपलोड करना

Hostinger File Manager में जाकर `public_html/` फ़ोल्डर में निम्नलिखित फ़ाइलें अपलोड करें:

- `index.html` (मुख्य होमपेज)
- `contact.html` (नया डेडिकेटेड हाई-कन्वर्टिंग लैंडिंग पेज)
- `book-demo.html` (Google Ads के लिए शॉर्ट रीडायरेक्ट फ़ाइल)
- `book-appointment.html` (अपॉइंटमेंट बुकिंग शॉर्ट रीडायरेक्ट फ़ाइल)
- `api/submit.php` (`api` फ़ोल्डर के अंदर)
- `database/schema.sql`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

*(आप सीधे `hostinger_deploy` फ़ोल्डर की सारी फ़ाइलें भी `public_html` में ड्रैग & ड्रॉप कर सकते हैं)*

---

## 4. Google Ads कैंपेन में URL का उपयोग

अब आप बिना किसी पॉप-अप के डायरेक्ट लैंडिंग पेज का उपयोग कर सकते हैं:

1. **मुख्य लैंडिंग पेज URL:**
   `https://grofasto.com/contact.html`

2. **Google Ads Tracking के साथ फ़ाइनल URL (अनुशंसित):**
   ```text
   https://grofasto.com/contact.html?utm_source=google&utm_medium=cpc&utm_campaign=website_design_meerut&form_type=google_ads_lead
   ```

3. **विशिष्ट सर्विस के लिए प्री-सेलेक्टेड लिंक:**
   - स्कूल वेबसाइट के लिए:
     `https://grofasto.com/contact.html?service=School%20Website&utm_source=google&utm_medium=cpc`
   - डॉक्टर/क्लिनिक अपॉइंटमेंट के लिए:
     `https://grofasto.com/contact.html?service=Doctor%20Website&type=appointment&utm_source=google&utm_medium=cpc`
   - फ्री डेमो वेबसाइट के लिए:
     `https://grofasto.com/contact.html?form_type=demo_request&utm_source=google&utm_medium=cpc`
