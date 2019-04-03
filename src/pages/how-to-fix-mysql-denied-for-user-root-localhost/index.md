---
title: How To Fix MySQL Denied For User Root Localhost
date: '2019-04-03'
spoiler: Pengalaman pribadi saya setelah install MySQL untuk pertama kali terdapat error mysql denied, so here how to fix
---

---
Start the MySQL server instance or daemon with the `--skip-grant-tables` option (security setting).

```bash
$ mysqld --skip-grant-tables
```

Execute these statements.
```bash
$ mysql -u root mysql
$ mysql> UPDATE user SET Password=PASSWORD('my_password') where USER='root';
$ mysql> FLUSH PRIVILEGES;
```

If you face the unknown field Password error above use:

```
update user set authentication_string=password('my_password') where user='root';
```

Finally, restart the instance/daemon without the `--skip-grant-tables` option.

```bash
$ /etc/init.d/mysql restart
```

You should now be able to connect with your new password.

```bash
$ mysql -u root -p
```

Enter password: `my_password`

![](https://media.giphy.com/media/My6uWnBRiQrVC/giphy.gif)
