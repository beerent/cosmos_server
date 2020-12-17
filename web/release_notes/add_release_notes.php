<html>
	<head>
		<title>Database Manager Homepage</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="/base.js"></script>
		<script src="release_notes.js"></script>
	</head>
	</body>
	<?php $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include); ?>
		<center>
			<h1>Add Release Notes</h1>
			<hr>

			<p style="white-space:pre" id="release_notes_block"></p><br>
			<textarea rows="4" cols="50" placeholder="enter release notes here..." id="release_notes"></textarea>
			<br><br>
			version <input type="text" id="release_version">
			<br><br>
			<button onclick="AddReleaseNotes();">add release notes</button>
		</center>
	</body>
</html>
