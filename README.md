# entity-app

Manage data entities - WARNING this is very much a work in progress

## Architecture

A system for creating, editing, displaying and generally managing "Entities"

An Entity is essentially a model description

The entities in this system have to be generated twice, once as JSON Schema and
once as TypeScript types

You can avoid a considerable amount of duplication by using:

https://www.npmjs.com/package/json-schema-to-ts

It has the added advantage of deriving the types directly from JSON Schema, so
an additional build step is not required

Once you have your entities, the sytem is able to automatically derive:

A CRUD REST API backed by:

A strongly typed data store, backed by eg mongodb, memory, file system, level
etc

A network data store with the same interface as the persistence store, so that 
a web client can access the CRUD REST API using the same interface as the 
server side storage, allowing code for eg resolving references to run on both
the server and client

It automatically generates an admin application, for editing entities on the
client browser

It has a view/templating engine that integrates with the entity system to 
populate templates

## License

MIT License

Copyright (c) 2021 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
