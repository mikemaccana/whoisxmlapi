// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert'),
	findParentDir = require('find-parent-dir'),
	configDir = findParentDir.sync(__dirname, 'config.js'),
	config = require(configDir+'config.js'),
	whois = require('../index.js')(config.whoisxmlapi.username, config.whoisxmlapi.password),
	log = console.log.bind(console)

suite('whoisxmlapi account management works (uses network)', function(){
	test('account balance', function(done){
		this.timeout(10 * 1000);
		whois.getAccountBalance(function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}

			// Example result:
			// {
			//   "balance": "4910",
			//   "reserve": "5100",
			//   "monthly_balance": null,
			//   "monthly_reserve": null,
			//   "reverse_whois_balance": null,
			//   "reverse_whois_reserve": null,
			//   "reverse_whois_monthly_balance": null,
			//   "reverse_whois_monthly_reserve": null,
			//   "ba_query_balance": null,
			//   "ba_query_reserve": null,
			//   "ra_query_balance": null,
			//   "ra_query_reserve": null,
			//   "ds_query_balance": null,
			//   "ds_query_reserve": null,
			//   "reverse_ip_balance": null,
			//   "reverse_ip_reserve": null,
			//   "reverse_ip_monthly_balance": null,
			//   "reverse_ip_monthly_reserve": null
			// }

			assert(result.balance)
			assert(result.reserve)
			done()
		})
	})
})

suite('Set warning threshhold (uses network, actually changes stuff!)', function(){

	test('Set warning threshold', function(done){
		this.timeout(10 * 1000);
		var TEST_WARN_THRESHOLD = 500;
		whois.setWarnThreshold(TEST_WARN_THRESHOLD, true, true, function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}
			// Example result
			// {
			//   "balance": "4910",
			//   "reserve": "5100",
			//   "monthly_balance": null,
			//   "monthly_reserve": null,
			//   "warn_threshold": "500",
			//   "warn_threshold_enabled": "\u0001",
			//   "warn_empty_enabled": "\u0001",
			//   "reverse_whois_balance": null,
			//   "reverse_whois_reserve": null,
			//   "reverse_whois_monthly_balance": null,
			//   "reverse_whois_monthly_reserve": null,
			//   "ba_query_balance": null,
			//   "ba_query_reserve": null,
			//   "ra_query_balance": null,
			//   "ra_query_reserve": null,
			//   "ds_query_balance": null,
			//   "ds_query_reserve": null,
			//   "reverse_ip_balance": null,
			//   "reverse_ip_reserve": null,
			//   "reverse_ip_monthly_balance": null,
			//   "reverse_ip_monthly_reserve": null
			// }
			assert(Number(result.warn_threshold) === TEST_WARN_THRESHOLD)
			done()
		})
	})
})


suite('whoisxmlapi returns expected whois results (uses network)', function(){
	test('google.com', function(done){
		this.timeout(10 * 1000);
		whois.lookup('google.com', function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}
			assert(result.WhoisRecord.technicalContact)
			done()
		})
	})

	test('185.119.173.217', function(done){
		this.timeout(10 * 1000);
		whois.lookup('185.119.173.217', function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}
			assert(result.WhoisRecord.contactEmail)
			done()
		})
	})

	test('london.com', function(done){
		this.timeout(10 * 1000);
		whois.lookup('london.com', function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}
			assert(result.WhoisRecord.technicalContact)
			done(err)
		})
	})

	test('domain with no contact details', function(done){
		this.timeout(10 * 1000);
		whois.lookup('skagerak.dk', function(err, result){
			// Exit ASAP if err
			if ( err ) {
				done(err)
				return
			}
			assert(result.WhoisRecord.registryData.administrativeContact)
			done()
		})
	})
})
