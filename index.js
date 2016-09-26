var superagent = require('superagent'),
	_ = require('lodash'),
	log = console.log.bind(console);

module.exports = function(username, password){

	// Common logic for all whoisxmlapi functions
	var get = function(url, query, cb){

		query.username = username;
		query.password = password;

		// Yes both. Some URLs use camelCase, others use snake_text.
		// Specifying both at the same time works fine.
		query.outputFormat = 'JSON';
		query.output_format = 'JSON';

		superagent
		.get(url)
		.query(query)
		.end(function(err, res){

			var isHTML = false;
			var additionalError = null

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
				log("whoisamlapi error:", err)
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

	var lookup = function(domain, cb){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		get('http://www.whoisxmlapi.com/whoisserver/WhoisService', {
			"domainName": domain
		}, cb);
	}

	var setWarnThreshold = function(warnThreshold, warnThresholdEnabled, warnEmptyEnabled, cb){
		// See https://www.whoisxmlapi.com/code/javascript/whois.txt
		get('http://www.whoisxmlapi.com/accountServices.php', {
			"servicetype": "accountUpdate",
			warn_threshold: warnThreshold,
			warn_threshold_enabled: toBool(warnThresholdEnabled),
			warn_empty_enabled: toBool(warnEmptyEnabled)
		}, cb);
	}

	var getAccountBalance = function(cb){
		get('http://www.whoisxmlapi.com/accountServices.php', {
			"servicetype": "accountbalance"
		}, cb)
	}

	return {
		lookup,
		setWarnThreshold,
		getAccountBalance
	}
}
