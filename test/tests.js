// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert'),
	findParentDir = require('find-parent-dir'),
	configDir = findParentDir.sync(__dirname, 'config.js'),
	config = require(configDir+'config.js'),
	whois = require('../index.js')(config.whoisxmlapi.username, config.whoisxmlapi.password, true),
	log = console.log;

suite('whoisxmlapi account management works (uses network)', function(){
	test('account balance', async function(){
		this.timeout(10 * 1000);
		const result = await whois.getAccountBalance()
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

		// log('>>>>> result', result)

		assert(result.balance)
		assert(result.reserve)
	})
})

suite('Set warning threshhold (uses network, actually changes stuff!)', function(){

	test('Set warning threshold', async function(){
		this.timeout(10 * 1000);
		const TEST_WARN_THRESHOLD = 500;
		const result = await whois.setWarnThreshold(TEST_WARN_THRESHOLD, true, true)
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
	})
})


suite('whoisxmlapi returns expected whois results (uses network)', function(){
	test('google.com', async function(){
		this.timeout(10 * 1000);
		const result = await whois.lookup('google.com')
		assert(result.WhoisRecord.technicalContact)
	})

	test('185.119.173.217', async function(){
		this.timeout(10 * 1000);
		const result = await whois.lookup('185.119.173.217')
		assert(result.WhoisRecord.contactEmail)
	})

	test('Domain with no whois', async function(){
		this.timeout(10 * 1000);
		const result = await whois.lookup('register.bs')

		assert(result.WhoisRecord.dataError === "MISSING_WHOIS_DATA")
	})

	test('london.com', async function(){
		this.timeout(10 * 1000);
		const result = await whois.lookup('london.com')
		assert(result.WhoisRecord.technicalContact)
	})

	test('domain with no contact details', async function(){
		this.timeout(10 * 1000);
		const result = await whois.lookup('skagerak.dk')
		assert(result.WhoisRecord.registryData.administrativeContact)
	})
})
