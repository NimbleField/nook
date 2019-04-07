// Fires when state is changed (play/pause)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.stateChange) {
    switch (request.stateChange) {
      case 'pause':
        chrome.storage.sync.set({ 'state': 'pause' })
        pauseSound()
        break
      case 'play':
        chrome.storage.sync.set({ 'state': 'play' })
        if (kkSliderCheck()) playRandomKK()
        else playSong(globalHours)
        break
    }
  }
})

chrome.storage.sync.get(['state'], result => {
  if (!result['state']) chrome.storage.sync.set({ 'state': 'play' })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.getNowPlaying) {
    chrome.runtime.sendMessage({ 'nowPlaying': nowPlaying }) 
  }
})
