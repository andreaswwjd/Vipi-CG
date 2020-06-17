# Vipi CG

Vipi CG is a Vue.js based project for handling and live HTML-graphics.

## Installation

Clone the projekt on to your computer:

```bash
git clone https://github.com/andreaswwjd/CasparCG-HTML-templates.git
```

## Usage

To make a runnable server, just run ```yarn pkg``` and an executable will be produced in the ```dist```-folder. 

```bash
yarn pkg # Create executables in dist folder.
yarn serve # Serve in a development environment.
yarn build # Build the server in dist folder.
yarn caspar # Export templates inside caspar folder.
```

### Make your own templates

To make your own templates, you can either create your own template, or alternate the existing templates inside ```src > templates```. All templates have to be registered inside the ```src > templates.js``` file to appear in the interface. 

### Caspar CG integration

To be able to export your templates into a Caspar CG readable format, run the following command:

```bash
yarn caspar
```
The templates will appear inside a ```caspar```-folder.


## License
[MIT](https://choosealicense.com/licenses/mit/)