# 🎨 Sanity CMS Setup Guide

This guide explains how to set up and use the Sanity CMS so Francisca can manage website content without coding.

## 📋 What is Sanity?

Sanity is a **visual content management system** (CMS) that provides:
- ✅ Beautiful dashboard for editing content
- ✅ Image upload built-in
- ✅ Real-time preview
- ✅ No coding required
- ✅ Free forever for this use case

## 🚀 Initial Setup (One-Time, For You)

### Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign up with Google/GitHub or email
3. Click **"Create project"**
4. Give it a name: `francisca-ghostwriting`
5. Choose **Free plan**
6. Copy the **Project ID** (looks like: `abc123de`)

### Step 2: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

### Step 3: Deploy Sanity Studio

The Sanity Studio (CMS dashboard) is already built into this project at `/studio`.

To deploy it:

```bash
npm run dev
```

Then visit: **http://localhost:3000/studio**

You'll see the Sanity login screen. **Log in with the same account you created in Step 1.**

### Step 4: Add Content

Once logged in, you'll see the Sanity Studio dashboard with these sections:

- **Portfolio Items** - Add writing samples
- **Services** - Edit service descriptions
- **Testimonials** - Add client reviews
- **Blog Posts** - Write blog articles
- **FAQ Items** - Add frequently asked questions

Click any section and start adding content!

---

## 👩‍💼 For Francisca: How to Use the CMS

### Accessing the Dashboard

1. Go to: **https://yoursite.com/studio**
2. Click "Sign in with Google/GitHub" (use the account we set up)
3. You'll see your dashboard

### Adding a Portfolio Item

1. Click **"Portfolio Item"** in the left sidebar
2. Click the **+ button** (top right)
3. Fill in the form:
   - **Title**: Name of the project
   - **Description**: Brief summary (1-2 sentences)
   - **Category**: Choose from dropdown
   - **Thumbnail Image**: Click to upload an image
   - **Content Preview**: First paragraph of the work
   - **PDF Sample**: Upload a PDF (optional)
   - **Featured**: Check if you want it on homepage
   - **Date Added**: Pick the date

4. Click **Publish** (green button, top right)

**Done!** The portfolio item will appear on your website instantly.

### Adding a Blog Post

1. Click **"Blog Post"** in the left sidebar
2. Click the **+ button**
3. Fill in:
   - **Title**: Post title
   - **Slug**: Auto-generates from title (or customize)
   - **Excerpt**: Short summary for listing page
   - **Content**: Write your blog post (rich editor with formatting)
   - **Category**: Choose category
   - **Cover Image**: Upload header image
   - **Published Date**: Choose date
   - **Tags**: Add relevant tags
   - **Featured**: Check if you want it highlighted

4. Click **Publish**

### Editing Existing Content

1. Click the content type (e.g., "Services")
2. Click the item you want to edit
3. Make your changes
4. Click **Publish** to save

### Uploading Images

When you see an image field:
1. Click the image box
2. Choose **"Upload"**
3. Select image from your computer
4. Sanity automatically optimizes it
5. Click outside the dialog when done

**Supported formats:** JPG, PNG, GIF, WebP
**Recommended size:** 1200px width or larger

### Managing Order

For Services and FAQs, there's an **"Order"** field:
- `1` = appears first
- `2` = appears second
- etc.

Change the number and republish to reorder items.

---

## 🔧 Common Tasks

### Unpublish Content

1. Open the item
2. Click the **••• menu** (top right)
3. Select **"Unpublish"**

The content stays in Sanity but won't appear on the website.

### Duplicate Content

Useful for creating similar items:
1. Open an existing item
2. Click **••• menu** → **"Duplicate"**
3. Edit the copy
4. Publish

### Preview Before Publishing

Sanity shows changes as you type. The preview on the right updates in real-time.

---

## 📞 Need Help?

If you encounter any issues:

1. **Can't log in?** → Make sure you're using the Google/GitHub account we set up
2. **Changes not showing?** → Click the "Publish" button (it's easy to miss!)
3. **Image won't upload?** → Check file size (max 25MB) and format (JPG/PNG/GIF)
4. **Something broke?** → Contact me and I'll fix it

---

## 🎓 Learning Resources

- **Sanity Documentation**: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **Video Tutorials**: [https://www.sanity.io/guides](https://www.sanity.io/guides)
- **Get Help**: Sanity has excellent customer support at [support@sanity.io](mailto:support@sanity.io)

---

## ✅ Quick Reference

| Task | Steps |
|------|-------|
| **Add new content** | Click content type → + button → Fill form → Publish |
| **Edit content** | Click content type → Click item → Edit → Publish |
| **Upload image** | Click image field → Upload → Select file |
| **Reorder items** | Change "Order" number → Publish |
| **Unpublish** | ••• menu → Unpublish |
| **Access dashboard** | https://yoursite.com/studio |

---

**That's it!** You're now fully in control of your website content. No coding required. 🎉
