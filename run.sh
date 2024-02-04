#!/bin/bash

# Replace the placeholder with the environment variable value
echo $VITE_BACKEND_URL
sed -i "s|__BACKEND_URL__|$VITE_BACKEND_URL|g" /usr/share/nginx/html/index.html
# echo $FE_PATH
# sed -i "s|__BACKEND_URL__|$FE_PATH|g" /usr/share/nginx/html/index.html

# Execute the default Docker container command after
exec "$@"