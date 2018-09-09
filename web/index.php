<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/blog/BlogManager.php"; include_once($include);
  $blogManager = new BlogManager();
?>

<index>
	<head>
		<title>Database Manager Homepage</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="base.js"></script>
	</head>

	<body>
		<center>
			<h1>Limbix Blog</h1>
			<hr>
		</center>
		<?php
			$blogPosts = $blogManager->GetBlogs();
			foreach ($blogPosts as $blogPost) {
				$blog = $blogPost->GetBlog();
				$date = $blogPost->GetDate();
				$author = $blogPost->GetAuthor();

				$paragraph = "<p style='white-space: pre-wrap;'>";
				$paragraph .= "<p align='right'><b>" . $date . "</b></p>";
				$paragraph .= $blog;
				$paragraph .= "<p align='right'><b>" . $author . "</b></p>";
				$paragraph .= "<hr></p>";

				echo $paragraph;				
			}

		?>
			
	</body>
<index>
