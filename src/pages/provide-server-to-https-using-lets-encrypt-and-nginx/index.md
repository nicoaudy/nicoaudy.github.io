---
title: Provide Server To Https Using Let's Encrypt And Nginx
date: '2019-04-03'
spoiler: If you are starting now and want a safe server installation, I suggest you read this article.
---

---

Let's start with some definitions and then we start with the magic steps:

* Let's encrypt: is a certificate authority (CA) that provides free digital certificates to allow HTTPS on websites.
* Nginx: is a web server that can be used also as load balancer, reverse proxy, mail proxy and HTTP cache.
* HTTPS: (Hyper Text Transfer Protocol Secure) is an implementation of the HTTP protocol over an additional security layer that uses the SSL/TLS protocol.
* SSL/TLS protocol: Transport Layer Security (TLS) and its predecessor, Secure Sockets Layer (SSL) (which is now deprecated) are application protocols that provide communications security over a computer network.
* Certbot: is a client (tool) that runs on the server to fetch and deploy SSL certificates.

And why should I have an HTTPS website? The main reason that you should use HTTPS is that you guarantee that your connection with the server is secure.

### Install Nginx and Certbot
Connect to your server. Type the following command to install Nginx:

```bash
$ sudo apt-get install nginx
```

We will use the Certbot repository to get up-to-date versions of the packages. Let's add it:

```bash
$ sudo add-apt-repository ppa:certbot/certbot
```

Update the package list to have up-to-date items:

```bash
$ sudo apt-get update
```

Install Certbot's Nginx package:

```bash
$ sudo apt-get install python-certbot-nginx
```

### Generate certificate and configure Nginx
Finally, let's make Certbot get a certificate and configure it automatically to us:

```bash
$ sudo certbot --nginx -d yourdomain.com
```

For this step, you will need to add your email (will receive notifications from Let's Encrypt, if the certificate is about to expire). You will have two options: Redirect or not the requests from HTTP to HTTPS. I chose to Redirect.

If you previously set a firewall, read the section 'Allow firewall' bellow, if not, that's it, you will have your website using HTTPS. 🎉

### Allow Firewall

```bash
$ sudo ufw allow https
```

And then restart nginx

```bash
$ sudo service nginx restart
```

### Auto Renew Let’s Encrypt Certificate

In order to automatically renew a certificate issued by Let’s Encrypt CA before the expiration date, schedule a crontab job to run once a day at 2:00 AM, by issuing the following command. The output of the executed cron job will be directed to a log file, stored in /var/log/letsencrypt.log

```bash
crontab –e
```

Cron job to renew the certificate.

```bash
0 2 * * * certbot renew >> /var/log/letsencrypt.log
```
