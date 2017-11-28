# serverless-proxy

This is an OpenWhisk (IBM Cloud Functions) service that acts as a proxy for a Cloudant database. Why would you need such a service as Cloudant has a perfectly usable HTTP API anyway? Simply to:

- serve your Cloudant service on a domain name of your choice instead of `xxxxxxx.cloudant.com`
- optionally, have a more complex authentication by using the API Gateway's OAuth or API Key service
- optionally, implement your own rate-limiting using the API Gateway's 

## Prerequisites

Clone this repository

    git clone https://github.com/ibm-watson-data-lab/serverless-proxy.git
    cd serverless-proxy

[Sign up for a Bluemix account](https://bluemix.net) and follow the [Getting Started with IBM Cloud Functions guide](https://console.ng.bluemix.net/openwhisk/getting-started) to download the `bx wsk` tool and configure it for your Bluemix account.

In your Bluemix dashboard, create a Cloudant service and make a note of its URL. In the Cloudant dashboard, create a new empty database (say, 'mydb').

## Installation

On the command-line, create two environment variables containing your Cloudant URL and the database name:

    export COUCH_HOST="https://USERNAME:PASSWORD@HOST.cloudant.com"
    export COUCH_DATABASE="mydb"

and run the deployment script:

    ./deploy.sh

This will deploy the serverless actions and create an API wrapper around them allowing you to access your Cloudant service from a URL like this:

 curl 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/123456/proxy/mydb/_all_docs'

## Custom domains

It is also possible to use this API using your own custom domain name. Ensure you have:

- your own domain name
- a CNAME DNS record for your domain name or a sub-domain pointing to the Bluemix service
- a secure certificate for your domain name. You can use a service such as [https://www.sslforfree.com](https://www.sslforfree.com) which is powered by [https://letsencrypt.org/](https://letsencrypt.org/) that issues free SSL certificates

Follow the instructions [here](https://console.bluemix.net/docs/apis/management/manage_apis.html#custom_domains) to piece it all together. 
