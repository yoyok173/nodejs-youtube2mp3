# nodejs-youtube2mp3

**Simple Youtube to MP3 online converter with Youtube-dl, Node.js, AngularJS &amp; Bootstrap 4.**

# Prerequisites

### Linux
```bash
# Download & install Python 2.7 for linux
https://www.python.org/downloads

# Install Pip (Python package management system - Python Package Index)
> sudo apt install python-pip

# Install Youtube-dl 
> pip install --upgrade git+https://github.com/rg3/youtube-dl
```

### Windows
No installations/dependencies required. 
The youtube-dl executable, ffmpeg, etc. are already placed in the repository inside /lib/youtube-dl/windows folder.  


# Usage
```bash
# Clone this repository
> git clone https://github.com/johnmakridis/nodejs-youtube2mp3

# Change directory to repository folder
> cd nodejs-youtube2mp3

# Install server dependencies
> npm install

# Install app dependencies
> cd public
> yarn install

# Run the app
# Go back to root folder and run 
> node app.js

# Open the app by browsing to
http://localhost:7777
```

### Licence
<a href="https://github.com/johnmakridis/nodejs-youtube2mp3/blob/master/LICENSE" target="_blank">MIT License</a>

