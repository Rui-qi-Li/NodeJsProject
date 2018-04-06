# Authentication system (Version control Teamwork Flow) 

*This is a project for CS353C Software Design module, which will keep updating during the whold semester 

*README.md Author : Ruiqi Li

This is a simple site authentication that made from scratch in Node.js, Express and Firebase. 

!! Please follow the steps bellow, it's very important to maintain a single version project during the development

!! Always remember PULL first before you push back to github

!! DO NOT work on master branch and always MERGE into master when you are ready to push back to github

!! DO NOT create or drag file on github interface

!! Once you forget switch to dev branch and modify your files, use "$git stash save" to SAVE the change in current branch and "$git stash pop" to open it in your dev branch, so you can keep working on it, amazing!

1.When you first clone this remote repository into local repo, you need the command line below to clone it to local directory. The git will create a foler called "Authentication_VersionContro" with .git directory inside. SSH connection is recommended for using Git

$ git clone git@github.com:CosmetClassProject/Authentication_VersionControl.git

2.Use cmd/git bash below to check the remote repo, it called "origin" with its url adress

$ git remote -v

3.Check current branch, now only has one branch called "master"

$git branch

4.Pull all the updates to your master branch, if you just finished the previous steps few minutes before, it may show "up-to-date"

$git pull origin master

5.Create your develop branch, you will ALWAYS work on this branch. DO NOT develop on master branch 

$git branch dev

6.Check the current branch and you find you need one more step to switch to the develop branch

$git branch

$git checkout dev

7.Now, you can work whenever you like and use "git status" always to check all changes happened on your local repository. Remeber to add and commit when you achieve something or just want to snapshot the process

$git status // list all the changes

$git add .  // add to stage area

$git commit -m "give some brief but important message here to help git track changes later" // commit and save

8.Whenever other team members has published updates or you want to publish to github, the FIRST rule is to PULL UPDATES to your master branch, REMEMBER: your master branch is the MOST STABLE version of your project

$git checkout master 

$git pull origin master 

9.Since some updates has pull into your master, you need to keep your develop process is up-to-date, especially for some bug fix. "rebase" try to merge the master into develop and restart a develop branch, sometimes it cannot work because those updates "exactly overlap" with your work (e.g. it fix the same line of code as your did) , at this situation, you need to discuss it with the author, and keep only one vertion of modification. 

$git chekout dev

$git rebase master 

<when merge conflict happen, you need to first modify your file and then add it again to mark the conflict has been sorted>
$git add <filename>

$git commit -m "you has chose which modification you want to keep"

10.If you want to keep work after rebase, repeat step 7.

11.If you has test your work and want to publish it to remote repository and let everybody see it, merge your work into master (push using develop branch will create a "develop" branch on remote repository) and push it to github. 

$git checkout master

$git merge dev

$git push origin master
