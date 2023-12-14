---
title: "How to use absolute imports with React"
date: 2019-07-19T12:09:51-05:00
draft: false
tags: ["react", "react-scripts", "imports"]
---

Starting from React scripts you can now use absolute imports to use your components.

## What's the problem?

Imagine you have the following simple code structure.

```
/src
 --/Components
   --/Home/Top.js
   --/A/Really/Deep/Component.js
   --App.js
```

If you wanted to import, say... `Top` into `App`, you would normally do:

_App.js_
```
import Top from './Home/Top'
```

**So what's the problem?**

Imagine you want to import `Top` into `Component`, then you would have:

```
import Top from '../../../../Home/Top'
```

Did you count the folders I went back? I didn't so it might not match.

Now imagine a more complex code or any refactor that involves moving the file.

It would be easier if you could only absolute import it like:
`import Top from Components/Top`

If you use bare _webpack_ you could manually specify it. And luckily `create-react-app`
and `react-scripts` now support this feature.

## Adding absolute imports support

There are two ways to make this work.

### Method1: Using env file

If you can create/edit a `.env` file in your projects root folder add the following:

```
NODE_PATH=src/
```

### Method2: Using jsconfig

Create `jsconfig.json` on your projects root folder. And add the following:

```
{
  "compilerOptions": {
    "target": "es6",
    "baseUrl": "src/"
  }
}
```

Your file can have many more options, you can find more in the
[documentation site](https://code.visualstudio.com/docs/languages/jsconfig)

---

If you have both methods together, the webpack compiler might rise a warning,
so be careful to only use one of them.

Now when you run `yarn start` or `npm run start` you should be able to run your
code using absolute imports.

---

> *References*
> - https://hackernoon.com/absolute-imports-with-create-react-app-4c6cfb66c35d
> - https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d
