/* This JS runs on ALL LibWizard forms.
 * We're using it to append Google Analytics, because there is no other reliable way to add it to all forms.
 * If you add it to the customizable header HTML, there is the chance it can be overridden at the form level.
 * (Also, I couldn't get it to work when embedded in that HTML. It seemed like a lost cause all around.) */

//console.log("running LibWizardGlobalScripts.js");

var head = document.getElementsByTagName("head")[0];

/* Append Google Analytics snippet:
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-29113922-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-29113922-4');
</script>
*/
var gtag1 = document.createElement('script');
gtag1.src = 'https://www.googletagmanager.com/gtag/js?id=UA-29113922-4';
gtag1.async = 'true';

var gtag2 = document.createElement('script');
gtag2.innerHTML = "window.dataLayer = window.dataLayer || [];" +
  "function gtag(){dataLayer.push(arguments);}" +
  "gtag('js', new Date());" +
  "gtag('config', 'UA-29113922-4');";

head.appendChild(gtag1);
head.appendChild(gtag2);
