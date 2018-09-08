<?php 
include 'top.html';
include_once "./BlogManager.php";

$blogManager = new BlogManager();
;?>
<index>
	<head>
		<title>Database Manager Homepage</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="./setInnerHTML.js"></script>
	</head>

	<body>
		<center>
			<hr>
			<h4>Limbix Blog</h4>
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
