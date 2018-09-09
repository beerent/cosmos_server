function AddBlogPost() {
  var blogPost = GetValue("add_blog_text");
  var blogAuthor = GetValue("add_blog_name");

  if (blogPost == "" || blogPost == "enter blog post here..." || blogAuthor == "") {
    alert ("invalid blog post. blog and name are required.");
    return;
  }

  blogPost = ReplaceAll(blogPost, "\n", "{n}");

  execute("/blog/BlogHelper.php?option=add&blog=" + blogPost + "&name=" + blogAuthor, 'fakediv');

  GetObject('blog_post_post').innerHTML = "<h3><font color='red'>Blog Post Added :)</font></h3>";
  setTimeout(function(){ GetObject('blog_post_post').innerHTML = ""; }, 3000);
  GetObject('add_blog_text').value = "enter blog post here...";
  GetObject('add_blog_name').value = "";

}