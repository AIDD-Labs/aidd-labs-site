# AIDD Labs Site
This github repo is 

[https://disasterdata.engin.umich.edu](https://disasterdata.engin.umich.edu)


## Before you begin
* a terminal somewhere (mac comes with one, or download [iTerm2](https://iterm2.com/) <- I use this)
* a text editor ([VSCode](https://code.visualstudio.com/), SublimeText, Atom — up to you)
* Node installed (https://nodejs.org/en/download/)
* Volta is installed, follow the instructions here to install Volta: https://volta.sh/. Use 

## Get Started

1. Open terminal and clone this repo:
```
git clone git@github.com:AIDD-Labs/aidd-labs-site.git
```

2. Go into that folder via terminal:
```
cd lab-site
```

3. Install the node packages listed out in `package.json`:
```
npm install
```

4. Run the server
```
npm run dev
```

5. http://localhost:3000/

###
To pull in the most recent updates, from inside the `sabine-vue-vite-ssg` folder:
```
git pull --rebase
```

If you have uncommitted changes, stash them or save them.
```
git stash
```
