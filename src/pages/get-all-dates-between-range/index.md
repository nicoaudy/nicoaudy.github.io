---
title: Get All Dates Between Range
date: '2019-04-02'
spoiler: Sometimes we need to get all the individual calendar dates between two calendar date range in our code, but how ?
---

---

You can utilize PHP carbon library which is already being shipped with Laravel

In the following example I have two dates variable, `$starDate` and `$endDate`, which are beginning of a month and End of a month respectively. First I converted both string dates to Carbon Objects to utilize carbon library methods in my code.

I am using a while loop to scroll through the dates by adding 1 day to startDate in the end of the loop, and while loop will continue to execute until it become equal to endDate, this condition is evaluated by the `$startDate->lte` carbon object method , lte means less than or equal, 

```php
use Carbon;

$startDate = new Carbon('2019-01-01');
$endDate = new Carbon('2019-01-31');

$dates = [];
while ($startDate->lte($endDate)){
  $dates[] = $startDate->toDateString();
  $startDate->addDay();
}
dd($dates);
```

That's it, achieve with less than 10 line.

![](https://media.giphy.com/media/ylyUQlf4VUVF9odXKU/giphy.gif)
