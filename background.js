let mode
const title = ['closed', 'normal', 'enhanced']
const icon = ['images/grey.svg', 'images/red.svg', 'images/blue.svg']
const ruleSets = [[['cache', 'source'], []], [['cache'], ['source']], [[], ['cache', 'source']]]

const sync = () => {
	chrome.storage.local.set({ mode })
	chrome.browserAction.setIcon({ path: icon[mode] })
	chrome.browserAction.setTitle({ title: `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(title[mode])}]` })
	chrome.declarativeNetRequest.updateEnabledRulesets.apply(null, ruleSets[mode].concat(() => null))
}

chrome.browserAction.onClicked.addListener(() => {
	mode = (mode + 1) % 3
	sync()
})

chrome.storage.local.get('mode', data => {
	mode = data.mode == null ? 2 : data.mode
	sync()
})
