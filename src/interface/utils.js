import DummyWallet from "./dummyWallet.ts";
import { solottoProgram } from "./solotto";

function gameStateToDisplay(gameState) {
  if (gameState.inactive) return "Inactive";
  else if (gameState.ongoing) return "Ongoing";
  else if (gameState.completed) return "Completed";
  else return "Unknown";
}

function hashToDisplay(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

const STATE_CACHE_EXPIRY_TIME_MS = 1_000;

function isProgStateCacheValid() {
  const state = localStorage.getItem("progState");
  const expiry = localStorage.getItem("expiry");
  // Date().getTime() returns the number of ms Jan 1, 1970, 00:00:00.000 GMT
  return state && expiry && new Date().getTime() < Number(expiry);
}

async function fetchAndCacheProgState() {
  if (isProgStateCacheValid()) {
    console.log("progState cache is valid");
    return;
  }
  const wallet = new DummyWallet();
  const solotto = await solottoProgram(wallet).catch(console.log);
  const state = await solotto.state().catch(console.log);
  if (state) {
    localStorage.setItem("progState", JSON.stringify(state));
    localStorage.setItem(
      "expiry",
      new Date().getTime() + STATE_CACHE_EXPIRY_TIME_MS
    );
  }
}

export { gameStateToDisplay, fetchAndCacheProgState, hashToDisplay };
