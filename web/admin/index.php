<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/blog/BlogManager.php"; include_once($include);
  $blogManager = new BlogManager();
?>

<index>
	<head>
		<title>Cosmos HQ</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="base.js"></script>
		<script src="/blog/blog.js"></script>
	</head>

	<body>
		<center>
			<h1>Limbix Blog</h1>
			<hr>
		</center>
		<?php
			$blogPosts = $blogManager->GetEnabledBlogs();
			foreach ($blogPosts as $blogPost) {
				$blog = $blogPost->GetBlog();
				$id = $blogPost->GetId();
				$date = $blogPost->GetDate();
				$author = $blogPost->GetAuthor();

				$paragraph = "<p style='white-space: pre-wrap;'>";
				$paragraph .= "<p align='right'><b>" . $date . "</b> <a onclick='DisableBlog(\"$id\")' style='text-decoration:none; color:red' href=''>-</a></p>";
				$paragraph .= $blog;
				$paragraph .= "<p align='right'><b>" . $author . "</b></p>";
				$paragraph .= "<hr></p>";

				echo $paragraph;				
			}

		?>
			
	</body>
<index>
