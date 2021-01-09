---
title: How to Install or Upgrade Docker on CentOS
date: "2021-01-09T08:00:00.284Z"
description: "Whether you want to install Docker on CentOS or you want to upgrade Docker engine to the latest version, this article will guide you through."
featuredImage: ./install-upgrade-docker-centos.webp
---

Whether you want to install Docker on CentOS or you want to upgrade Docker engine to the latest version, this article
will guide you through. Should be pretty simple. At the time of this article, I am installing docker engine version 20
on CentOS 8.

Some linux operating systems are pretty straight-forward when installing or upgrading docker. For CentOS, you have to
remove some pre-installed packages to allow installing docker dependencies.

## Cleanup
### Remove installed packages
Run the following commands to make sure you have a clean fresh environment for a new docker installation: 
```bash
sudo yum remove docker docker-client \
                docker-client-latest \
                docker-common docker-latest \
                docker-latest-logrotate \
                docker-logrotate docker-engine \
    && dnf remove docker-ce
```
*If packages not found, it is fine. We just want to make sure those are uninstalled, if existed*

## Installation
### Install the latest Docker version
Now the following commands will install the latest docker version on your machine. So go ahead and do what we are all
good at; copy and past ;) 
```bash
sudo yum install -y yum-utils  
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io --allowerasing
```
[You can check docker official docs for more details.](https://docs.docker.com/engine/install/centos/)

#### Did you also face a problem with a broken repo?
1. If you faced a problem with the repo, or got an error with something like:

```bash
> sudo yum install docker-ce docker-ce-cli containerd.io
created by dnf config-manager from file:///root/                                                                                                                                    0.0  B/s |   0  B     00:00
Errors during downloading metadata for repository 'root_':
  - Curl error (37): Couldn't read a file:// file for file:///root/repodata/repomd.xml [Couldn't open file /root/repodata/repomd.xml]
Error: Failed to download metadata for repo 'root_': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

2. Then it is most probably a repo got corrupted because of what so ever. You can just fix it with:
```bash
sudo dnf clean all && rm -r /var/cache/dnf
```
3. And remove this broken repo, in my case ``root_`` was the corrupted repo. Delete it by running:\
**don't forget to change root_.repo to your broken repo name** 
```bash
rm /etc/yum.repos.d/root_.repo
```

## Final steps
1. After running everything successfully (yay), execute:
```bash 
sudo systemctl start docker
```

2. To enable auto-start docker daemon after each reboot: (please do it)
```bash
sudo systemctl enable docker
```
