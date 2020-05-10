#!/usr/bin/env sh
ln -sf /var/lib/ghata/dist/exe/index.js /usr/local/bin/ghata && \
chmod +x /usr/local/bin/ghata && \
exec "$@"