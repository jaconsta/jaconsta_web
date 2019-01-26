---
title: "Fibonacci Web clock"
date: 2019-01-25T10:48:38-05:00
draft: false
---

![Fibbo_clock](/images/fibbo_clock.jpg)

Have you ever wanted to visualize time as a Fibonacci series would look like?


Here is a live example:

<style type="text/css">
	.fiboclock_frame {
		width: 100%;
		height: 300px;
	}
</style>
<iframe class="fiboclock_frame" src="/fiboclock/"></iframe> 

Remember the fibonacci equation is the following `f(n) = f(n-1) + f(n-2)`.
So it's sequence start like this.

```
fib(4) = [1 , 1, 2, 3, 5] 
```

Then if we where to represent this first numbers on a equivalent square. 

Assume each square's side has the f(n) length. We could stack them together and form the 
beautiful spiral you start to see there... And it can go beyond to the infinite.

```
(2)(2) (1) (5)(5)(5)(5)(5)
(2)(2) (1) (5)(5)(5)(5)(5)
(3)(3)(3)  (5)(5)(5)(5)(5)
(3)(3)(3)  (5)(5)(5)(5)(5)
(3)(3)(3)  (5)(5)(5)(5)(5)
```
Do you like it?

What do the colors mean?

 - Yellow: Neither block is marked. Ex: 00:00 hrs
 - Red: These blocks sum the minutes times 5.
 - Blue: Are equivalent for the current hour
 - Brown: When Red a Blue supperpose on the same square, the result color is this one.

Watch it on full screen [here](/fiboclock/)

If you refresh the page, you might notice that some squares change their color, though the total time of the clock
is still correct! That's another beauty trick of this clock.

