/*Atos Vinicius*/
var Engine;

$(document).ready(function() {
    Engine = fEngine();
    Engine.start();
});

function fEngine() {

    var arrayCampos = [];
    var arrayLinhas = [];
    var arrayOcupados = [];
    var winner = false;
    var loser = false;

    function Engine(){
    }

    Engine.prototype.start = function () {
        for (var i = 1; i < 9; i++) {

            this.LogMessage(i + "° linha rodou");
            arrayLinhas = [];

            for (var n = 1; n < 9; n++) {
                $("#board").append("<div id='cmp" + i + "_" + n + "' onclick='Engine.setMove(this,[" + i + "," + n + "])' class='campo campo1'></div>");
                $("#cmp" + i + "_" + n).css("top", (n * 50) + "px");
                $("#cmp" + i + "_" + n).css("left", (i * 50) + "px");
                $("#cmp" + i + "_" + n).css("width", "50px");
                $("#cmp" + i + "_" + n).css("height", "50px");

                this.LogMessage(n + "° generated column");
                arrayLinhas[n] = [i, n];
            }
            arrayCampos[i] = arrayLinhas;
        }
    }

    Engine.prototype.LogMessage = function(message){
        return;
        console.log(message);
    }

    Engine.prototype.setMove = function (field_r, r1) {
        if(!loser & !winner){
            this.conflitQueens(field_r, r1);
        }
    }

    Engine.prototype.conflitQueens = function(field_r, r1){

        var final_result = true;

        if (arrayOcupados.length > 0) {
            var arrayOcupadosTemp = this.cloneObj(arrayOcupados);

            for (var i = 0; i < arrayOcupadosTemp.length; i++) {
                final_result = this.verifyConflicts(r1, arrayOcupados[i]);
                if(!final_result)
                    break
            }

        }

        if (final_result) {
            this.setField(r1);
            if(arrayOcupados.length >= 8){
                winner = true;
                this.winner();
            }
        }else{
            loser = true;
            this.loser();
        }
    }

    Engine.prototype.verifyConflicts = function(r1, r2){

        var result = true;

        this.LogMessage("verificação de numero "+r1+" X "+r2);
        if (r1[0] == r2[0]) {
            this.changeStatus(r1, "conflict");
            this.LogMessage("Vertical conflict");
            result = false;
        } else if (r1[1] == r2[1]) {
            this.changeStatus(r1, "conflict");
            this.LogMessage("conflict Horizontal");
            result = false;
        } else {
            for (var n = 1; n < 8; n++) {
                //diagonal direita baixo
                var cl1 = (r2[0] + n);
                var linha1 = (r2[1] + n);
                //diagonal direita cima
                var cl2 = (r2[0] + n);
                var linha2 = (r2[1] - n);
                //diagonal esquerda baixo
                var cl3 = (r2[0] - n);
                var linha3 = (r2[1] + n);
                //diagonal esquerda cima
                var cl4 = (r2[0] - n);
                var linha4 = (r2[1] - n);

                if (r1[0] == cl1 & r1[1] == linha1) {
                    this.changeStatus(r1, "conflict");
                    this.LogMessage("conflict on the lower right diagonal");
                    result = false;
                }
                if (r1[0] == cl2 & r1[1] == linha2) {
                    this.changeStatus(r1, "conflict");
                    this.LogMessage("upper right diagonal conflict");
                    result = false;
                }
                if (r1[0] == cl3 & r1[1] == linha3) {
                    this.changeStatus(r1, "conflict");
                    this.LogMessage("conflict on the lower left diagonal");
                    result = false;
                }
                if (r1[0] == cl4 & r1[1] == linha4) {
                    this.changeStatus(r1, "conflict");
                    this.LogMessage("upper left diagonal conflict");
                    result = false;
                }
            }
            this.LogMessage("finished verification");
        }

        return result;
    }

    Engine.prototype.setField = function(r1) {
        arrayOcupados.push(r1);
        this.changeStatus(r1, "put");
        this.LogMessage("No conflict");
    }

    Engine.prototype.changeStatus = function(field_r, status) {

        if(status == "put"){
            $("#cmp" + field_r[0] + "_" + field_r[1]).html('<span class="glyphicon glyphicon-flash"></span>');
        }

        $("#cmp" + field_r[0] + "_" + field_r[1]).addClass(status);
    }

    Engine.prototype.cloneObj = function(src) {
        return JSON.parse(JSON.stringify(src));
    }

    Engine.prototype.winner = function () {
        $("body").css('background','#2E8B57');
        $("body").css('color','#ffffff');
        $("#instructions").html("<h1>VOCÊ CONSEGUIU!</h1><hr/><h5>É possível resolver com 92 formas diferentes, que variam de 12 soluções únicas.</h5>");
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    Engine.prototype.loser = function () {
        $("body").css('background','#330000');
        $("body").css('color','#ffffff');
        $("#instructions").html("<h1>VOCÊ FRACASSOU!</h1><hr/><h5>É possível resolver com 92 formas diferentes, que variam de 12 soluções únicas.</h5>");
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    return new Engine();
}