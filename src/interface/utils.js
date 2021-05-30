import DummyWallet from "./dummyWallet.ts";
import { solottoProgram } from "./solotto";

function gameStateToDisplay(gameState) {
    if (gameState.inactive) return "inactive";
    else if (gameState.ongoing) return "ongoing";
    else if (gameState.completed) return "completed";
    else return "unknown";
}

function hashToDisplay(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

const STATE_CACHE_EXPIRY_TIME_MS = 1_000;

function isProgStateCacheValid() {
    const state = localStorage.getItem("progState");
    const expiry = localStorage.getItem("expiry");
    return state && expiry && new Date().getTime() < Number(expiry)
}

async function fetchAndCacheProgState() {
    if (isProgStateCacheValid()) {
        return;
    }
    const wallet = new DummyWallet();
    const solotto = await solottoProgram(wallet).catch(console.log);;
    const state = await solotto.state().catch(console.log);
    if (state) {
        localStorage.setItem("progState", JSON.stringify(state));
        localStorage.setItem("expiry", new Date().getTime() + STATE_CACHE_EXPIRY_TIME_MS);
    }
}

export {
    gameStateToDisplay,
    fetchAndCacheProgState,
    hashToDisplay
};