---
title: "The way to create a RAG application."
date: 2025-09-28T12:09:51-05:00
draft: false 
---
 
Recently I launched promplty [promplty.jaconsta.com](https://promply.jaconsta.com) to 
help you create a better prompt that you can input into your favorite LLM. 
It uses a RAG system from a collection of curated prompts and the power of LLMs 
to give the user a better prompt.
 
A RAG (Retrieval-Augmented Generation) helps its creators improve the response 
from LLMs by providing it with relevant context regarding the area the software 
and the input is designed for.
 
Building a RAG system, for starters, may not be as hard as it seems. It 
involves two important processes with a few key steps under each:
 
- **Data Preparation**
    1. Data Collection
    2. Embeddings
    3. Indexing
- **RAG System Implementation**
    1. Retrieval
    2. Augmentation
    3. Response Generation
    4. Feedback Loop
 
To learn more about this terms feel free to reach out to your favorite and 
trusted LLM provider. 
 
## Creating the embeddings
 
The biggest learning of the process is the preparation of the data for the 
embeddings. Which reflect the meaning of the text in a vector space (or format) 
that is used to contrast the user input against the collection of prompts in 
the database.
 
How to understand what an embedding is. If we go to traditional text search, 
when someone searches for "food", one might get a result with similar writing 
like "foods", "foodstuff", "boot", foot, etc. But if we use embeddings, the 
search for "food" might return results like "restaurant", "cuisine", "meal", 
"dining", etc. because the relationship is stablished in term of semantics 
rather than lexical similarity. In this case the semantical relationship is 
established by the context in which the words are used.
 
One note about the semantics, they are prepared by your LLM provider, so you
have to keep in mind the model they use to prepare the embeddings. For example,
Open AI semantic model is called `text-embedding-3-small` while Gemini uses a 
model called `gemini-embedding-001`, both are optimized for search and clustering
tasks.
 
Calling them is super easy. Can be done in a few lines of code or even code
agnostic using their REST endpoints.
 
For Open AI:
 
```javascript
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "Your text string goes here",
  encoding_format: "float",
});
```
 
For Gemini:
 
```javascript
const embedding = await gemini.embeddings.create({
  model: "gemini-embedding-001",
  input: "Your text string goes here",
  encoding_format: "float",
});
```
 
The output in both cases is a vector of floating point numbers; and also the 
input is not only a single words but rather phrases.
 
Are there more providers? Yes! Hugging Face, Anthropic and others may have their
own embeddings models. Do you need to use the same LLM provider to generate your
embeddings and to query the prompts against your LLM? So far I understand that 
it is not necessary, your code and developers may benefit from the simplicity to
have a single point of contact; also the semantics may be different from one 
provider to another, so it may be worth to experiement among them.
 
The vector size is optimized for each provider, Open AI has a vector size of 
1536 while Gemini has a vector size of 1024.
 
Once you have the embeddings, you can store them in a vector database like 
Pinecone, Weaviate, or even in a traditional database like Mongo or PostgreSQL 
with the pgvector extension.
 
I chose PostgreSQL with pgvector and the vector extensions provided by Timescale.
Why? Because of familiarity and local development (It was running on a docker 
container).
 
## Create the RAG
 
After storing the embeddings what is missing is to create a system (a RAG system) 
that can retrieve the relevant information based on the user input, embed the 
results into a prompt and query the LLM for a response.
 
Creating the prompt is, as with all prompt engineering, important,  clear and 
conciseness help you get better results. The LLM libraries help you by providing
a structure to the body in the form of roles, like `system`, `user` and `assistant`. 
 
A skeleton of the prompt body could be:
 
```python
messages = [
            {"role": "system", "content": system_message},
            {
                "role": "user",
                "content": f"{delimiter}{user_input}{delimiter}",
            },
            {
                "role": "assistant",
                "content": f"Relevant prompt templates information: {related_docs[0][0]} \n {related_docs[1][0]} \n {related_docs[2][0]}",
            },
        ]
```
 
But before creating the prompt, you need to retrieve those `relevant_docs` from 
the database. How do you do that? You take the user input, and create an embedding 
vector from it, then you make a similarity search against the database to 
retrieve the most relevant documents.
 
Some of the similiarity functions are:
 
- Cosine Similarity
- Euclidean Distance
- Dot Product
 
I fully don't understand them yet, so I leave you to vibe research them with your
LLM and find the edge of what is known in quantum vibes.
 
That's the RAG.
 
Now make it pretty. Wrap it in a REST Server, add a fancy web UI, or a mobile app, 
take the queries from your users and give them a better answer than if they had 
simply written the prompt themselves.
 
## Afterward
 
Now you must also keep the RAG alive, regularly update the database with new 
documents, improve the prompt, and monitor the performance of the system.

Creating a good RAG can help you make use of faster, simpler, smaller models
since you are giving the LLM more context and it needs less processing capabilities.
 
## Final notes
 
Another possible use of RAGs, you can use them to decide what process to run 
internally by analyzing the user queries and determining the most relevant 
actions to take. By running a classifier or querying a Structured output.
 
Sometimes a RAG may not be necessary, if a traditional system can do the job, 
it may be a better and cheaper alternative. You can also reach a point where you 
have enough data from your vector tables and the metadata that you don't need to
"enhance" it with the output an LLM.
