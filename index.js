var superagent = require('superagent'),
	_ = require('lodash'),
	fs = require('fs'),
	log = console.log.bind(console),
	LRU = require("lru-cache");

const CACHE_MAX_ITEMS = 500,
	DEBUG_LOG_FILE = 'whois-history.log';

module.exports = function(username, password, debug){

	var lookupCache = LRU(CACHE_MAX_ITEMS);

	// Common logic for all whoisxmlapi functions
	var get = function(resource, query, cb){

		query.username = username;
		query.password = password;

		// Yes both. Some URLs use camelCase, others use snake_text.
		// Specifying both at the same time works fine.
		query.outputFormat = 'JSON';
		query.output_format = 'JSON';

		superagent
		.get(`https://www.whoisxmlapi.com${resource}`)
		.query(query)
		.end(function(err, res){

			var isHTML = false;
			var additionalError = null

			// Sporadically whoisxmapi seems to not have any response at all
			// We haven't caught this yet, so let log it.
			if ( ! res ) {
				log('No response from whoisxmlapi!', err)
				cb(err, null)
				return
			}

			// the res may sometimes actually *be HTML instead of JSON* - usually for
			// 404s etc. Christ.
			if ( res.text ) {
				isHTML = ( res.text['0'] === '<' )
				if ( isHTML ) {
					log('HTML response from whoisxmlapi for', res.req.path, res.text)
					err = 'Got non-JSON response from whoisxmlapi'
					return
				} else {
					// whoisxmlapi.com incorrectly uses text/plain as the type instead of JSON
					res.body = JSON.parse(res.text);
				}
			}

			// Eg, { ErrorMessage: { msg: 'User Account certsimple has 0/5100 queries available, please refill' } }
			if ( res.body ) {
				var additionalError = _.get(res.body, ['ErrorMessage','msg'], null)
				if ( additionalError ) {
					err = additionalError;
				}
			}

			if ( err ) {
				log("whoisxmlapi error:", err)
				cb(err)
				return
			}

			cb(err, res.body || null)

		})
	}

	// whoisxmlapi has a weird way of encoding booleans
	var toBool = function(value){
		return value ? 1 : 0;
	}

	var lookupRaw = function(domain, cb){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		// NOTE: the docs use an insecure URL, but https works.
		get('/whoisserver/WhoisService', {
			domainName: domain
		}, cb);
	}

	// Add a cache to whois
	// Makes our app faster and limits repeated API calls
	var lookup = function(domain, cb){
		var cachedEntry = lookupCache.get(domain)
		if ( cachedEntry ) {
			cb(null, cachedEntry)
			return
		}
		lookupRaw(domain, function(err, result){
			if ( ! err ) {
				if ( result ) {
					lookupCache.set(domain, result)
				}
			}
			cb(err, result)
		})
	}

	var setWarnThreshold = function(warnThreshold, warnThresholdEnabled, warnEmptyEnabled, cb){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		get('/accountServices.php', {
			servicetype: "accountUpdate",
			warn_threshold: warnThreshold,
			warn_threshold_enabled: toBool(warnThresholdEnabled),
			warn_empty_enabled: toBool(warnEmptyEnabled)
		}, cb);
	}

	var getAccountBalance = function(cb){
		get('/accountServices.php', {
			servicetype: "accountbalance"
		}, cb)
	}

	return {
		lookup,
		setWarnThreshold,
		getAccountBalance
	}
}
