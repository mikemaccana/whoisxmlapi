A client for https://whoisxmlapi.com, that returns results in JSON.

The whoisxmlapi is a non-REST HTTP API, ie, it's not very good.

 - GET is used to change things
 - Resources aren't endpoints, instead the same resource is accessed by different query parameters to do very different things
 - Credentials are insecurely sent in query strings rather than headers (these can leak into caches etc)
 - JSON is sent with incorrect content encoding
 - Numbers are sent as Strings
 - Booleans are sent as Numbers

However, whoisxmlapi works reliably. Other services I've tried (particularly https://jsonwhois.com) sporadically gave 500 errors and staff didn't respond in a reasonable time about fixing them.

Hence writing this module to:

 - a) help me use the service
 - b) save you the trouble of working around the oddness described above

# Now requires node 8

This library now uses async/awaitfrom node v8. This means you can `await` results from your whois tests without callbacks.

	const result = await whois.lookup('google.com')

Use v1 if you really like callbacks.

# Installation

	npm install whoisxmlapi

# Usage

Just:

	var whois = require('whoisxmlapi')(username, password, options);

Where:

 - `username` and `password` are Strings and mandatory
 - `options` is an Object and optional.

## Options

 - `cacheMaxItems` - how many whois results to keep in the cache.

That's all for now.

## Basic whois lookup

	const result = await whois.lookup('google.com')
	console.log(JSON.stringify(result, null, 2))

Returns the following results:

	{
		"WhoisRecord": {
			"createdDate": "1997-09-15T00:00:00-0700",
			"updatedDate": "2015-06-12T10:38:52-0700",
			"expiresDate": "2020-09-13T21:00:00-0700",
			"registrant": {
				"name": "Dns Admin",
				"organization": "Google Inc.",
				"street1": "Please contact contact-admin@google.com, 1600 Amphitheatre Parkway",
				"city": "Mountain View",
				"state": "CA",
				"postalCode": "94043",
				"country": "UNITED STATES",
				"email": "dns-admin@google.com",
				"telephone": "16502530000",
				"fax": "16506188571",
				"rawText": "Registrant Name: Dns Admin\nRegistrant Organization: Google Inc.\nRegistrant Street: Please contact contact-admin@google.com, 1600 Amphitheatre Parkway\nRegistrant City: Mountain View\nRegistrant State/Province: CA\nRegistrant Postal Code: 94043\nRegistrant Country: US\nRegistrant Phone: +1.6502530000\nRegistrant Fax: +1.6506188571\nRegistrant Email: dns-admin@google.com"
			},
			"administrativeContact": {
				"name": "DNS Admin",
				"organization": "Google Inc.",
				"street1": "1600 Amphitheatre Parkway",
				"city": "Mountain View",
				"state": "CA",
				"postalCode": "94043",
				"country": "UNITED STATES",
				"email": "dns-admin@google.com",
				"telephone": "16506234000",
				"fax": "16506188571",
				"rawText": "Admin Name: DNS Admin\nAdmin Organization: Google Inc.\nAdmin Street: 1600 Amphitheatre Parkway\nAdmin City: Mountain View\nAdmin State/Province: CA\nAdmin Postal Code: 94043\nAdmin Country: US\nAdmin Phone: +1.6506234000\nAdmin Fax: +1.6506188571\nAdmin Email: dns-admin@google.com"
			},
			"technicalContact": {
				"name": "DNS Admin",
				"organization": "Google Inc.",
				"street1": "2400 E. Bayshore Pkwy",
				"city": "Mountain View",
				"state": "CA",
				"postalCode": "94043",
				"country": "UNITED STATES",
				"email": "dns-admin@google.com",
				"telephone": "16503300100",
				"fax": "16506181499",
				"rawText": "Tech Name: DNS Admin\nTech Organization: Google Inc.\nTech Street: 2400 E. Bayshore Pkwy\nTech City: Mountain View\nTech State/Province: CA\nTech Postal Code: 94043\nTech Country: US\nTech Phone: +1.6503300100\nTech Fax: +1.6506181499\nTech Email: dns-admin@google.com"
			},
			"domainName": "google.com",
			"nameServers": {
				"rawText": "ns1.google.com\nns3.google.com\nns2.google.com\nns4.google.com\n",
				"hostNames": [
					"ns1.google.com",
					"ns3.google.com",
					"ns2.google.com",
					"ns4.google.com"
				],
				"ips": []
			}
			(cut for brevity)
		}
	}

## Getting account balance

	const result = await whois.getAccountBalance()
	console.log(JSON.stringify(result, null, 2))

Returns the following results:

	{
		"balance": "4910",
		"reserve": "5100",
		"monthly_balance": null,
		"monthly_reserve": null,
		"reverse_whois_balance": null,
		"reverse_whois_reserve": null,
		"reverse_whois_monthly_balance": null,
		"reverse_whois_monthly_reserve": null,
		"ba_query_balance": null,
		"ba_query_reserve": null,
		"ra_query_balance": null,
		"ra_query_reserve": null,
		"ds_query_balance": null,
		"ds_query_reserve": null,
		"reverse_ip_balance": null,
		"reverse_ip_reserve": null,
		"reverse_ip_monthly_balance": null,
		"reverse_ip_monthly_reserve": null
	}

## Setting warning threshhold

	const result = whois.setWarnThreshold(500, true, true)
	console.log(JSON.stringify(result, null, 2))

Returns the following results:

	{
		"balance": "4910",
		"reserve": "5100",
		"monthly_balance": null,
		"monthly_reserve": null,
		"warn_threshold": "500",
		"warn_threshold_enabled": "\u0001",
		"warn_empty_enabled": "\u0001",
		"reverse_whois_balance": null,
		"reverse_whois_reserve": null,
		"reverse_whois_monthly_balance": null,
		"reverse_whois_monthly_reserve": null,
		"ba_query_balance": null,
		"ba_query_reserve": null,
		"ra_query_balance": null,
		"ra_query_reserve": null,
		"ds_query_balance": null,
		"ds_query_reserve": null,
		"reverse_ip_balance": null,
		"reverse_ip_reserve": null,
		"reverse_ip_monthly_balance": null,
		"reverse_ip_monthly_reserve": null
	}

# Running the integration tests

Tests expect a `config.js` file in the module dir or a parent dir with the following contents:

	'whoisxmlapi': {
		// From https://www.whoisxmlapi.com/user/management.php
		'username': 'some-username',
		'password': 'some-password',
	}

Then run:

	mocha

To execute the tests