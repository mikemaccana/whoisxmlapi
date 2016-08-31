A client for https://whoisxmlapi.com, that returns results in JSON.

The whoisxmlapi is a non-REST HTTP API, ie, it's not very good.

 - GET is used to change things
 - Resources aren't endpoints, instead the same resource is accessed by different query parameters to do very different things
 - Credentials are insecurely sent in query strings rather than headers (these can leak into caches etc)
 - JSON is sent with incorrect content encoding
 - Numbers are sent as strings

However, whoisxmlapi works reliably. Other services I've tried (particularly jsoinwhois.com) sporadically gave 500 errors and staff didn't respond in a reasonable time about fixing them.

Hence writing this module to:

 - a) help me use the service
 - b) save you the trouble of working around endpoints

# Installation

	npm install whoisxmlapi

# Usage

Just:

	var whois = require('whoisxmlapi')(username, password);

## Basic whois lookup

	whois.lookup('google.com', function(err, result){
		console.log(JSON.stringify(result, null, 2))
	})

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
	    },
	    "status": "clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)\nclientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)\nclientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)\nserverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)\nserverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)\nserverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)",
	    "rawText": "Domain Name: google.com\nRegistry Domain ID: 2138514_DOMAIN_COM-VRSN\nRegistrar WHOIS Server: whois.markmonitor.com\nRegistrar URL: http://www.markmonitor.com\nUpdated Date: 2015-06-12T10:38:52-0700\nCreation Date: 1997-09-15T00:00:00-0700\nRegistrar Registration Expiration Date: 2020-09-13T21:00:00-0700\nRegistrar: MarkMonitor, Inc.\nRegistrar IANA ID: 292\nRegistrar Abuse Contact Email: abusecomplaints@markmonitor.com\nRegistrar Abuse Contact Phone: +1.2083895740\nDomain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)\nDomain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)\nDomain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)\nDomain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)\nDomain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)\nDomain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)\nRegistry Registrant ID: \nRegistrant Name: Dns Admin\nRegistrant Organization: Google Inc.\nRegistrant Street: Please contact contact-admin@google.com, 1600 Amphitheatre Parkway\nRegistrant City: Mountain View\nRegistrant State/Province: CA\nRegistrant Postal Code: 94043\nRegistrant Country: US\nRegistrant Phone: +1.6502530000\nRegistrant Phone Ext: \nRegistrant Fax: +1.6506188571\nRegistrant Fax Ext: \nRegistrant Email: dns-admin@google.com\nRegistry Admin ID: \nAdmin Name: DNS Admin\nAdmin Organization: Google Inc.\nAdmin Street: 1600 Amphitheatre Parkway\nAdmin City: Mountain View\nAdmin State/Province: CA\nAdmin Postal Code: 94043\nAdmin Country: US\nAdmin Phone: +1.6506234000\nAdmin Phone Ext: \nAdmin Fax: +1.6506188571\nAdmin Fax Ext: \nAdmin Email: dns-admin@google.com\nRegistry Tech ID: \nTech Name: DNS Admin\nTech Organization: Google Inc.\nTech Street: 2400 E. Bayshore Pkwy\nTech City: Mountain View\nTech State/Province: CA\nTech Postal Code: 94043\nTech Country: US\nTech Phone: +1.6503300100\nTech Phone Ext: \nTech Fax: +1.6506181499\nTech Fax Ext: \nTech Email: dns-admin@google.com\nName Server: ns1.google.com\nName Server: ns3.google.com\nName Server: ns2.google.com\nName Server: ns4.google.com\nDNSSEC: unsigned\nURL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/\n>>> Last update of WHOIS database: 2016-08-02T09:40:21-0700 <<<\n\nThe Data in MarkMonitor.com's WHOIS database is provided by MarkMonitor.com for\ninformation purposes, and to assist persons in obtaining information about or\nrelated to a domain name registration record.  MarkMonitor.com does not guarantee\nits accuracy.  By submitting a WHOIS query, you agree that you will use this Data\nonly for lawful purposes and that, under no circumstances will you use this Data to:\n (1) allow, enable, or otherwise support the transmission of mass unsolicited,\n     commercial advertising or solicitations via e-mail (spam); or\n (2) enable high volume, automated, electronic processes that apply to\n     MarkMonitor.com (or its systems).\nMarkMonitor.com reserves the right to modify these terms at any time.\nBy submitting this query, you agree to abide by this policy.\n\nMarkMonitor is the Global Leader in Online Brand Protection.\n\nMarkMonitor Domain Management(TM)\nMarkMonitor Brand Protection(TM)\nMarkMonitor AntiPiracy(TM)\nMarkMonitor AntiFraud(TM)\nProfessional and Managed Services\n\nVisit MarkMonitor at http://www.markmonitor.com\nContact us at +1.8007459229\nIn Europe, at +44.02032062220\n\nFor more information on Whois status codes, please visit\n https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en\n--",
	    "parseCode": 3515,
	    "header": "",
	    "strippedText": "Domain Name: google.com\nRegistrar URL: http://www.markmonitor.com\nUpdated Date: 2015-06-12T10:38:52-0700\nCreation Date: 1997-09-15T00:00:00-0700\nRegistrar Registration Expiration Date: 2020-09-13T21:00:00-0700\nRegistrar: MarkMonitor, Inc.\nRegistrar IANA ID: 292\nRegistrar Abuse Contact Email: abusecomplaints@markmonitor.com\nRegistrar Abuse Contact Phone: +1.2083895740\nDomain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)\nDomain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)\nDomain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)\nDomain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)\nDomain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)\nDomain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)\nRegistrant Name: Dns Admin\nRegistrant Organization: Google Inc.\nRegistrant Street: Please contact contact-admin@google.com, 1600 Amphitheatre Parkway\nRegistrant City: Mountain View\nRegistrant State/Province: CA\nRegistrant Postal Code: 94043\nRegistrant Country: US\nRegistrant Phone: +1.6502530000\nRegistrant Fax: +1.6506188571\nRegistrant Email: dns-admin@google.com\nAdmin Name: DNS Admin\nAdmin Organization: Google Inc.\nAdmin Street: 1600 Amphitheatre Parkway\nAdmin City: Mountain View\nAdmin State/Province: CA\nAdmin Postal Code: 94043\nAdmin Country: US\nAdmin Phone: +1.6506234000\nAdmin Fax: +1.6506188571\nAdmin Email: dns-admin@google.com\nTech Name: DNS Admin\nTech Organization: Google Inc.\nTech Street: 2400 E. Bayshore Pkwy\nTech City: Mountain View\nTech State/Province: CA\nTech Postal Code: 94043\nTech Country: US\nTech Phone: +1.6503300100\nTech Fax: +1.6506181499\nTech Email: dns-admin@google.com\nName Server: ns1.google.com\nName Server: ns3.google.com\nName Server: ns2.google.com\nName Server: ns4.google.com\n",
	    "audit": {
	      "createdDate": {
	        "@class": "sql-timestamp",
	        "$": "2016-08-02 16:45:23.000 UTC"
	      },
	      "updatedDate": {
	        "@class": "sql-timestamp",
	        "$": "2016-08-02 16:45:23.000 UTC"
	      }
	    },
	    "customField1Name": "RegistrarContactEmail",
	    "customField1Value": "abusecomplaints@markmonitor.com",
	    "registrarName": "MarkMonitor, Inc.",
	    "registrarIANAID": "292",
	    "customField2Name": "RegistrarContactPhone",
	    "customField3Name": "RegistrarURL",
	    "customField2Value": "+1.2083895740",
	    "customField3Value": "http://www.markmonitor.com",
	    "registryData": {
	      "createdDate": "15-sep-1997",
	      "updatedDate": "20-jul-2011",
	      "expiresDate": "14-sep-2020",
	      "domainName": "google.com",
	      "nameServers": {
	        "rawText": "NS1.GOOGLE.COM\nNS2.GOOGLE.COM\nNS3.GOOGLE.COM\nNS4.GOOGLE.COM\n",
	        "hostNames": [
	          "NS1.GOOGLE.COM",
	          "NS2.GOOGLE.COM",
	          "NS3.GOOGLE.COM",
	          "NS4.GOOGLE.COM"
	        ],
	        "ips": []
	      },
	      "status": "clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited\nclientTransferProhibited https://icann.org/epp#clientTransferProhibited\nclientUpdateProhibited https://icann.org/epp#clientUpdateProhibited\nserverDeleteProhibited https://icann.org/epp#serverDeleteProhibited\nserverTransferProhibited https://icann.org/epp#serverTransferProhibited\nserverUpdateProhibited https://icann.org/epp#serverUpdateProhibited",
	      "rawText": "Whois Server Version 2.0\n\nDomain names in the .com and .net domains can now be registered\nwith many different competing registrars. Go to http://www.internic.net\nfor detailed information.\n\n   Domain Name: GOOGLE.COM\n   Registrar: MARKMONITOR INC.\n   Sponsoring Registrar IANA ID: 292\n   Whois Server: whois.markmonitor.com\n   Referral URL: http://www.markmonitor.com\n   Name Server: NS1.GOOGLE.COM\n   Name Server: NS2.GOOGLE.COM\n   Name Server: NS3.GOOGLE.COM\n   Name Server: NS4.GOOGLE.COM\n   Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited\n   Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\n   Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited\n   Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited\n   Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited\n   Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited\n   Updated Date: 20-jul-2011\n   Creation Date: 15-sep-1997\n   Expiration Date: 14-sep-2020\n\n>>> Last update of whois database: Tue, 02 Aug 2016 16:45:10 GMT <<<\n\nFor more information on Whois status codes, please visit https://icann.org/epp\n\nNOTICE: The expiration date displayed in this record is the date the\nregistrar's sponsorship of the domain name registration in the registry is\ncurrently set to expire. This date does not necessarily reflect the expiration\ndate of the domain name registrant's agreement with the sponsoring\nregistrar.  Users may consult the sponsoring registrar's Whois database to\nview the registrar's reported date of expiration for this registration.\n\nTERMS OF USE: You are not authorized to access or query our Whois\ndatabase through the use of electronic processes that are high-volume and\nautomated except as reasonably necessary to register domain names or\nmodify existing registrations; the Data in VeriSign Global Registry\nServices' (\"VeriSign\") Whois database is provided by VeriSign for\ninformation purposes only, and to assist persons in obtaining information\nabout or related to a domain name registration record. VeriSign does not\nguarantee its accuracy. By submitting a Whois query, you agree to abide\nby the following terms of use: You agree that you may use this Data only\nfor lawful purposes and that under no circumstances will you use this Data\nto: (1) allow, enable, or otherwise support the transmission of mass\nunsolicited, commercial advertising or solicitations via e-mail, telephone,\nor facsimile; or (2) enable high volume, automated, electronic processes\nthat apply to VeriSign (or its computer systems). The compilation,\nrepackaging, dissemination or other use of this Data is expressly\nprohibited without the prior written consent of VeriSign. You agree not to\nuse electronic processes that are automated and high-volume to access or\nquery the Whois database except as reasonably necessary to register\ndomain names or modify existing registrations. VeriSign reserves the right\nto restrict your access to the Whois database in its sole discretion to ensure\noperational stability.  VeriSign may restrict or terminate your access to the\nWhois database for failure to abide by these terms of use. VeriSign\nreserves the right to modify these terms at any time.\n\nThe Registry database contains ONLY .COM, .NET, .EDU domains and\nRegistrars.",
	      "parseCode": 255,
	      "header": "Whois Server Version 2.0\nDomain names in the .com and .net domains can now be registered\nwith many different competing registrars. Go to http://www.internic.net\nfor detailed information.",
	      "strippedText": "Domain Name: GOOGLE.COM\nRegistrar: MARKMONITOR INC.\nSponsoring Registrar IANA ID: 292\nWhois Server: whois.markmonitor.com\nReferral URL: http://www.markmonitor.com\nName Server: NS1.GOOGLE.COM\nName Server: NS2.GOOGLE.COM\nName Server: NS3.GOOGLE.COM\nName Server: NS4.GOOGLE.COM\nStatus: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited\nStatus: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\nStatus: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited\nStatus: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited\nStatus: serverTransferProhibited https://icann.org/epp#serverTransferProhibited\nStatus: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited\nUpdated Date: 20-jul-2011\nCreation Date: 15-sep-1997\nExpiration Date: 14-sep-2020\nDomain Name: GOOGLE.COM\nRegistrar: MARKMONITOR INC.\nSponsoring Registrar IANA ID: 292\nWhois Server: whois.markmonitor.com\nReferral URL: http://www.markmonitor.com\nName Server: NS1.GOOGLE.COM\nName Server: NS2.GOOGLE.COM\nName Server: NS3.GOOGLE.COM\nName Server: NS4.GOOGLE.COM\nStatus: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited\nStatus: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\nStatus: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited\nStatus: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited\nStatus: serverTransferProhibited https://icann.org/epp#serverTransferProhibited\nStatus: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited\nUpdated Date: 20-jul-2011\nCreation Date: 15-sep-1997\n",
	      "footer": ">>> Last update of whois database: Tue, 02 Aug 2016 16:45:10 GMT <<<\nFor more information on Whois status codes, please visit https://icann.org/epp\nNOTICE: The expiration date displayed in this record is the date the\nregistrar's sponsorship of the domain name registration in the registry is\ncurrently set to expire. This date does not necessarily reflect the expiration\ndate of the domain name registrant's agreement with the sponsoring\nregistrar.  Users may consult the sponsoring registrar's Whois database to\nview the registrar's reported date of expiration for this registration.\nTERMS OF USE: You are not authorized to access or query our Whois\ndatabase through the use of electronic processes that are high-volume and\nautomated except as reasonably necessary to register domain names or\nmodify existing registrations; the Data in VeriSign Global Registry\nServices' (\"VeriSign\") Whois database is provided by VeriSign for\ninformation purposes only, and to assist persons in obtaining information\nabout or related to a domain name registration record. VeriSign does not\nguarantee its accuracy. By submitting a Whois query, you agree to abide\nby the following terms of use: You agree that you may use this Data only\nfor lawful purposes and that under no circumstances will you use this Data\nto: (1) allow, enable, or otherwise support the transmission of mass\nunsolicited, commercial advertising or solicitations via e-mail, telephone,\nor facsimile; or (2) enable high volume, automated, electronic processes\nthat apply to VeriSign (or its computer systems). The compilation,\nrepackaging, dissemination or other use of this Data is expressly\nprohibited without the prior written consent of VeriSign. You agree not to\nuse electronic processes that are automated and high-volume to access or\nquery the Whois database except as reasonably necessary to register\ndomain names or modify existing registrations. VeriSign reserves the right\nto restrict your access to the Whois database in its sole discretion to ensure\noperational stability.  VeriSign may restrict or terminate your access to the\nWhois database for failure to abide by these terms of use. VeriSign\nreserves the right to modify these terms at any time.\nThe Registry database contains ONLY .COM, .NET, .EDU domains and\nRegistrars.",
	      "audit": {
	        "createdDate": {
	          "@class": "sql-timestamp",
	          "$": "2016-08-02 16:45:23.000 UTC"
	        },
	        "updatedDate": {
	          "@class": "sql-timestamp",
	          "$": "2016-08-02 16:45:23.000 UTC"
	        }
	      },
	      "registrarName": "MARKMONITOR INC.",
	      "registrarIANAID": "292",
	      "createdDateNormalized": "1997-09-15 00:00:00 UTC",
	      "updatedDateNormalized": "2011-07-20 00:00:00 UTC",
	      "expiresDateNormalized": "2020-09-14 00:00:00 UTC",
	      "whoisServer": "whois.markmonitor.com",
	      "referralURL": "http://www.markmonitor.com"
	    },
	    "contactEmail": "dns-admin@google.com",
	    "domainNameExt": ".com",
	    "estimatedDomainAge": 6897
	  }
	}

## Getting account balance

  whois.getAccountBalance(function(err, result){
  	console.log(JSON.stringify(result, null, 2))
  })

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

  whois.setWarnThreshold(500, true, true, function(err, result){
  	console.log(JSON.stringify(result, null, 2))
  })

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

Tests expect a 'config.js' file in the module dir or a parent dir with the following contents:

	'whoisxmlapi': {
		// From https://www.whoisxmlapi.com/user/management.php
		'username': 'some-username',
		'password': 'some-password',
	}

Then run:

	mocha

To execute the tests