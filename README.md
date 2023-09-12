# AIDD Labs Site
This github repo is for the website for AIDD Labs at The University of Michigan, led by Dr. Sabine Loos. The website can be found at: 
[https://disasterdata.engin.umich.edu](https://disasterdata.engin.umich.edu).



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
## Making changes and requesting review
1. Checkout branch
2. Git add .
3. Git push
4. Open pull request
5. Tag reviewers
6. Switch to main branch
7. Git pull