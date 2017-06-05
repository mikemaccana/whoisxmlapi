var superagent = require('superagent'),
	_ = require('lodash'),
	fs = require('fs'),
	log = console.log.bind(console),
	LRU = require("lru-cache");

module.exports = function(username, password, options){

	options = options || {};

	const CACHE_MAX_ITEMS = options.cacheMaxItems || 500;

	var lookupCache = LRU(CACHE_MAX_ITEMS);

	// Common logic for all whoisxmlapi functions
	var get = async function(resource, query){

		try {
			query.username = username;
			query.password = password;

			// Yes both. Some URLs use camelCase, others use snake_text.
			// Specifying both at the same time works fine.
			query.outputFormat = 'JSON';
			query.output_format = 'JSON';

			var response = await superagent.get(`https://www.whoisxmlapi.com${resource}`).query(query)

			// whoisxmlapi.com incorrectly uses text/plain as the type instead of JSON
			// the res may sometimes actually *be HTML instead of JSON* - usually for
			// 404s etc. Christ.
			var isHTML = false;
			if ( response.text ) {
				isHTML = ( response.text['0'] === '<' )
				if ( isHTML ) {
					throw new Error(`Got non-JSON response from whoisxmlapi ${response.req.path}`)
					return
				} else {
					// whoisxmlapi.com incorrectly uses text/plain as the type instead of JSON
					response.body = JSON.parse(response.text);
				}
			}

			// There are sometimes additional errors
			// Eg, { ErrorMessage: { msg: 'User Account useraccountname has 0/5100 queries available, please refill' } }
			var additionalError = null
			if ( response.body ) {
				additionalError = _.get(response.body,'ErrorMessage.msg')
				if ( additionalError ) {
					throw new Error(additionalError)
				}
			}

			// If there's no whois (eg, .bs TLD) just return null
			if ( _.get(response.body, 'WhoisRecord.dataError') === "MISSING_WHOIS_DATA") {
				return null
			}

			return response.body

		}	catch (error) {
			// Sporadically whoisxmapi seems to not have any response at all
			// We haven't caught this yet, so let log it.x
			log('No response from whoisxmlapi!', error)
		}
	}

	// whoisxmlapi has a weird way of encoding booleans
	var toBool = function(value){
		return value ? 1 : 0;
	}

	var lookupRaw = function(domain){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		// NOTE: the docs use an insecure URL, but https works.
		return get('/whoisserver/WhoisService', {
			domainName: domain
		});
	}

	// Add a cache to whois
	// Makes our app faster and limits repeated API calls
	var lookup = function(domain){
		var cachedEntry = lookupCache.get(domain)
		if ( cachedEntry ) {
			return cachedEntry
		}
		const result = lookupRaw(domain)

		if ( result ) {
			lookupCache.set(domain, result)
		}

		return result
	}

	var setWarnThreshold = function(warnThreshold, warnThresholdEnabled, warnEmptyEnabled, cb){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		return get('/accountServices.php', {
			servicetype: "accountUpdate",
			warn_threshold: warnThreshold,
			warn_threshold_enabled: toBool(warnThresholdEnabled),
			warn_empty_enabled: toBool(warnEmptyEnabled)
		});
	}

	var getAccountBalance = function(cb){
		return get('/accountServices.php', {
			servicetype: "accountbalance"
		})
	}

	return {
		lookup,
		setWarnThreshold,
		getAccountBalance
	}
}
