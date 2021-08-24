# Kindle Highlights Parser

This program parses and organises highlights (and notes) made on a Kindle ebook reader. These highlights are normally stored in a file called `My Clippings.txt` in the `Documents` folder of the Kindle.

The program creates a new folder named `books` in its root folder, and in that folder creates a `.txt` file corresponding to the title of each book.

## Introduction
The program takes the contents of a txt file and outputs them as separate text files named for each book.

Highlights on a Kindle are stored in a txt file in the following formart:

```

Mirrors (Eduardo Galeano)
- Your Highlight at location 4481-4481 | Added on Wednesday, 6 November 2019 13:36:03

“War is God’s way of teaching us geography.”
==========
Mirrors (Eduardo Galeano)
- Your Highlight at location 4879-4879 | Added on Wednesday, 6 November 2019 17:45:36

To be natural and clean, like the water we drink, love must be free and mutual. But men demand obedience and deny pleasure.
==========
Mirrors (Eduardo Galeano)
- Your Highlight at location 4908-4910 | Added on Wednesday, 6 November 2019 23:33:03

Of the revolutionaries who began it all, not one remained. All were purged: buried, locked up, or driven out. And they were removed from official photographs and from history books. The revolution elevated to the throne the most mediocre of its leaders.
==========
A Brightness Long Ago (Guy Gavriel Kay)
- Your Highlight at location 214-214 | Added on Sunday, 10 November 2019 14:25:42

We make our own choices sometimes, sometimes they are made for us.
==========
A Brightness Long Ago (Guy Gavriel Kay)
- Your Highlight at location 217-217 | Added on Sunday, 10 November 2019 14:27:23

Opportunities given are responsibilities.
==========
A Brightness Long Ago (Guy Gavriel Kay)
- Your Highlight at location 263-265 | Added on Monday, 11 November 2019 00:34:32

I have often thought that the world the god has made—in our time, at least—is not generally kind to good men. I do not know what that says about me and my own life.
==========
A Brightness Long Ago (Guy Gavriel Kay)
- Your Highlight at location 265-266 | Added on Monday, 11 November 2019 00:34:48

We accumulate sins and guilt, just by moving through our days, making choices, doing, not doing.
==========
A Brightness Long Ago (Guy Gavriel Kay)
- Your Highlight at location 285-286 | Added on Monday, 11 November 2019 00:37:14

They had taken a great risk, but you did that to get ahead in life.

```

The highlights follow a regular pattern, split by `==========`, 10 "="s. This allows us to split them at that point.

## Usage

You should have Node installed.

- run `node index.js path_to_file` where path to file is a relative or absolute path to the clippings txt file and you will see a new folder named books containing `.txt` files of your books. This folder resides in the same location as `index.js`.

For example if you have `MyClippings.txt` at `Home/Desktop/MyClippings.txt`, run:
 ```bash

 node index.js Home/Desktop/MyClippings.txt

 ```

## Requirements
- Node.

## Issues/ Improvements

- Currently the script does not distinguish betweeen Highlights and Notes
- There is no way to sort the highlights according to any criteria, be it when they were made or their location in the book
 

## Note
Project is still in development. Kindly report any issues.


    