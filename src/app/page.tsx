import AirsoftOccasionSeoSection from '$/components/home/AirsoftOccasionSeoSection';
import CategoriesSection from '$/components/home/CategoriesSection';
import CommunitySection from '$/components/home/CommunitySection';
import DepartmentsMapSection from '$/components/home/DepartmentsMapSection';
import FeaturedCategories from '$/components/home/FeaturedCategories';
import FeaturesSection from '$/components/home/FeaturesSection';
import ImportSection from '$/components/home/ImportSection';
import LastAds from '$/components/home/LastAds';
import LatestBlogPosts from '$/components/home/LatestBlogPosts';
import MarketBotSection from '$/components/home/MarketBotSection';
import { PartnersSection } from '$/components/home/PartnersSection';
import ReferralSection from '$/components/home/ReferralSection';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';
import StatsSection from '$/components/home/StatsSection';
import TrustSection from '$/components/home/TrustSection';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24 font-roboto sm:gap-24">
      {/* Hero section with search functionality - most important for users */}
      <div className="relative">
        <SearchSection />
        <FeaturedCategories />
      </div>

      {/* Featured listings for immediate engagement */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <h2 className="font-brand text-3xl font-bold text-center mb-8">Découvrez nos annonces</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
          <LastAds limit={4} type={ListingsTypeOptions.aeg} />
          <LastAds limit={4} type={ListingsTypeOptions.gbb} />
        </div>
      </div>

      {/* Latest Blog Posts Section */}
      <LatestBlogPosts />

      {/* Categories for easy navigation */}
      <CategoriesSection />

      {/* Trust elements to build confidence */}
      <div className="space-y-24">
        <TrustSection />
        <PartnersSection />
      </div>

      {/* Community and engagement features */}
      <div className="space-y-24">
        <DepartmentsMapSection />
        <CommunitySection />
      </div>

      {/* Features and benefits */}
      <FeaturesSection />

      {/* Additional services */}
      <div className="space-y-24">
        <MarketBotSection />
        <ImportSection />
      </div>

      {/* Statistics to show platform growth */}
      <StatsSection />

      {/* Referral and promotion */}
      <ReferralSection />

      {/* SEO Section - still important but less visible */}
      <AirsoftOccasionSeoSection />

      {/* Final call to action */}
      <RegisterCTA />
    </div>
  );
}
