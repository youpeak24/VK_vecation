<?xml version="1.0" encoding="UTF-8"?>
<!-- Browser-only styling for sitemap.xml and the child sitemaps. Search engines ignore this file. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sm image">

  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>VK Vacations — Sitemap</title>
        <style>
          :root { --navy:#071B35; --gold:#C9A24B; --line:#e5e7eb; --muted:#6b7280; }
          * { box-sizing:border-box; }
          body { margin:0; font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; color:#111827; background:#f8fafc; }
          header { background:var(--navy); color:#fff; padding:28px 24px; border-bottom:4px solid var(--gold); }
          header h1 { margin:0 0 4px; font-size:22px; }
          header p { margin:0; color:#cbd5e1; font-size:14px; }
          main { max-width:960px; margin:24px auto; padding:0 16px 48px; }
          .crumb { margin-bottom:16px; font-size:14px; }
          a { color:#0b5cad; text-decoration:none; word-break:break-all; }
          a:hover { text-decoration:underline; }
          .card { background:#fff; border:1px solid var(--line); border-radius:10px; overflow:hidden; }
          table { width:100%; border-collapse:collapse; }
          th { text-align:left; background:#f1f5f9; font-size:12px; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); }
          th, td { padding:10px 14px; border-bottom:1px solid var(--line); vertical-align:top; }
          tr:last-child td { border-bottom:0; }
          td.num, th.num { text-align:right; white-space:nowrap; color:var(--muted); }
          .tree { font-family:ui-monospace,Consolas,monospace; font-size:13.5px; }
          .tree .branch { color:var(--gold); user-select:none; }
          .d0 { font-weight:600; }
          @media (max-width:600px) { .hide-sm { display:none; } }
        </style>
      </head>
      <body>
        <header>
          <h1>VK Vacations — XML Sitemap</h1>
          <p>
            <xsl:choose>
              <xsl:when test="sm:sitemapindex">
                <xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/> sitemaps in this index
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs
              </xsl:otherwise>
            </xsl:choose>
          </p>
        </header>
        <main>
          <xsl:apply-templates select="sm:sitemapindex | sm:urlset"/>
        </main>
      </body>
    </html>
  </xsl:template>

  <!-- ===== Sitemap index: top level of the tree ===== -->
  <xsl:template match="sm:sitemapindex">
    <div class="card">
      <table>
        <thead><tr><th>Sitemap</th><th class="num">Last modified</th></tr></thead>
        <tbody>
          <xsl:for-each select="sm:sitemap">
            <tr>
              <td class="tree"><span class="branch">├─ </span><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
              <td class="num"><xsl:value-of select="sm:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- ===== URL set: tree indented by path depth ===== -->
  <xsl:template match="sm:urlset">
    <p class="crumb"><a href="/sitemap.xml">← Back to sitemap index</a></p>
    <div class="card">
      <table>
        <thead>
          <tr><th>URL</th><th class="num hide-sm">Images</th><th class="num">Last modified</th></tr>
        </thead>
        <tbody>
          <xsl:for-each select="sm:url">
            <xsl:variable name="path" select="substring-after(substring-after(sm:loc, '//'), '/')"/>
            <xsl:variable name="depth" select="string-length($path) - string-length(translate($path, '/', ''))"/>
            <tr>
              <td class="tree d{$depth}">
                <xsl:if test="$depth &gt; 0">
                  <span class="branch">
                    <xsl:text>&#160;&#160;&#160;&#160;</xsl:text>
                    <xsl:text>└─ </xsl:text>
                  </span>
                </xsl:if>
                <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
              </td>
              <td class="num hide-sm"><xsl:value-of select="count(image:image)"/></td>
              <td class="num"><xsl:value-of select="sm:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>
