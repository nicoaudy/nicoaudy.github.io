---
title: Make a copy of row - Laravel
date: '2019-07-01'
spoiler: Lets see the example how to make a copy of row
---

---

I would like to write about one of the little-known features of laravel eloquent called `replicate` to copy everything from existing row. Lets see the example, Here Post is my modal, posts is my DB table with sample data and I am selecting single row on top of that I am calling `replicate()` to copy the row, then I am calling save method to `save(insert)` data in the DB table.

`replicate()` – Clone the model into a new, non-existing instance.\
`save()` – Save the model to the database.\
`push()` – Save the model and all of its relationships.

```php
  Posts::find($id)->replicate()->save();
```

Clone model and modify existing data
While coping existing records(posts), if you what to modify existing data, store the replicated data in a variable then make the changes as shown below

```php
// fetch a existing post
$post = Post::find($postId);
    
//Clone a attribute of existing row into a new copy
$duplicatePost = $post->replicate();
    
//Change a name of the copy post by appending id of the existing post to make the name of duplicate post unique
$duplicatePost  = $post->name . " " . $post->id;
    
//Now create a duplicate post
$duplicatePost->save();

//fetch a existing post
$post= Post::find($postId);
    
//Clone a attribute of existing row into a new copy
$duplicatePost = $post->replicate();
    
//Change a name of the copy post by appending id of the existing post to make the name of duplicate post unique
$duplicatePost  = $post->name . " " . $post->id;
    
//Now create a duplicate post
$duplicatePost->save();
```

This method works with loops and relationships too, so you can use this method to duplicate all of our entries.

Clone model and it’s relationship
Here each post belongs to tags and categories, lets copy everything and save it to database.

```php
$clone = $post->replicate();
$clone->push(); //Push before to get id of $clone

foreach($post->tags as $tag)
{
    $clone->tags()->attach($tag);
}

foreach($post->categories as $category)
{
    $clone->categories()->attach($category);
}
$clone = $post->replicate();
$clone->push(); //Push before to get id of $clone
 
foreach($post->tags as $tag)
{
    $clone->tags()->attach($tag);
}
 
foreach($post->categories as $category)
{
    $clone->categories()->attach($category);
}
```
NOTE- you may set the timestamps to the second argument of attach().