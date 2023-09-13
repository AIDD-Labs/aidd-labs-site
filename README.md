# AIDD Labs Site
This github repository is for the website for AIDD Labs at The University of Michigan, led by Dr. Sabine Loos. The website can be found at: 
[https://disasterdata.engin.umich.edu](https://disasterdata.engin.umich.edu).

The below instructions should help you as a lab member update your webpage(s) on the AIDD Labs website. Adding and maintaining your webpage(s) is also a great way to get comfortable with Git and Markdown.

This website was made based on the initial Vue-Vite framework created by [@marguerite-roth](https://github.com/margueriteroth) and updated with [@juliannemarik](https://github.com/juliannemarik).

## Table of contents
Specifically, this guide will help you do the following:
- [Understand the main components of the AIDD Labs website](#components-of-the-AIDD-Labs-website)
- [Set up the website locally on your computer](#setting-up-your-local-environment)
- [Create pull requests to add or update the website](#insert)
- [Add and/or update *your profile* on the "Team" page](#insert)
- [Add and/or update *new content* to the "Content" page](#insert)
- [Add and/or update a *new project* to the "Projects" page](#insert)

## Components of the AIDD Labs website
This github repo might seem intimidating, but we can boil it down in a few main components.

1. **Github**: Github is a really useful platform that helps you host and collaborate on coding projects with others. It also allows you to track versions of code. Github is where the code of the AIDD Labs website lives (outside of our computer). We can consider the code on the `main` branch on Github as the "live" version of our website. For more information on Github, visit [their docs](https://docs.github.com/en/get-started/quickstart/hello-world).
2. **Markdown**: Markdown is a lightweight way to add formatting to plain text documents. This README is written in Markdown. Most of the webpages that you will have to maintain will be written in Markdown. We wrote many of the webpages in Markdown, because it is very easy to learn and it a useful  language to become familiar with. For more information, visit [their docs](https://www.markdownguide.org/getting-started/).
3. **Vue, HTML and CSS**: HTML and CSS are languages typically used for front-end development (aka to make websites). These have a large learning curve and are not terribly useful for you to learn, but these are the languages that are being used under the hood. If you want to develop any custom webpages, you will need to learn these. Please check with Sabine before delving into this.

## Setting up your local environment
In order to update or add to the website, you first need to get the code on your laptop! Before you get started, you need to make sure you have the following set up:
* **A terminal installed**. Mac comes with one, but I typically use [iTerm2](https://iterm2.com/). We have a resource page in our [Lab Notion](https://www.notion.so/aidd-labs/Setting-up-your-terminal-for-macs-16fc5c4406fe4b328b407f9a2802fe77?pvs=4) on how to set up iTerm2 on your laptop.
* **A text editor installed**, I recommend using [VSCode](https://code.visualstudio.com/).
* **Node installed**, download and install following the instructions here: https://nodejs.org/en/download/.
* **Volta installed**, download and install following the instructions here: https://volta.sh/.  

### Cloning to your local repository
Our first step is to get the code from our "remote repository" on Github (https://github.com/AIDD-Labs/aidd-labs-site) to our "local repository" on our laptop. Follow the below steps.

1. **Open your terminal and go into the folder that you want to clone your repository in.** Open your built-in terminal or iTerm2 use `cd` to navigate to the folder where you'd like to keep the AIDD Labs code in. For now, we'll assume you have a folder called "code-directory" in your documents folder. You can also use `ls` to see everything in the folder you're currently in.

```
cd Documents/code-directory
```

2. **Clone the github repo into your local directory**. In your code folder

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

