<html>
	<head>
		<title>Database Manager Homepage</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="/base.js"></script>
		<script src="blog.js"></script>
	</head>
	</body>
	<?php $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include); ?>
		<center>
			<h1>Add Blog</h1>
			<hr>

			<p style="white-space:pre" id="blog_post_post"></p><br>
			<textarea rows="4" cols="50" placeholder="enter blog post here..." id="add_blog_text"></textarea>
			<br><br>
			name <input type="text" id="add_blog_name">
			<br><br>
			<button onclick="AddBlog();">add blog post</button>
		</center>
	</body>
</html>
