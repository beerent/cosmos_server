
<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/review/ReviewManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/QuestionManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);

  $bucket_manager = new BucketManager();
  $questionManager = new QuestionManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<?php
  function DisplayQuestions($questions, $forMeToReview) {
    $reviewManager = new ReviewManager();

    $ipAddress = $_SERVER['REMOTE_ADDR'];
    $beerentsIp = $ipAddress == "104.54.224.18";
    $bobsIp = $ipAddress == "72.43.89.50" || $ipAddress == "71.115.202.168";

    if ($forMeToReview && !$beerentsIp && !$bobsIp) {
      echo "<center>";
      echo "unrecognized IP address, contact brent!";
      echo "</center>";
      return; 
    }

    echo "<center>";
    
    $invalidCount = 0;
    $trueFalseCount = 0;
    $multipleChoiceCount = 0;
    $reviewCount = 0;

    for ($i = 0; $i < count($questions); $i++) {
      $reviews = $reviewManager->GetReviews($questions[$i]->GetId());
      if ($reviews->IsReviewComplete()) {
        $reviewCount ++;
      }

      if (count($questions[$i]->GetWrongAnswers()) == 1) {
        $trueFalseCount++;
      } else if (count($questions[$i]->GetWrongAnswers()) == 0 || count($questions[$i]->GetWrongAnswers()) == 2) {
        $invalidCount++;
      } else {
        $multipleChoiceCount++;
      }
    }
    echo "<table>";
    echo "<tr>";
    echo "<td><font size='2'>true/false count</font></td>";
    echo "<td><font size='2'>" . strval($trueFalseCount) . "</font></td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td><font size='2'>multiple choice count</font></td>";
    echo "<td><font size='2'>" . strval($multipleChoiceCount) . "</font></td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td><font size='2'>invalid count</font></td>";
    echo "<td><font size='2'>" . strval($invalidCount) . "</font></td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td><font size='2'>total reviewed</font></td>";
    echo "<td><font size='2'>" . strval($reviewCount) . "</font></td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td><font size='2'>total questions</font></td>";
    echo "<td><font size='2'>" . strval(count($questions)) . "</font></td>";
    echo "</tr>";

    echo "</table>";

    echo "</center>";

    foreach ($questions as $question) {
      $reviews = $reviewManager->GetReviews($question->GetId());

      if ($forMeToReview) {
        if ($beerentsIp) {
          if ($reviews->BeerentReviewed()) {
            continue;
          }
        } else if ($bobsIp) {
          if ($reviews->BobReviewed()) {
            continue;
          }
        } else {
          continue;
        }
      }

      echo "<hr>";
      echo "<center>";

      echo "<table>";
      echo "  <tr>";
      echo "    <td>";
      echo "      id";
      echo "    </td>";
      echo "    <td>";
      echo "      <input type='text' readonly value='". $question->GetId() ."' size='60' maxlength='150'>";
      echo "    </td>";
      echo "  </tr>";
      echo "    <td>";
      echo "      date added";
      echo "    </td>";
      echo "    <td>";
      echo "      <input type='text' readonly value='". $question->GetAdded() ."' size='60' maxlength='150'>";
      echo "    </td>";
      echo "  </tr>";

/************************************************/
// QUESTION FIELD
/************************************************/
      echo "  <tr>";
      echo "    <td>";
      echo "      question";
      echo "    </td>";
      echo "    <td>";

      $questionId = $question->GetId();
      $elementId = "edit_question_id_". $questionId;
      $stringUtils = new StringUtils();
      $questionText = $question->GetQuestion();
      $singleQuoteEscapedQuestionText = $stringUtils->EscapeSingleQuotes($questionText);

      echo '<input type="text" size="60" id="'.$elementId.'" value="'.htmlspecialchars($questionText).'" maxlength="150" onchange="AddToQuestionUpdateQueue(\''.$questionId.'\', \''.$elementId.'\', \''.htmlspecialchars($singleQuoteEscapedQuestionText).'\');">';

      echo "    </td>";
      echo "  </tr>";




/************************************************/
// ENABLED FIELD
/************************************************/
      echo "  <tr>";
      echo "    <td>";
      echo "      enabled";
      echo "    </td>";
      echo "    <td>";

      $questionId = $question->GetId();
      $elementId = "edit_question_enabled_id_". $questionId;

      $originalState = "enabled";
      if (!$question->IsEnabled()) {
        $originalState = "DISABLED";
      }

      echo "<input type='text' readonly size='60' id='". $elementId ."' value='". $originalState ."' maxlength='150'>";
      echo "<button onclick='AddToQuestionEnableUpdateQueue(\"". $questionId ."\", \"". $elementId ."\", \"". $originalState ."\");'>toggle</button>";

      echo "    </td>";
      echo "  </tr>";




/************************************************/
// CITATION FIELD
/************************************************/
      echo "  <tr>";
      echo "    <td>";
      echo "      citation";
      echo "    </td>";
      echo "    <td>";

      $questionId = $question->GetId();
      $originalCitation = $question->GetCitation();
      $elementId = "edit_question_citation_id_". $questionId;
      $singleQuoteEscapedCitationText = $stringUtils->EscapeSingleQuotes($originalCitation);

      echo '<input type="text" size="60" id="'.$elementId.'" value="'.htmlspecialchars($originalCitation).'" maxlength="500" onchange="AddToCitationUpdateQueue(\''.$questionId.'\', \''.$elementId.'\', \''.htmlspecialchars($singleQuoteEscapedCitationText).'\');">';

      echo "    </td>";
      echo "  </tr>";




/************************************************/
// ANSWER FIELD
/************************************************/
      $answers = $question->GetAnswers();
      for ($i = 0; $i < count($answers); $i++) {
        $answer = $answers[$i];

        echo "  <tr>";
        echo "    <td>";
        if ($answer->IsCorrect()) {
          echo "      correct answer";
        } else {
          echo "      wrong answer";
        }
        echo "    </td>";
        echo "    <td>";

        $answerId = $answer->GetId();
        $elementId = "edit_answer_id_". $answerId;
        $elementDeleteId = "edit_answer_delete_id_". $answerId;
        $answerText = $answer->GetAnswer();
        $singleQuoteEscapedAnswerText = $stringUtils->EscapeSingleQuotes($answerText);

        echo '<input type="text" size="60" id="'. $elementId .'" value="'. htmlspecialchars($answerText) .'" maxlength="150" onchange="AddToAnswerUpdateQueue(\''.$answerId .'\', \''. $elementId .'\', \''. htmlspecialchars($singleQuoteEscapedAnswerText) .'\');">';

        if (!$answer->IsCorrect()) {
          echo "<button id='". $elementDeleteId ."' onclick='AddAnswerToDeleteQueue(\"$answerId\", \"$elementId\", \"$elementDeleteId\");'>-</button>";
        }
        echo "    </td>";
        echo "  </tr>";
      }




/************************************************/
// NEW ANSWER FIELD
/************************************************/
      echo "<tr>";
      echo "<td id='new_answer_label_id_". $questionId ."'>";
      echo "add answer</td>";
      echo "<td>";
      $elementAddId = "new_answer_text_id_" . $questionId;
      echo "<input type='text' size='60' id='".$elementAddId."' maxlength='150' placeholder='add new wrong answer...'>";
      echo "<button id='new_answer_button_id_". $questionId ."' onclick='AddAnswerToAddQueue(\"$questionId\", \"$elementAddId\");'>+</button>";
      echo "</td>";
      echo "</tr>";




/************************************************/
// REVIEW FIELD
//************************************************/
      echo "<tr>";
      echo "<td>reviews</td>";
      echo "<td>";
      $beerentId = "beerent_" . $questionId . "_review";
      echo "<div style='display:inline' id='". $beerentId ."'>";

      $disabled = "";
      if (!$beerentsIp) {
        $disabled = " disabled ";
      }

      $originalState = "false";
      $checked = "";
      if ($reviews->BeerentReviewed()) {
        $originalState = "true";
        $checked = " checked ";
      }

      echo '<input '. $disabled .' '. $checked .' type="checkbox" onchange="AddToUpdateReviewQueue(\''. $beerentId .'\', \''. $questionId .'\', 0, '. $originalState .', this.checked)">';
      echo "beerent ";

      echo "</div>";
      
      $bobId = "bob_" . $questionId . "_review";
      echo "<div style='display:inline' id='". $bobId ."'>";

      $disabled = "";
      if (!$bobsIp) {
        $disabled = " disabled ";
      }

      $originalState = "false";

      $checked = "";
      if ($reviews->BobReviewed()) {
        $originalState = "true";
        $checked = " checked ";
      }

      echo '<input '. $disabled .' '. $checked .' type="checkbox" onchange="AddToUpdateReviewQueue(\''. $bobId .'\', \''. $questionId .'\', 1, '. $originalState .', this.checked)">';
      echo "bob";

      echo "</div>";

      echo "</td>";
      echo "</tr>";




/************************************************/
// BUCKETS FIELD
/************************************************/
      echo "<tr>";
      echo "<td id='edit_question_buckets_id_". $questionId ."'>";
      echo "buckets";
      echo "</td>";

      echo "<td>";
      $bucket_manager = new BucketManager();
      $allBuckets = $bucket_manager->GetAllBucketsAlphabetical();
      $currentBuckets = $bucket_manager->GetBucketsForQuestion($questionId);


      echo "<table>";
      $count = 0;
      for($i = 0; $i < count($allBuckets); $i++) {
        if ($count == 0) {
          echo "<tr>";
        }
        $bucket = $allBuckets[$i];
        $cellElementId = "update_bucket_id_" . $bucket->GetId() . "_" . $questionId;
        if ($bucket_manager->BucketListContainsBucket($currentBuckets, $bucket)) {
          echo '<td id="'. $cellElementId .'" align="right">' . $bucket->GetName() . ' <input type="checkbox" value="true" onchange="AddToUpdateBucketsQueue(\''.$questionId.'\', \''.$bucket->GetId().'\', this.value, this.checked, \''. $cellElementId .'\')" checked="checked"></td>';
        } else {
          echo '<td id="'. $cellElementId .'" align="right">' . $bucket->GetName() . ' <input type="checkbox" value="false" onchange="AddToUpdateBucketsQueue(\''.$questionId.'\', \''.$bucket->GetId().'\', this.value, this.checked, \''. $cellElementId .'\')" ></td>';
        }
        
        $count++;
        if ($count == 4) {
          $count = 0;
          echo "</tr>";
        }
      }
      if ($count != 5) {
        echo "</tr>";
      }
      echo "</table>";
      echo "</td>";
      echo "</tr>";
      echo "</table>";

      echo "</center>";
      echo "<hr>";
      echo "<br>";
      echo "<br>";
    }
  }
?>

<html lang="en">
  <head>
    <title>Manage Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
    <script src="question.js"></script>
  </head>

  <body>
    <?php  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include($include); ?>

    <div id="questions_to_update" style="display:none"></div>
    <div id="citations_to_update" style="display:none"></div>
    <div id="questions_to_toggle_enable" style="display:none"></div>
    <div id="answers_to_update" style="display:none"></div>
    <div id="answers_to_delete" style="display:none"></div>
    <div id="answers_to_add" style="display:none"></div>
    <div id="buckets_to_update" style="display:none"></div>
    <div id="reviews_to_update" style="display:none"></div>
    
    <center>
      <h1>Manage Questions</h1>
      <?php
        $enabledQuestionCount = $questionManager->GetEnabledQuestionCount();
        $bobToReviewCount = $questionManager->GetToReviewCount("bob");
        $beerentToReviewCount = $questionManager->GetToReviewCount("beerent");
        echo "<font size='2'>Total Questions: ". $enabledQuestionCount ."</font>";
        echo "<br>";
        echo "<font size='2'>Remaining for Bob to review: ". $bobToReviewCount ."</font>";
        echo "<br>";
        echo "<font size='2'>Remaining for Brent to review: ". $beerentToReviewCount ."</font>";
        echo "<br>";
      ?>
      <hr>
<p id="updateID"></p>

<?php
  $currentBucketId = -2;
  if (isset($_GET['id'])) {
    $currentBucketId = $_GET['id'];
  }
  
  $enabledOptionChecked = true;
  if (isset($_GET['enabled'])) {
    $enabledOptionChecked = $_GET['enabled'] == "1";
  }

  $forMeToReview = false;
  if (isset($_GET['review'])) {
    $forMeToReview = $_GET['review'] == "1";
  }


/************************************************/
// BUCKET SELECT
/************************************************/
  echo "bucket ";
  echo "<select id=\"bucket_select\" onchange='UpdateManageQuestionsPage(\"". $currentBucketId ."\")'>";

  if ("-2" == $currentBucketId) {
    echo '<option selected value="-2">ALL</option>';
  } else {
    echo '<option value="-2">ALL</option>';
  }

  foreach ($buckets as $bucket) {
    if (($bucket->GetId() == $currentBucketId) || ($currentBucketId == -1)) {
      echo '<option selected value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    } else {
      echo '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    }
  }

  if ("-1" == $currentBucketId) {
    echo '<option selected value="-1">NONE</option>';
  } else {
    echo '<option value="-1">NONE</option>';
  }

  echo "</select>";

/************************************************/
// ENABLED CHECKBOX
/************************************************/
  $enabledChecked ="";
  if ($enabledOptionChecked) {
    $enabledChecked = " checked ";
  }
  $enabledCheckbox = "<input type='checkbox' id=\"enabled_checked\" " . $enabledChecked . " onchange='UpdateManageQuestionsPage(\"". $currentBucketId ."\")'>";
  echo " enabled ";
  echo $enabledCheckbox;

/************************************************/
// REVIEWED CHECKBOX
/************************************************/
  
  $reviewChecked ="";
  if ($forMeToReview) {
    $reviewChecked = " checked ";
  }
  $reviewedCheckbox = "<input type='checkbox' id=\"review_checked\" " . $reviewChecked . " onchange='UpdateManageQuestionsPage(\"". $currentBucketId ."\")'>";
  echo " for me to review ";
  echo $reviewedCheckbox;

  echo "<br><br>";

  echo "<button onclick='if (CommitQuestionUpdates() && CommitCitationUpdates() && CommitToggleEnableUpdates() && CommitAnswerUpdates() && CommitAnswerDeletes() && CommitAnswerAdds() && CommitBucketUpdates() && CommitReviewUpdates()){location.reload(); alert(\"Updates Saved!\")}'>Save Changes!</button>";


  echo "</center>";
  echo "<br><br>";

  $questions = array();
  if ($enabledOptionChecked) {
    if ($currentBucketId == -1) {
      $questions = $questionManager->GetBucketlessQuestions("1");
    } else if ($currentBucketId == -2) {
      $questions = $questionManager->GetAllEnabledQuestions();
    }else {
      $questions = $questionManager->GetEnabledQuestions($currentBucketId);      
    }
  } else {
    if ($currentBucketId == -1) {
      $questions = $questionManager->GetBucketlessQuestions("0");
    } else if ($currentBucketId == -2) {
      $questions = $questionManager->GetAllDisabledQuestions();
    } else {
      $questions = $questionManager->GetDisabledQuestions($currentBucketId);      
    }
  }

  DisplayQuestions($questions, $forMeToReview);
?>
  </body>
</html>

