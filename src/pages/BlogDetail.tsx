import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Send
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { formatDate } from '../utils/formatters';
import { useInquiryModal } from '../context/InquiryModalContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBlogPostSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openInquiryModal } = useInquiryModal();

  const post = BLOG_POSTS.find((p: any) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <h2 className="text-3xl font-heading font-extrabold text-[#071B35] mb-2">Article Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The requested journal entry does not exist or has moved.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full bg-[#0866D9] text-white font-heading font-bold text-xs uppercase tracking-wider">
          Return to Travel Journal
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p: any) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      <SEOHead
        title={`${post.title} | VK Vacations Journal`}
        description={post.summary}
        keywords={[post.title, post.category, post.author.name, ...post.tags, "travel guide", "VK Vacations blog"]}
        canonical={`/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        schema={[
          buildBlogPostSchema(post, `/blog/${post.slug}`),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` }
          ])
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Back Link */}
        <div className="py-4 flex items-center justify-between text-xs text-[#64748B]">
          <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-[#0866D9] font-semibold">
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied!");
              }
            }}
            className="inline-flex items-center gap-1.5 hover:text-[#0866D9] cursor-pointer"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pt-4 pb-8">
          <span className="px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#EAF6FF] text-[#0866D9] inline-block">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-2">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-[#142238] block">{post.author.name}</span>
                <span className="text-[11px] text-slate-500">{post.author.role}</span>
              </div>
            </div>

            <span className="hidden sm:inline">•</span>

            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-[#FF8A38]" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-1">
              <Clock size={13} className="text-[#00B8A9]" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-10 bg-slate-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content Body */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
          <p className="font-medium text-[#071B35] text-base sm:text-lg leading-relaxed border-l-4 border-[#0866D9] pl-4 italic">
            {post.summary}
          </p>

          {post.content.map((paragraph: string, idx: number) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#071B35] mr-1">Tags:</span>
            {post.tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Author Bio Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00B8A9] shrink-0"
          />
          <div className="space-y-1">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#00B8A9]">
              Written by
            </span>
            <h4 className="font-heading font-bold text-base text-[#071B35]">
              {post.author.name}
            </h4>
            <p className="text-xs text-slate-500">
              {post.author.role} at VK Vacations. Dedicated to making every holiday seamless and memorable.
            </p>
          </div>
        </div>

        {/* Inline Vacation Planner CTA */}
        <div className="bg-gradient-to-r from-[#071B35] via-[#0866D9] to-[#00B8A9] rounded-3xl p-8 text-white mt-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#FFC857]">
              Inspired to Travel?
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Let's Turn This Reading Into Your Next Itinerary
            </h3>
            <p className="text-xs text-slate-200">
              Speak directly with our destination desk for customized quotes and group discounts.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal({ destination: post.tags[0] || 'Custom Holiday' })}
            className="px-7 py-3.5 rounded-full bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Send size={14} />
            <span>PLAN TRIP NOW</span>
          </button>
        </div>

        {/* Related Reads */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="font-heading font-bold text-xl text-[#071B35]">
              Recommended Reads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rp: any) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4 group"
                >
                  <img src={rp.coverImage} alt={rp.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0866D9]">{rp.category}</span>
                    <h4 className="font-heading font-bold text-sm text-[#071B35] group-hover:text-[#0866D9] transition-colors leading-snug line-clamp-2 mt-1">
                      {rp.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
