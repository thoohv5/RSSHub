#!/usr/bin/expect -f

spawn ./update.sh
expect "Username for 'https://github.com'" {send "thoohv5\n"}
expect "Password for 'https://thoohv5@github.com'" {send "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\n"}
expect "Are you sure?" {send "y\n"}
interact