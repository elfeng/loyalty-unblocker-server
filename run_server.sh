#!/bin/sh
set -eu

# For running this service locally, with mongo running locally on port 27017

export OPENSHIFT_MONGODB_DB_URL="mongodb://127.0.0.1"
export DATABASE_SERVICE_NAME=LOYALTY_UNBLOCKER
export LOYALTY_UNBLOCKER_SERVICE_HOST=localhost
export LOYALTY_UNBLOCKER_SERVICE_PORT=27017
export LOYALTY_UNBLOCKER_DATABASE=loyaltyunblocker
npm start

