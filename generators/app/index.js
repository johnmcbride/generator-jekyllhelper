'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var dateFormat = require('dateformat');

module.exports = yeoman.Base.extend({
 initializing: function()
  {
    this.log(yosay('Welcome to the jekyll helper for blog posts.'));
  },
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'postTitle',
      message : 'Enter the title of your post',
      default : 'Default Title' 
    },
    {
      type    : 'input',
      name    : 'postDesc',
      message : 'Enter the description of the blog post',
      default : 'Default Desc'
    },
    {
      type    : 'input',
      name    : 'postTags',
      message : 'Enter the tags for your post',
      default : ''
    }]).then(function (answers) {
      this.postTitle = answers.postTitle;
      this.postDesc = answers.postDesc;
      this.postTags = answers.postTags;
    }.bind(this));
  },
  writing: function () {
    //get the date
    var currentDate = new Date();
    var fileName = dateFormat(currentDate,"yyyy-dd-mm-hh-MM-ss");
    fileName = fileName + '.md';
    console.log(fileName);
     this.fs.copyTpl(
      this.templatePath('_post.md'),
      this.destinationPath('_posts/' + fileName),
      {
        postTitle:this.postTitle,
        postDesc:this.postDesc,
        postTags:this.postTags
      });
  }
});
