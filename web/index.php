<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/release_notes/ReleaseNotesManager.php"; include_once($include);
  $releaseNotesManager = new ReleaseNotesManager();
?>

<index>
	<head>
		<title>Cosmos HQ</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="base.js"></script>
		<script src="/release_notes/release_notes.js"></script>
		<style>
			.right{
			    float:right;
			}

			.left{
			    float:left;
			}
		</style>
	</head>

	<body>
		<center>
			<h1>Release Notes</h1>
			<hr>
		</center>
		<?php
          $first = true;
          $releaseNotes = $releaseNotesManager->GetEnabledReleaseNotes();
          foreach ($releaseNotes as $releaseNote) {
            $notes = $releaseNote->GetNotes();
            $version = $releaseNote->GetVersion();
            $id = $releaseNote->GetId();
            $date = $releaseNote->GetDate();

            $paragraph  = "<p style='white-space: pre-wrap;'>";
            if ($first) {
              $paragraph .= "<hr style='height:2px;border-width:0; color:gray; background-color:gray'>";
              $first = false;
            }
            $paragraph .= "<p><span class=\"left\"><b>version ". $version ."</b></span><span class=\"right\"><font size='1'>". $date ."</font></span></p>";
            $paragraph .= "<br>";
            $paragraph .= "<p>" . $notes . "</p>";
            $paragraph .= "<hr style='height:2px; border-width:0; color:gray; background-color:gray'>";
            $paragraph .= "</p>";

            echo $paragraph;        
          }

		?>
			
	</body>
<index>
