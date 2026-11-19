import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  schema?: Record<string, any> | Array<Record<string, any>>;
  noIndex?: boolean;
}

const DOMAIN = 'https://www.vkvacations.in';
const DEFAULT_IMAGE = `${DOMAIN}/android-chrome-512x512.png`;

/**
 * World-Class Production SEO Head Manager
 * Dynamically synchronizes document title, meta tags, canonical links,
 * OpenGraph/Twitter cards, and Schema.org JSON-LD structured data on client-side route changes.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
  noIndex = false
}) => {
  useEffect(() => {
    // 1. Format Title
    const formattedTitle = title.includes('VK Vacations')
      ? title
      : `${title} | VK Vacations India`;
    document.title = formattedTitle;

    // Helper: set or create a meta tag by name or property
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper: set or create link tag
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Canonical URL
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DOMAIN}${canonical.startsWith('/') ? '' : '/'}${canonical}`
      : window.location.origin === 'http://localhost:5173'
        ? `${DOMAIN}${window.location.pathname}`
        : window.location.href;

    setLink('canonical', canonicalUrl);

    // 3. Core Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'title', formattedTitle);

    if (keywords) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMeta('name', 'keywords', kwString);
    }

    // 4. Robots Directives
    if (noIndex) {
      setMeta('name', 'robots', 'noindex, nofollow');
      setMeta('name', 'googlebot', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMeta('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 5. OpenGraph Tags
    const absoluteImage = ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:site_name', 'VK Vacations');
    setMeta('property', 'og:locale', 'en_IN');

    // 6. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@vkvacations');
    setMeta('name', 'twitter:creator', '@vkvacations');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    // 7. Dynamic JSON-LD Structured Data Injection
    const SCRIPT_ID = 'vk-dynamic-schema';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up dynamic script on unmount
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) existingScript.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema, noIndex]);

  return null;
};

export default SEOHead;
