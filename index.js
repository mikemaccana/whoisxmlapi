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
		.end(function(err, result){

			// whoisxmlapi.com incorrectly uses text/plain as the type instead of JSON
			result.body = JSON.parse(result.text);

			// Eg, { ErrorMessage: { msg: 'User Account certsimple has 0/5100 queries available, please refill' } }
			var additionalError = _.get(result.body, ['ErrorMessage','msg'], null)
			if ( additionalError ) {
				err = additionalError;
			}

			if ( err ) {
				log("jsonwhois error:", err)
				return cb(err)
			}

			cb(err, result.body || null)

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
