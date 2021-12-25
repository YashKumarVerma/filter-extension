import { printLine } from './modules/print';

const ans = {};

ans.createSidebar = function () {
    return {
        init: function () {
            console.log('init sidebar');
            fetch("https://webhook.site/7d46182b-83da-49a3-9116-8a6490c336c5").then((x) => {
                console.log(x)
            })
        }
    }
}();

ans.createSidebar.init();