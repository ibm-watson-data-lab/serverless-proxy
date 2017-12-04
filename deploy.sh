#!/bin/bash

if [ -z "$COUCH_HOST" ]; then echo "COUCH_HOST is required"; exit 1; fi
if [ -z "$COUCH_DATABASE" ]; then echo "COUCH_DATABASE is required"; exit 1; fi

# deploy to OpenWhisk
bx wsk package update proxy --param COUCH_HOST $COUCH_HOST --param COUCH_DATABASE $COUCH_DATABASE

# create actions
cd actions
ls *.js | tr '\n' '\0' | xargs -0 -n1 ./deploy_action.sh
cd ..

# create API
bx wsk api create /proxy "/$COUCH_DATABASE" get proxy/get_db --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE" put proxy/put_db --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE" delete proxy/del_db --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_all_docs" get proxy/all_docs --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_all_docs" post proxy/all_docs --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_bulk_docs" post proxy/bulk_docs --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_bulk_get" get proxy/get_bulk_get --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_bulk_get" post proxy/post_bulk_get --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_revs_diff" post proxy/revs_diff --response-type http
bx wsk api create /proxy "/$COUCH_DATABASE/_changes" get proxy/changes --response-type http

