<?php

	// php -f convert.php myfile.xlsx myfile.csv  

	if($_SERVER['argc'] < 3) {
		echo "usage: php -f convert.php input.xlsx output.js\r\n supported formats: .xlsx or .xls or .ods or .csv ";
		exit(2);
	} 

	error_reporting(E_ALL);

	date_default_timezone_set('GMT');
	ini_set("auto_detect_line_endings", true);
	ini_set("memory_limit", '512M');

	require_once 'phpexcel/Classes/PHPExcel/IOFactory.php';
	require_once 'phpexcel/Classes/PHPExcel/Writer/JSON.php';

	$incoming = $_SERVER['argv'][1];
	$outgoing = $_SERVER['argv'][2];
	
	$outgoingExtention = strtolower(pathinfo($outgoing, PATHINFO_EXTENSION));

	if (!file_exists($incoming)) {
		exit($incoming . " not found.\n");
	}

	$objPHPExcel = PHPExcel_IOFactory::load($incoming);

	switch($outgoingExtention) {
		case "js":
		case "json":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'JSON');
			$objWriter->setUseBOM(false);
		break;
	
		case "csv":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
			$objWriter->setUseBOM(false);
		break;
	
		case "xlsx":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		break;
	
		case "xls":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		break;
	
		case "html":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'HTML');
		break;
	
		case "pdf":
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
		break;
	
		default:
			exit("$outgoing is an unsupported file type\n");
		break;
	}


//	echo date('H:i:s') . " Saveing file\n";

	$objWriter->save($outgoing);
?>
