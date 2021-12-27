/**
 * Registers a developer drawer tab with 
 * [title, icon on the tab, name of page which contains the content]
 * 
 * @important
 * after webpack build, the file name of ./index.html changes to ./panel.html, hence the path
 */
chrome.devtools.panels.create(
  'Secure Web',
  'icon-34.png',
  'panel.html'
);
