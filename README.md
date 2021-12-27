# Filter Extension

## Screenshots
![New Tab](https://i.imgur.com/Syl2kh7.png)

> easily add new words
> ![Adding and removing words](https://i.imgur.com/18b6gvA.png)

> toggle words instead of deleting
> ![Option to toggle ](https://i.imgur.com/5J8plJ4.png)


**Before**
*when blocking the work "silly"*
![before](https://i.imgur.com/WKRkUXO.png)

![after](https://i.imgur.com/HKWjNVV.png)

**Traces**
![https://i.imgur.com/hppljyx.png](https://i.imgur.com/hppljyx.png)
![https://i.imgur.com/JcncB1Y.png](https://i.imgur.com/JcncB1Y.png)

> Even supports complex UI elements
![https://i.imgur.com/kADDvWi.png](https://i.imgur.com/kADDvWi.png)

## Development
1. Clone the repository
2. Run `npm install` or `yarn`
3. Run `npm run start`
4. Open a chromium based browser and load the `/build` folder as unpacked extension.
5. The extension should be loaded with hot-reload enabled.

## Notes
- latest version of manifest implemented (v3)
- word lists are synchronized across browsers if user is logged - implemented using synchronized storages.
- traces are kept on local storages due to size and write limit restrictions on sync storage.
- batch processing implemented to reduce network requests b/w service-worker and content scripts.
- under development, list of known issues are visible on the issue tracker.

## Reference 
- The chrome extension boilerplate is cloned from [here](https://github.com/lxieyang/chrome-extension-boilerplate-react) to quickly setup all build tools and integrate react with typescript.
- Options page in extension : https://developer.chrome.com/docs/extensions/mv3/options/
- CSS framework : https://basscss.com/#getting-started
- [reason for creating a separate trace storage](https://stackoverflow.com/questions/7700987/performance-of-key-lookup-in-javascript-object)