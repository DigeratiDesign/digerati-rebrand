// src/client/modules/mouseTrail.ts

/**
 * Mouse Trail.
 * 
 * @author <cabal@digerati.design>
 */
import {
    autoGroup,
    log,
    devError,
    time,
    timeEnd
} from "$digerati/utils/logger";

const TRAIL_COUNT = 750;

export const mouseTrail = () => {
    autoGroup("Mouse Trail", () => {
        log("Initializing mouse trail");

        const fxContainer = document.querySelector<HTMLElement>('[dd-fx="mouse-trail"]');
        if (!fxContainer) {
            devError("Mouse trail container not found; skipping trail creation.");
            return;
        }

        log("Found mouse trail container, generating elements");
        time("mouseTrail build");
        for (let i = 0; i < TRAIL_COUNT; i++) {
            const fx = document.createElement("i");
            fxContainer.appendChild(fx);
        }
        timeEnd("mouseTrail build");
        log(`Appended ${TRAIL_COUNT} trail elements to container`);
    });
};
