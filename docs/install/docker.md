# Installing 🍯 ghata on 👻 Ghost for 🐬 Docker

🍯 **ghata** is a storage 🔌 adapter that takes your uploaded images, videos, or any assets and uploads them to a 🌊 <a href="https://m.do.co/c/c0f92a1a058a" target="_blank" rel="noopener">Digital Ocean Space</a>. By having these assets in a Digital Ocean Space and not having your server serve these static assets, majority of the load can be transferred to the CDN offered by Digital Ocean Spaces which makes your Ghost blog load faster.

> **Note:** This tutorial is intended for usage with 🐬 Docker and 👻 Ghost configured using `docker-compose`. For a _typical_ installation with Ghost-CLI checkout the [typical installation](typical.md) instructions instead.

## Prerequisites
1. Ghost blog (obviously 🤷‍♂️)
2. Digital Ocean Space (preferably with _custom domain_ + _CDN_ + _SSL_)
3. SSH access to the computer where Ghost is installed
4. Access to edit the `docker-compose.yml` file and deploy Docker containers

## Getting Endpoint and 🔐 API keys from 🌊 Digital Ocean

Now that we have an installation of **ghata**, we need to obtain **endpoint, an API key, and a secret** in order for **ghata** to communicate with Digital Ocean Spaces.

### Obtaining Endpoint

To get the endpoint of your Digital Ocean Space, first login to Digital Ocean and click on **"Spaces"** in the sidebar.

![spaces sidebar](https://static.vasanthdeveloper.com/ghata/install/spaces-sidebar.png)

Here select a Digital Ocean Space where you would like to store assets for your Ghost blog. As, I have only 1 Space with the name **"static.vasanthdeveloper.com"**, I select it by clicking on it.

![available spaces](https://static.vasanthdeveloper.com/ghata/install/spaces-list.png)

Now, head over to the settings tab like so 👇

![spaces settings tab](https://static.vasanthdeveloper.com/ghata/install/spaces-settings.png)

In this tab, scrolling down a little bit you will find the **"Endpoint"** section. Click on the copy button, to copy your endpoint and save it somewhere or write it down.

![spaces endpoint](https://static.vasanthdeveloper.com/ghata/install/spaces-endpoint.png)

### Obtaining API Keys

The last pieces of information we need from 🌊 Digital Ocean are the API key and the secret. To get those, click on the **"API"** in the sidebar.

![API sidebar](https://static.vasanthdeveloper.com/ghata/install/api-sidebar.png)

In this page, scrolling down a bit you will find **"Spaces access keys"** section. Here, click on the **"Generate New Key"** button like so 👇

![spaces access keys](https://static.vasanthdeveloper.com/ghata/install/spaces-keys.png)

Once you click the button, you will be asked to enter a name for the **key/secret pair** to be created. Type in a name and click the blue tick button to confirm the creation of a 🌊 Digital Ocean API key.

![spaces key creation](https://static.vasanthdeveloper.com/ghata/install/spaces-create-key.png)

Once you click this button with in a second or so, you will get your newly generated key and secret. Hovering over them with you mouse 🐁 will reveal a copy link. Click on the **"Copy"** link for both the key and the secret and paste it in a text editor or somewhere secure.

![spaces key](https://static.vasanthdeveloper.com/ghata/install/spaces-key.png)

## Installing 🍯 ghata

Installation of 🍯 **ghata** is done by modifying the `docker-compose.yml` file and adding a custom `command` key and defining environment variables to the `ghost` service. Below is an example `docker-compose.yml` file, that uses **ghata** 👇

```yaml
version: '3.8'
services:
    blog:
        image: ghost:alpine
        container_name: ghost
        command: sh -c 'sh -c "npx ghata --auto" && node current/index.js'
        ports:
            - 2368:2368
        environment:
            GHATA_CONFIG: config.production.json
            GHATA_ENDPOINT: [endpoint]
            GHATA_BUCKET: [bucket_name]
            GHATA_SUBDOMAIN: [subdomain.tld.extension]
            GHATA_PATH: ghost
            GHATA_KEY: [some_key]
            GHATA_SECRET: [some_secret]
```

Replace the values in square brackets with the appropriate values **without square brackets**. The `GHATA_SUBDOMAIN` variable is optional and 🍯 **ghata** will automatically figure out the subdomain in case the variable isn't defined.

And, you are pretty much done 👍