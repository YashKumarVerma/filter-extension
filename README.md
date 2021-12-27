# Filter Extension

## Development
1. Clone the repository
2. Run `npm install` or `yarn`
3. Run `npm run start`
4. Open a chromium based browser and load the `/build` folder as unpacked extension.
5. The extension should be loaded with hot-reload enabled.

## Notes
- word lists are synchronized across browsers if user is logged - implemented using synchronized storages.
- traces are kept on local storages due to size and write limit restrictions on sync storage.
- batch processing implemented to communicate from service-worker and chrome storage.


## Reference 
- The chrome extension boilerplate is cloned from [here](https://github.com/lxieyang/chrome-extension-boilerplate-react) to quickly setup all build tools and integrate react with typescript.
- Options page in extension : https://developer.chrome.com/docs/extensions/mv3/options/
- CSS framework : https://basscss.com/#getting-started
- [reason for creating a separate trace storage](https://stackoverflow.com/questions/7700987/performance-of-key-lookup-in-javascript-object)