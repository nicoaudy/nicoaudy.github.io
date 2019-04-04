---
title: Using Single Action Classes in Controller
date: '2019-04-04'
spoiler: Writing logic in your controller is perfectly fine when you know you have only one endpoint.
---

---

One solution I have found is using invokable classes, using the magic method `__invoke()`. By creating a single action class, I have to write only `__constructor()` and `__invoke()` method to perform a single action.

`__invoke()` is a PHP magic function and when we will create an instance of the class or call this class `__invoke()` will be loaded automatically. By using this approach, we are also following SRP (`Single Responsibility Principle`). SRP means any class should have one reason to change. This makes our application more robust and testable and you don’t have to inject every dependency for every method and can return the response needed.

So for my MovieController, I can split them into SearchMovieController, LoadMovieImagesController, UploadMovieImagesController and so on. You can see all these names now become more descriptive and we know they only have one action to perform using `__invoke()` method.

Now my routes will become from:

```php
Route::post('searchMovie', 'MovieController@searchMovie');
Route::get('loadMoviesImages', 'MovieController@loadMovieImages');
```

to this:

```php
Route::post('searchMovie', 'SearchMovieController');
Route::get('loadMoviesImages', 'LoadMovieImagesController');
```

Now, SearchMovieController will look like this:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchMovieController extends Controller
{
    public function __invoke()
    {
        // do movie search here
    }
}
```

Above example is perfectly fine for using a single action class based controller to keep code clean and DRY, but there are some limitations of this approach.
