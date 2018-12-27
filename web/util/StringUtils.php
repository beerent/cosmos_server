 <?php
	class StringUtils {
		function __construct(){
		}

		function SpecialEscapeQuotes($string) {
			$newString = str_replace("'", "{{*}}", $string);
			$newString = str_replace("\"", "{{**}}", $newString);
			return $newString;
		}

		function EscapeSingleQuotes($string) {
			return str_replace("'", "\'", $string);
		}

		function ReplaceStrings($from, $to, $string) {
			return str_replace($from, $to, $string);
		}
	}
?>