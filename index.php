<script src="https://code.jquery.com/jquery-3.2.1.js" crossorigin="anonymous"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link href="8_conflitos.css" rel="stylesheet" type="text/css">
<script src="http://avcripty.ourdreams.com.br/libs/avpf001.js"></script>
<script src="8_conflitos.js"></script>
<div id="content">
    <div id="instructions">
        <h3>Regra:</h3><h5>as posições não podem entrar em conflito, de acordo com os movimentos da rainha.</h5>
        <img src="https://ep01.epimg.net/elpais/imagenes/2017/09/04/ciencia/1504535610_082169_1504536055_sumario_normal_recorte1.jpg"
             width="100"/>
    </div>
    <div id="board"></div>
</div>

<?php
//Charset
$content_text = iconv("UTF-8", "ISO-8859-1//TRANSLIT", "NOVO ACESSO AO DESAFIO.");
//layout linha log
$content_text = date("d/M/Y h:i:s") . " - " . $content_text . " ( " . $_SERVER['REMOTE_ADDR'] . " )";

//Grava log
$log_file = fopen("log/log_" . date("d_M_Y") . ".txt", "a") or die("Unable to open file!");
fwrite($log_file, "\n" . $content_text);
fclose($log_file);
?>