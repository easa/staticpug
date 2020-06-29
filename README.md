# staticpug
[![build workflow](https://github.com/easa/staticpug/workflows/publish/badge.svg)](https://github.com/easa/staticpug/actions?query=branch%3Amaster+workflow%3A%22publish%22)  
The clean static HTML generator from HAML files using pug rendering the templates  
- Render `pug` templates to `html`
- Read `markdown` files and insert them into the template
- Simple and easy structure to deal with
- Errors complitly explained

## Table of content

- [commands](#Commands)
  - [`npx sp-init`](#sp-init)
  - [`npx sp-execute`](#sp-execute)
  - [`npx sp-create`](#sp-create)
- [How it works](#How-it-works)

## Commands

### `npx sp-init`
Asks and configure the website

### `npx sp-execute`
Builds the website by copying all files from public folder to destination 
and make HTML files from pug templates provided inside the source folder  
Read options from one of `staticpug.config.json`, `staticpug.json`, `staticpug.config` file 
or at `staticpug` secton on `package.json` file
| option | type | default | explain |  
| :---  | :---: | :---: | :--- |  
| staticFilesDirectory | `array` / `string`| "static" | the folder/folders to copy to destination/destinations , it can have subfolders |  
| destinationDirectory | `array` / `string`| "dist" | the destination/destinations folders that contain the result files |  
| sourceDirectory | `array` / `string`| "src" | the folder/folders that contain/contains template files , it can have subfolders |

### `npx sp-create`
Creates a simple sample project to help you make your own website by just modifying it
- `src/page` (why `src/page`? because the template may contain layout and other components so the base pages goes to folder `src/page`)
- `public`

## How it works
All files in source folder (default: `src`) will be converted to HTML,
  and subfolders will be affected too.  
To pass data to pug files use a json file named as the pug file.  
When a folder name after a pug file exists,
 the markdown files inside that folder will pass to the pug file as content.
Other informations can pass to file via json file named as each markdown file.  
When no folder find for pug file, it will be a HTML page.  

## Contribute
Please contribute, it's hard to continue alone >_<