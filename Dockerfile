FROM mhart/alpine-node:4

WORKDIR /src
ADD . .

# For our native dependencies
RUN apk add --update make gcc g++ python openssl

# Install Node dependencies
RUN npm install

# Remove build tools
RUN apk del make gcc g++ python && \
  rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 3000
CMD ["node", "index.js"]