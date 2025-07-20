# ⚠️ ADSTERRA REMOVED - INTRUSIVE BEHAVIOR

**Status: ALL ADS DISABLED** 

Adsterra was removed from the airsoft marketplace due to:
- **Pop-ups and redirects**: Intrusive user experience
- **Page redirections**: Users being taken away from the site
- **Poor user experience**: Affecting site usability

All advertising has been temporarily disabled. Consider alternative ad networks that are less intrusive.

---

# Adsterra Setup Guide - Airsoft Market (ARCHIVED)

*This guide is archived for reference only. Adsterra integration has been removed.*

This guide will help you create and configure Adsterra ad units for your French airsoft marketplace after migrating from Google AdSense due to BB gun compliance issues.

## 🎯 Migration Overview

We have migrated from Google AdSense to Adsterra because:
- **BB Gun Compliance**: AdSense doesn't allow BB guns/airsoft content
- **Adsterra Advantage**: More lenient policies for gaming/sport equipment
- **Better CPM**: Often higher revenue for niche markets like airsoft

## 📋 Optimized Ad Placements (4 Total) - ALL CONFIGURED ✅

### Strategic 2-Ad Strategy
Using only your two ad units for maximum efficiency and better user experience:

**📊 Banner Ad (728x90)**: `8fc7b6e804c3c3767a7e3b2f50d080f4`
**🎯 Medium Rectangle (300x250)**: `7a83c188f05416cf18deec66419a0b97`

### 1. Product Details Page (`ProductDetails.tsx`)

#### After Description Ad ✅ **CONFIGURED**
- **Component**: `<Adsterra adKey="7a83c188f05416cf18deec66419a0b97" width={300} height={250} />`
- **Location**: After product description, before actions
- **Format**: Medium Rectangle (300x250)
- **Usage**: High engagement area where users have read product details

#### Between Sections Ad ✅ **CONFIGURED**
- **Component**: `<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} />`
- **Location**: Between "Latest User Listings" and "Similar Listings"
- **Format**: Leaderboard (728x90)
- **Usage**: Natural break in content flow

### 2. Annonces List Page (`[[...type]]/page.tsx`)

#### Top Banner Ad ✅ **CONFIGURED**
- **Component**: `<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} />`
- **Location**: Before product list, after SEO section
- **Format**: Leaderboard (728x90)
- **Usage**: First impression monetization

#### Category Page Middle Ad ✅ **CONFIGURED**
- **Component**: `<Adsterra adKey="7a83c188f05416cf18deec66419a0b97" width={300} height={250} />`
- **Location**: Between product list and category content (specific types only)
- **Format**: Medium Rectangle (300x250)
- **Usage**: Category-specific targeting opportunity

### 3. Infinite Scroll Ads (`products-list.tsx`)

#### Periodic List Ads ✅ **CONFIGURED**
- **Component**: `<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} />`
- **Location**: Every 12 products in list view only
- **Format**: Banner (728x90)
- **Usage**: Continuous monetization during browsing

## 🚀 Step-by-Step Adsterra Setup

### Step 1: Create Adsterra Account
1. Go to [adsterra.com](https://adsterra.com)
2. Click **"Sign Up"** and choose **"Publisher"**
3. Fill in your website details:
   - **Website**: `https://airsoftmarket.fr`
   - **Category**: Sports & Recreation / Gaming
   - **Country**: France
   - **Description**: French airsoft marketplace

### Step 2: Website Verification
1. Add your domain to Adsterra dashboard
2. Verify ownership via:
   - **ads.txt** (already updated with `adsterra.com, 1, DIRECT`)
   - **HTML tag** (if required)
   - **DNS verification** (alternative)

### Step 3: Create Ad Units

For each placement, create a new ad unit:

1. Go to **"Sites & Apps"** → **"Add New Zone"**
2. Choose ad format:
   - **Banner** for horizontal placements (728x90)
   - **Medium Rectangle** for content integration (336x280)
3. Set targeting:
   - **Country**: France
   - **Language**: French
   - **Categories**: Sports, Gaming, Hobbies
4. Copy the **Zone ID** for each ad unit

### ✅ ALL CONFIGURED - NO ACTION NEEDED!

All ad placements are now configured with your two ad units:

#### `src/components/details/ProductDetails.tsx` ✅ **ALL SET**
```typescript
// After Description Ad (Line ~188) - Medium Rectangle
<Adsterra adKey="7a83c188f05416cf18deec66419a0b97" width={300} height={250} className="min-h-[250px]" />

// Between Sections Ad (Line ~207) - Banner
<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} className="min-h-[200px]" />
```

#### `src/app/annonces/[[...type]]/page.tsx` ✅ **ALL SET**
```typescript
// Top Banner Ad (Line ~71) - Banner
<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} className="min-h-[200px]" />

// Category Middle Ad (Line ~85) - Medium Rectangle
<Adsterra adKey="7a83c188f05416cf18deec66419a0b97" width={300} height={250} className="min-h-[250px]" />
```

#### `src/app/annonces/products-list.tsx` ✅ **ALL SET**
```typescript
// Periodic List Ads (Line ~201) - Banner
<Adsterra adKey="8fc7b6e804c3c3767a7e3b2f50d080f4" width={728} height={90} className="min-h-[200px]" />
```

## 📱 Recommended Ad Formats for Airsoft Market

### Desktop Optimized
- **Leaderboard (728x90)**: Perfect for top banners and horizontal placements
- **Medium Rectangle (336x280)**: Excellent for content integration
- **Large Rectangle (300x250)**: Alternative for medium rectangle

### Mobile Optimized
- **Mobile Banner (320x50)**: Ideal for mobile horizontal placements
- **Medium Rectangle (300x250)**: Works well on mobile devices
- **Large Mobile Banner (320x100)**: Better visibility on mobile

### French Market Specific
- **Standard Banner (468x60)**: Good performance in European markets
- **Half Page (300x600)**: For sidebar placements (future implementation)

## 🇫🇷 French Market Optimization

### Adsterra Account Configuration
1. **Location**: Set primary GEO to France
2. **Language**: Configure for French-speaking audience
3. **Currency**: EUR (Euro)
4. **Categories**: 
   - Sports & Recreation
   - Gaming & Entertainment
   - Hobbies & Collections

### Content Targeting Keywords
- **Primary**: airsoft, réplique, paintball, sport, loisir
- **Secondary**: occasion, france, équipement, tactique
- **Niche**: aeg, gbb, sniper, gear, accessoires

## 📊 Performance & Revenue Optimization

### Ad Placement Strategy
- **High-value placements**: After product descriptions, between listings
- **Natural integration**: Clearly marked as "Publicité" for transparency
- **User experience**: Non-intrusive, properly spaced

### Expected Performance Improvements
- **Higher CPM**: Adsterra often pays 20-40% more for niche content
- **Better Fill Rate**: Less restrictive content policies
- **Geo-targeting**: Enhanced performance for French traffic

### Monitoring & Analytics
- **Adsterra Dashboard**: Real-time performance metrics
- **Revenue Tracking**: Daily/weekly/monthly reports
- **CTR Optimization**: A/B test different sizes and placements

## 🔧 Technical Implementation Details

### Adsterra Component Features
- **Async Loading**: Ads load without blocking page rendering
- **Error Handling**: Graceful fallback for failed ad loads
- **Responsive Design**: Adapts to different screen sizes
- **Performance**: Lightweight implementation

### Loading Mechanism
```typescript
// Adsterra ads load via invoke.js
script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
```

### Performance Benefits vs AdSense
- **Faster Loading**: No complex bidding system delays
- **Better Caching**: Static ad serving
- **Reduced Overhead**: Simpler integration

## 🚨 Important Migration Notes

### Content Policy Compliance
- **Airsoft Allowed**: Adsterra accepts sporting goods/gaming content
- **Age Restrictions**: Ensure proper age-gating for French market
- **Legal Compliance**: Follow French advertising regulations

### GDPR Compliance
- **Cookie Consent**: Existing implementation covers Adsterra
- **Privacy Policy**: Update to mention Adsterra as ad provider
- **Data Processing**: Adsterra complies with EU privacy regulations

### Quality Guidelines
- **Content Quality**: Maintain high-quality listings and descriptions
- **User Experience**: Keep ad-to-content ratio balanced
- **Mobile Optimization**: Ensure good mobile performance

## 📝 Post-Migration Checklist

### Immediate Actions (Day 1)
- [ ] Replace all placeholder Zone IDs with real Adsterra IDs
- [ ] Test all ad placements on desktop and mobile
- [ ] Verify ads.txt file is accessible
- [ ] Check console for any JavaScript errors

### Week 1 Monitoring
- [ ] Monitor revenue vs previous AdSense performance
- [ ] Check fill rates and CTR in Adsterra dashboard
- [ ] Gather user feedback on ad experience
- [ ] Optimize placement sizes if needed

### Month 1 Optimization
- [ ] Analyze best-performing ad sizes and placements
- [ ] Test additional ad formats (native, video, etc.)
- [ ] Consider adding more ad placements if performance is good
- [ ] Optimize for peak traffic hours

## 💰 Revenue Expectations

### Conservative Estimates (vs AdSense)
- **RPM Increase**: +15-25% for French traffic
- **Fill Rate**: 95-98% (vs 85-90% AdSense)
- **Better Niche Targeting**: Airsoft-relevant ads

### Optimization Timeline
- **Week 1-2**: Initial setup and monitoring
- **Week 3-4**: Basic optimization and A/B testing
- **Month 2+**: Advanced targeting and placement optimization

## 🔍 Troubleshooting

### Common Issues
1. **Ads Not Loading**: Check Zone ID accuracy
2. **Console Errors**: Verify script URLs and permissions
3. **Low Fill Rate**: Contact Adsterra support for GEO optimization
4. **Revenue Drops**: Monitor traffic quality and ad placement visibility

### Support Resources
- **Adsterra Support**: Available 24/7 via dashboard
- **Documentation**: Comprehensive integration guides
- **Community**: Publisher forums and best practices

---

*Migration completed: [Current Date]*
*Next review: Monitor performance for 30 days and optimize based on analytics*

## 📞 Support & Next Steps

If you encounter any issues:
1. Check Adsterra dashboard for diagnostics
2. Review browser console for JavaScript errors
3. Contact Adsterra support with specific error details
4. Monitor analytics for performance improvements

**Expected migration benefits:**
- ✅ Compliance with BB gun/airsoft content
- ✅ Higher revenue potential for French market
- ✅ Better ad targeting for niche audience
- ✅ Improved user experience with relevant ads 