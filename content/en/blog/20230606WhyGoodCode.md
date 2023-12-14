---
title: "Does good code even matter?"
date: 2023-06-06T19:09:51-05:00
draft: false
---

# Does good code even matters?

Many years ago, during a code review for an API endpoint I found a colleage called a controller function from another
controller.

Imagine it was something like

```
#router.get("/products/:id")
def getProduct(id):
    return ProductSchema.dumps(ProductModel.find_one(id))

#router.post("/products")
def create_product():
    new_product = ProductModel.create(ProductSchema.load(request.body))
    return getProduct(new_product.id)
```

I remember getting on the nerves, for the simple output my colleage took; but also without much to argue agains because
part of the fault was also mine, who coded `getProducts` was me, the initial design and coupling was made by me,
and my colleage just kept on working assuming the pattern was correct.

> I want to believe I didn't code it like that; and that the code sample is just a vage memory.
> But one part of me thinks that, if I were to add the validation statemes; it could be a vivid memory of how it used to look.

I knew it was wrong but I wasn't able to correctly adjust it or to architecture it differently. Until recently when I
found myself doing the same very error in a test project.

[](Image of the code goes here)

Again the aim was to take the fastest path into solving the problem and to demonstrate that it could be solved. The real problem,
it was like the 15th endpoint which followed the same tight-coupled pattern. And finding time to refactor a test project
just to introdue a pattern I wasn't sure which architecture would follow was a hard decision for me.

I believe that, for many scenarios, software is an artifact that is always prone to be dumped in order to build something
new from the ashes of the old... Until it isn't; products need to keep evolving and bad code is left to rot wit new modules on top;
and more than once I have found myself dealing with other peoples code who took a similar approache like me. Some more spaguetties thant others;
the same way others have approached my code and found some coupled mess around.

What I learned so far is that, I grew with MVC and in this concept the Model (Database) is tightly couples with the
View (schema / template) which is also tighly coupled to the Controller (Handler). Applying the SOL part of the SOLID
principles is quite simple: Follow the MCV rules, along with DRY; let the web framework handle the ID part for you;
and you are basically set to go. But that is what I believe was the source of my error.

Some time ago I posted:

```
If you find yourself duplicating certain function code, just to match a few variable types; use generics.
If you find yourself doing if-else statements on variable types to run a function; use traits or interfaces.
```

That is part of a learning path that I embraced myself into. It is a slow one but it basically means, owning the ID
part of SOLID and treat the framworks or libraries just as details, not what the business side of the product actually does.

And I don't want to promote SOLID as an absolute truth; far from that, but rather to evaluate when it is convenient to adopt
the basis from it into the daily coding practices of what makes good software, also as a meassurement for tools that
only want to vendor-lock us, or self-made implementations that may become a burden.

Because details can change, and when they do, can be a huge overhead, specially when you face deadlines.

> GRPC is a detail
> REST is a detail
> Your database is a detail
> This platform I am posting on is a detail
> What if your UI library / framework is also a detail?

I also want to find the way to bring these patterns into many areas of software development.

Make it work -> Make it good -> Make it fast.
