# ROMOTE DESKTOP/PC CONTROL USING NODE.JS
### THE STORY
a few months ago, I was wondering in the land of NPM where I suddenly stumbled upon a package called robot.js, when I first saw the name I thought it was a package for doing robotics stuff, you know, with Arduino or raspberry pi, but after I clicked on it and read through the readme I figured out that it was meant to control an operating system like windows or Linux where you can issue commands like a mouse click on a certain position or typing some letters, and at that point i was thinking, hmm... it would be interesting if I can use this package to control a computer and use socket.io to issue real-time commands that will be coming from a browser, and that's what I did ! and after playing around a bit with the package fixing and optimizing the project I think that I got this running well.

### HOW TO USE
Download or clone this repo in the client machine and in the server machine, or you can use one machine
acting as the server and a virtual machine inside of it acting as the client <br><br>
`git clone https://github.com/LazyFatArrow/node-remote-control.git`

To run the server: <br>
`npm run start:server`

To run the client: <br>
`npm run start:client`

Then navigate to localhost:5000 in you browser and you should see the broadcasting.