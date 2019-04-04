---
title: Laravel Tricks
date: '2019-04-04'
spoiler: Now im focused on how to improve my laravel code and project structure. So why not share the knowledge ?
---

---

## 1. Refactor your collections, son

Imagine that you're developing a website where students participate in projects and are graded every week, and your job is to display to their mentors the current average score of all students in a given project, effectively grading the project's average student score, in order to track progression.

You may come up with a Project class like this:

```php
<?php

class Project extends Model{
    /** ... code comitted for brevity **/

    public function studentsAverageScore() {
        $participants = $this->participants;

        $sum = 0;
        $totalStudents = 0;
        foreach($participants as $participant) {
            if ($participant->isStudent()) {
                $totalStudents++;
                $sum += $participant->student->lastRating()->averageScore();
            }
        }

        return $sum / $totalStudents;
    }

}
```

So how can we express these checks and calculations better? More semantically? Fortunately, we can use a bit of functional programming with the methods that Eloquent gives us.

Instead of checking manually if a given participant is a student, using the filter method can return only the students for us:

```php
<?php

public function studentsAverageScore() {
    $participants = $this->participants;

    $participants->filter(function ($participant) {
        return $participant->isStudent();
    });
}
```

Naturally, we also need to finish this by calculating their average score. Should we do a `foreach` now? It would still be suboptimal. There's a built-in solution in another function, conveniently called `average`, in our returned Eloquent collection. It follows rules similar to `filter`, where we just return which value we want to average from the whole colllection. The final code looks like this:

```php
<?php

public function studentsAverageScore() {
    $participants = $this->participants;

    return $participants->filter(function ($participant) {
        return $participant->isStudent();
    })->average(function ($participant) {
        return $participant->student->lastRating()->averageScore();
    });
}
```

## 2. Try this clean, one-method way to query 'where'

Let's say you want to do the following SQL query:

```sql
 SELECT * FROM `users`
    WHERE
        `name` = 'some_name'
        AND `email` = 'some_email'
    LIMIT 1
```

You can achieve this with one `'where'` method call. Eloquent will work out that the "and" in the middle means two seperate where clauses:

```php
User::whereNameAndEmail('some_name','some@email')->first();
```

And as well as "and", you can also do an "or" like this:

```php
User::whereFooOrBar('foo value','bar value')->first();
```

## 3. Me-return hasil data setelah update querying

Untuk beberapa kasus, saya ingin mereturn hasil update data. Jika sebelumnya menggunakan `method` seperti di bawah ini : 

```php
$row = User::find($id)->update(request()->all());
return $row; // true
```

Maka response dari hasil di atas akan menjadi boolean. Untuk memenuhi kebutuhan maka kita dapat menggunakan cara seperti berikut :

```php
$row = tap(User::find($id))->update(request()->all())->fresh();
return $row; // data: { ... }
```

## 4. String Plural

```php
$friends = 5;
return "I have " . $friends. " " . str_plural('friend', count($friends));
/// I have 5 friends
```

## 5. Date Filtering

```php
$q->whereDate('created_at', date('Y-m-d'));

$q->whereDay('created_at', date('d'));

$q->whereMonth('created_at', date('m'));

$q->whereYear('created_at', date('Y'));
```

## 6. Collection filters
Keeps the item only if the closure returns true

```php
$customers = Customer::all();
$javanese_customers = $customers->filter(function($customer)
{
    return $customer->province == 'Jawa Tengah';
});
```

## 7. Where Has

```php
$callback = function($query) {
    $query->where('something', '=', 'something');
}
$submissions = Post::whereHas('submissions', $callback)->with(['submissions' => $callback])->get();
```
