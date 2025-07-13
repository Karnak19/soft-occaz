# AdSense Setup Guide - Airsoft Market

This guide will help you create and configure Google AdSense ad units for your French airsoft marketplace.

## 🎯 Ad Units Overview

We have implemented **6 different ad placements** across the marketplace to maximize revenue while maintaining good user experience.

## 📋 Ad Units to Create

### 1. Product Details Page (`ProductDetails.tsx`)

#### After Description Ad
- **Current Slot ID**: `1234567890` *(placeholder)*
- **Location**: After product description, before actions
- **Format**: Rectangle
- **Recommended Size**: Medium Rectangle (300x250) or Large Rectangle (336x280)
- **Usage**: High engagement area where users have read product details

#### Between Sections Ad  
- **Current Slot ID**: `9876543210` *(placeholder)*
- **Location**: Between "Latest User Listings" and "Similar Listings"
- **Format**: Horizontal
- **Recommended Size**: Leaderboard (728x90) or Large Mobile Banner (320x100)
- **Usage**: Natural break in content flow

#### Bottom Banner Ad
- **Current Slot ID**: `1357924680` *(placeholder)*
- **Location**: Bottom of product details page
- **Format**: Horizontal
- **Recommended Size**: Banner (468x60) or Leaderboard (728x90)
- **Usage**: Final monetization opportunity

### 2. Annonces List Page (`[[...type]]/page.tsx`)

#### Top Banner Ad
- **Current Slot ID**: `2468135790` *(placeholder)*
- **Location**: Before product list, after SEO section
- **Format**: Horizontal
- **Recommended Size**: Leaderboard (728x90) or Large Mobile Banner (320x100)
- **Usage**: First impression monetization

#### Category Page Middle Ad
- **Current Slot ID**: `1357924680` *(placeholder)*
- **Location**: Between product list and category content (specific types only)
- **Format**: Rectangle
- **Recommended Size**: Medium Rectangle (300x250) or Large Rectangle (336x280)
- **Usage**: Category-specific targeting opportunity

### 3. Infinite Scroll Ads (`products-list.tsx`)

#### Periodic List Ads
- **Current Slot ID Pattern**: `3691472580{index}` *(e.g., 36914725800, 36914725801, etc.)*
- **Location**: Every 12 products in list view only
- **Format**: Horizontal
- **Recommended Size**: Banner (468x60) or Large Mobile Banner (320x100)
- **Usage**: Continuous monetization during browsing

## 🚀 Step-by-Step Setup

### Step 1: Access Google AdSense
1. Go to [adsense.google.com](https://adsense.google.com)
2. Sign in to your account
3. Navigate to **"Ads"** → **"Ad units"**

### Step 2: Create Each Ad Unit

For each ad unit listed above:

1. Click **"Create ad unit"**
2. Choose **"Display ads"**
3. Enter descriptive name:
   - `Airsoft Market - Product Details - After Description`
   - `Airsoft Market - Product Details - Between Sections`
   - `Airsoft Market - Product Details - Bottom Banner`
   - `Airsoft Market - Annonces - Top Banner`
   - `Airsoft Market - Annonces - Category Middle`
   - `Airsoft Market - List - Periodic Ad 1` (create multiple for infinite scroll)

4. **Set ad size** based on recommendations above
5. Click **"Create"**
6. **Copy the generated ad unit ID**

### Step 3: Update Code

Replace placeholder slot IDs in the following files:

#### `src/components/details/ProductDetails.tsx`
```typescript
// Line ~174: After Description Ad
<AdSense slot="YOUR_ACTUAL_SLOT_ID_1" format="rectangle" className="min-h-[280px]" />

// Line ~213: Between Sections Ad
<AdSense slot="YOUR_ACTUAL_SLOT_ID_2" format="horizontal" className="min-h-[200px]" />

// Line ~225: Bottom Banner Ad
<AdSense slot="YOUR_ACTUAL_SLOT_ID_3" format="horizontal" className="min-h-[120px]" />
```

#### `src/app/annonces/[[...type]]/page.tsx`
```typescript
// Line ~32: Top Banner Ad
<AdSense slot="YOUR_ACTUAL_SLOT_ID_4" format="horizontal" className="min-h-[200px]" />

// Line ~45: Category Middle Ad
<AdSense slot="YOUR_ACTUAL_SLOT_ID_5" format="rectangle" className="min-h-[280px]" />
```

#### `src/app/annonces/products-list.tsx`
```typescript
// Line ~152: Periodic List Ads
<AdSense slot={`YOUR_BASE_SLOT_ID${item.data.adIndex}`} format="horizontal" className="min-h-[200px]" />
```

## 📱 Recommended Ad Sizes

### For Desktop Users
- **Leaderboard (728x90)**: Perfect for top banners and horizontal placements
- **Medium Rectangle (300x250)**: Excellent for content integration
- **Large Rectangle (336x280)**: Higher visibility, good for premium placements

### For Mobile Users
- **Large Mobile Banner (320x100)**: Ideal for mobile banners
- **Medium Rectangle (300x250)**: Works well on mobile devices
- **Responsive**: Automatically adapts to screen size (recommended)

### For French Market
- **Banner (468x60)**: Standard banner size, good performance
- **Skyscraper (120x600)**: For sidebar placements (not currently implemented)

## 🇫🇷 French Market Optimization

### AdSense Account Configuration
1. **Location**: Set to France in your AdSense account
2. **Language**: Enable French language targeting
3. **Currency**: EUR (Euro)
4. **Categories**: Select relevant categories:
   - Sports & Recreation
   - Hobbies & Leisure
   - Military & Defense (if allowed)

### Content Targeting
- **Keywords**: airsoft, réplique, occasion, france, sport, loisir
- **Audience**: French airsoft enthusiasts, collectors, sport shooters
- **Geographic**: Target France and French-speaking regions

## 📊 Performance Optimization

### Ad Placement Strategy
- **High-engagement areas**: After product descriptions, between content sections
- **Natural breaks**: Between product groups, at content transitions
- **Non-intrusive**: Clearly labeled as "Publicité" for transparency

### Mobile Optimization
- All ads are responsive and mobile-friendly
- Smaller ad sizes for mobile users
- Proper spacing to avoid accidental clicks

### User Experience
- **Grid layout**: Clean browsing with minimal ads
- **List layout**: Periodic ads for better monetization
- **Clear labeling**: All ads marked as "Publicité"

## 🔧 Technical Implementation

### Ad Loading
- Ads load asynchronously to not block page rendering
- Proper error handling for failed ad loads
- Responsive design for all screen sizes

### Performance Monitoring
- Track ad performance in AdSense dashboard
- Monitor page load times
- A/B test different ad sizes and placements

## 📝 Next Steps

1. **Create all ad units** in your AdSense account
2. **Replace placeholder slot IDs** with actual AdSense IDs
3. **Test on staging environment** before deploying
4. **Monitor performance** and adjust sizes/placements as needed
5. **Optimize for French market** based on analytics data

## 🚨 Important Notes

- **Compliance**: Ensure all ads comply with French advertising regulations
- **GDPR**: Implement proper consent management for EU users
- **Quality**: Maintain high-quality content to avoid ad serving issues
- **Policy**: Follow Google AdSense policies strictly

---

*Last updated: [Current Date]*
*For questions or issues, refer to Google AdSense documentation or contact support.* 