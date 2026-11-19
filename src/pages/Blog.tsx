import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { formatDate } from '../utils/formatters';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Destination Guides', 'Honeymoon', 'Travel Guides', 'Travel Tips'];

  const filteredPosts = BLOG_POSTS.filter((post: any) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Travel Journal & Destination Guides — Travel Tips & Advice | VK Vacations"
        description="Read expert travel articles, Dubai guidelines for Indians, best time to visit Bali, honeymoon destination trends, and international travel preparation tips by VK Vacations."
        keywords={["travel blog India", "travel tips Dubai", "best time to visit Bali", "honeymoon destinations 2026", "VK Vacations journal"]}
        canonical="/blog"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <BookOpen size={13} />
            <span>EDITORIAL STORIES & GUIDES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            THE TRAVEL <span className="text-[#0866D9]">JOURNAL</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Practical travel advice, packing tips, honeymoon blueprints, and insider recommendations curated by our destination experts.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0866D9] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: any) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0866D9] shadow-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#FF8A38]" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#00B8A9]" />
                      <span>{post.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-heading font-bold text-lg text-[#071B35] group-hover:text-[#0866D9] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-heading font-bold text-[#0866D9] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
