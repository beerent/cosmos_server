<html>
	<head>
		<title>Database Manager Homepage</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="./setInnerHTML.js"></script>
	</head>
	</body>
	<?php include 'top.html'; ?>
		<center>
			<p style="white-space:pre" id="blog_post_post"></p><br>
			<textarea rows="4" cols="50" id="add_blog_text">enter blog post here...</textarea>
			<br><br>
			name <input type="text" id="add_blog_name">
			<br><br>
			<button onclick="AddBlogPost();">add blog post</button>
		</center>
	</body>
</html>
