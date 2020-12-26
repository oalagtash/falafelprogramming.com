---
title: Container Internet Access Or DNS Resolving Problem
date: "2020-12-26T22:12:03.284Z"
description: "In this post I'll help make a quick troubleshooting, 
to see if you are having a DNS resolving problem or something else and provide a fix for it on CentOS 8. 
This guide could also be used for Linux, macOS or Windows. 
You just need to know what are the commands alternatives."
---

![Docker on CentOS/RHEL](./centos-docker.png)

## Why docker container is unable to access internet or resolve DNS
As the new release of CentOS 8 and RHEL 8 came out, docker package has been removed from the default package repository. 
On top of that, docker network interfaces are per default blocked by [firewalld](https://firewalld.org/).

This results to containers not having an internet access. For example, containers are unable to update or download packages or ping google.com. Containers will also not be able to reach each other, even under the same network...

So if the host does have an internet access, and the container doesn't, then it is most probably related to the firewall of the host.

In this post we will make a quick troubleshoot, to see if it is a firewall problem and provide a fix for it. I am using CentOS 8 here. For other OS, you just need to know what are the commands alternatives.

## Verify the problem
If you are having a DNS resolving problem then pinging [google.com](google.com) domain name using the following docker run command would output:

```bash
> docker run –rm busybox ping google.com

ping: bad address ‘google.com’
```

But pinging google IP address (8.8.8.8):

```bash
> docker run –rm busybox ping 8.8.8.8

PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=38.9 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=46.2 ms
^C
— 8.8.8.8 ping statistics —
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 38.919/42.566/46.214/3.653 ms
```

If you had similar results, in other words, you were able to access the IP address but not the domain name, then it is a DNS resolving problem your docker container is facing!

If you did not receive any response, then firewalld is blocking the container access. The following fix should fix that as well.

## How to fix it?

1. Make sure `ip forwarding` is enabled: 

```bash
> sysctl net.ipv4.ip_forward

net.ipv4.ip_forward = 1
```


2. Make sure `docker0 forwarding` (docker0 is the default interface name for docker bridge driver) is enabled:

```bash
> sysctl net.ipv4.conf.docker0.forwarding

net.ipv4.conf.docker0.forwarding= 1
```

3. Check if `resolve.conf` **in the host** matches the one **in the container**:

```bash
> cat /etc/resolve.conf

search example-net
nameserver 10.0.xxx.xx
```

If the file output from the host and within the container does not match then you should try to solve why docker engine not generating this resolve.conf file for containers. Sorry, no idea how is that :'D

4. If you had the same outputs, then it is a firewall problem! 

The firewall is blocking `docker0` network interface. You can enable it by:
```bash
> sudo firewall-cmd –permanent –zone=trusted –add-interface=docker0 && sudo firewall-cmd –reload
```
## Last words
**If you are planning on using swarm or a docker created network, you might face the same problem again because they will use another network interface than `docker0`.**

<br/>
<br/>


#### Hope that helped!

**P.S. There is great news! Starting from 2020-12-08 Docker released a new version: [20.10](https://docs.docker.com/engine/release-notes/#20100).
This solves all of this hassle.\
Starting from this release we do not have to care about docker interfaces and firewalld problems anymore. Docker will add docker interfaces to firewalld docker zone automatically when creating a new network!**

[More details check this post!]()
 