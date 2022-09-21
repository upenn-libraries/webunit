jQuery(function($) {

$("head").append('<link href="//libapps.s3.amazonaws.com/sites/231/include/summon.css" rel="stylesheet">');
$("body").prepend("<script>var vPagePath = window.location.href;dataLayer = [{'virtualURL': vPagePath}];</script><noscript><iframe src='//www.googletagmanager.com/ns.html?id=GTM-NRHX6KL' height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NRHX6KL');</script><script type='text/javascript'> var _mtm = _mtm || []; _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'}); var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://matomo.library.upenn.edu/js/container_JWFWhAj8.js'; s.parentNode.insertBefore(g,s);</script>");
$(".lcs_slide_out header a").css ({"position": "static !important", "right": "120px", "left": "auto"});
});

var browzine = {
  api: "https://public-api.thirdiron.com/public/v1/libraries/123",
  apiKey: "1ff0d6b2-fa18-4aa3-95a2-bebe7aa6b2a8",

  journalCoverImagesEnabled: true,

  journalBrowZineWebLinkTextEnabled: true,
  journalWording: "View the Journal",
  journalBrowZineWebLinkText: "Browse Now",

  articleBrowZineWebLinkTextEnabled: true,
  articleWording: "View Complete Issue",
  articleBrowZineWebLinkText: "Browse Now",

  articlePDFDownloadLinkEnabled: true,
  articlePDFDownloadWording: "Article PDF",
  articlePDFDownloadLinkText: "Download Now",

  articleLinkEnabled: true,
  articleLinkTextWording: "Article Link",
  articleLinkText: "Read Article",

  unpaywallEmailAddressKey: "enter-your-email@your-institution-domain.edu",

  articlePDFDownloadViaUnpaywallEnabled: true,
  articlePDFDownloadViaUnpaywallWording: "Article PDF",
  articlePDFDownloadViaUnpaywallLinkText: "Download Now (via Unpaywall)",

  articleLinkViaUnpaywallEnabled: true,
  articleLinkViaUnpaywallWording: "Article Link",
  articleLinkViaUnpaywallLinkText: "Read Article (via Unpaywall)",

  articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
  articleAcceptedManuscriptPDFViaUnpaywallWording: "Article PDF",
  articleAcceptedManuscriptPDFViaUnpaywallLinkText: "Download Now (Accepted Manuscript via Unpaywall)",

  articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
  articleAcceptedManuscriptArticleLinkViaUnpaywallWording: "Article Link",
  articleAcceptedManuscriptArticleLinkViaUnpaywallLinkText: "Read Article (Accepted Manuscript via Unpaywall)",
};

browzine.script = document.createElement("script");
browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/summon/browzine-summon-adapter.js";
document.head.appendChild(browzine.script);
