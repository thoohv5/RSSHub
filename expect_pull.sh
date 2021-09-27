#!/usr/bin/expect -f

spawn ./update.sh
expect "Are you sure? *" {send "y\n"}
interact
