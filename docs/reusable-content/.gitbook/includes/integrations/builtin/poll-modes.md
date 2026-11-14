---
title: poll-modes
---
### Every Hour mode <a href="#every-hour-mode" id="every-hour-mode"></a>

Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.

### Every Day mode <a href="#every-day-mode" id="every-day-mode"></a>

* Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
* Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.

### Every Week mode <a href="#every-week-mode" id="every-week-mode"></a>

* Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
* Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.
* Select the **Weekday** to trigger the poll.

### Every Month mode <a href="#every-month-mode" id="every-month-mode"></a>

* Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
* Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.
* Enter the **Day of the Month** to trigger the poll, from `0` to `31`.

### Every X mode <a href="#every-x-mode" id="every-x-mode"></a>

* Enter the **Value** of measurement for how often to trigger the poll in either minutes or hours.
* Select the **Unit** for the value. Supported units are **Minutes** and **Hours**.

### Custom mode <a href="#custom-mode" id="custom-mode"></a>

Enter a custom **Cron Expression** to trigger the poll. Use these values and ranges:

* Seconds: `0` - `59`
* Minutes: `0` - `59`
* Hours: `0` - `23`
* Day of Month: `1` - `31`
* Months: `0` - `11` (Jan - Dec)
* Day of Week: `0` - `6` (Sun - Sat)

To generate a Cron expression, you can use [crontab guru](https://crontab.guru). Paste the Cron expression that you generated using crontab guru in the **Cron Expression** field in n8n.

#### Examples <a href="#examples" id="examples"></a>

If you want to trigger your workflow every day at 04:08:30, enter the following in the **Cron Expression** field.
```
30 8 4 * * *
```

If you want to trigger your workflow every day at 04:08, enter the following in the **Cron Expression** field.
```
8 4 * * *
```

#### Why there are six asterisks in the Cron expression <a href="#why-there-are-six-asterisks-in-the-cron-expression" id="why-there-are-six-asterisks-in-the-cron-expression"></a>

The sixth asterisk in the Cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

|  *  |  *  |  *  |  *  |  *  |  *  |
|:--:|:--:|:--:|:--:|:--:|:--:|
|second|minute|hour|day of month|month|day of week|
