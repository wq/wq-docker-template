import wq from "@wq/app";
import config from "./data/config.js";

import * as components from "./components/index.js";
import * as icons from "./icons.js";
import * as inputs from "./inputs/index.js";
import * as views from "./views/index.js";

const overrides = {
    components,
    icons,
    inputs,
    views,
};

wq.use([overrides]);

async function init() {
    await wq.init(config);
    await wq.prefetchAll();
    if (config.debug) {
        window.wq = wq;
    }
}

init();

navigator.serviceWorker.register("/service-worker.js");
