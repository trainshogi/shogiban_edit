var file    = document.getElementById('upfile');
var canvas  = document.getElementById('canvas1');
var pic1    = document.getElementById('pic1');
var contents = document.getElementsByClassName('contents');
var ctx = canvas.getContext('2d');
var uploadImgSrc;
var canvasWidth  = $('.contents').width();
var canvasHeight = $('.contents').height();
var img = new Image();
var rotate = 0;

canvas.width  = canvasWidth;
canvas.height = canvasHeight;

var cropCanvas = document.getElementById('cropCv');
var cropCtx = cropCanvas.getContext('2d');
$("#bunny").hide();
//cropCanvas.width = bunny.width;
//cropCanvas.height = bunny.height;
//cropCtx.drawImage(bunny, 0, 0);

var debug = false;

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        // $('#pic1').attr('src',uploadImgSrc)
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    
    // Canvas上に画像を表示
    pic1.style.backgroundImage = 'url('+uploadImgSrc+')';
    img.src = uploadImgSrc;
    img.onload = function() {
      EXIF.getData(img, function () {
        // canvasのサイズ(高さ)を変えてから表示
        console.log(EXIF.pretty(this));
        // 回転方向の読み取り
        if (EXIF.pretty(this)) {
          if (EXIF.getAllTags(this).Orientation == 6) {
            rotate = 90;
            canvas.height= img.width * (canvasWidth / img.height);
            $(".contents").height(canvas.height);
            $("#pic1").width(canvas.height);
            $("#pic1").height(canvas.width);
            pic1.style.backgroundSize = canvas.height + "px "+ canvas.width + "px";
            pic1.style.transformOrigin = Math.round(canvas.width/2) + "px "+ Math.round(canvas.width/2) + "px";
            pic1.style.transform = "rotate(" + rotate + "deg)";
            pic1.style.webkitTransform = "rotate(" + rotate + "deg)"
          } else if (EXIF.getAllTags(this).Orientation == 3) {
            rotate = 180;
            canvas.height= img.height * (canvasWidth / img.width);
            $(".contents").height(canvas.height);
            $("#pic1").height(canvas.height);
            pic1.style.backgroundSize = canvas.width + "px "+ canvas.height + "px";
            pic1.style.transform = "rotate(" + rotate + "deg)";
            pic1.style.webkitTransform = "rotate(" + rotate + "deg)"
          } else if (EXIF.getAllTags(this).Orientation == 8) {
            rotate = 270;
            canvas.height= img.width * (canvasWidth / img.height);
            difff = canvas.height-canvas.width;
            $(".contents").height(canvas.height);
            $("#pic1").width(canvas.height);
            $("#pic1").height(canvas.width);
            pic1.style.backgroundSize = canvas.height + "px "+ canvas.width + "px";
            pic1.style.transformOrigin = Math.round(canvas.width/2) + "px "+ Math.round(canvas.width/2) + "px";
            pic1.style.transform = "rotate(" + rotate + "deg) translateX(-" + difff +"px)";
            pic1.style.webkitTransform = "rotate(" + rotate + "deg) translateX(-" + difff +"px)";
          } else{
            rotate = 0;
            canvas.height= img.height * (canvasWidth / img.width);
            $(".contents").height(canvas.height);
            $("#pic1").height(canvas.height);
            pic1.style.backgroundSize = canvas.width + "px "+ canvas.height + "px";
          }
        }else{
          rotate = 0;
          canvas.height= img.height * (canvasWidth / img.width);
          pic1.style.backgroundSize = canvas.width + "px "+ canvas.height + "px";
        }
        // imgタグに表示
        // 切り抜きの四角の表示
        draw();
      });
    }
}

function get_js_variable() {
    var x = {};
    if (rotate == 0 || rotate == 180){
      var ratio = img.width / canvas.width;
    } else if (rotate == 90 || rotate == 270){
      var ratio = img.height / canvas.width;
    }
    x.x1 = {"x":parseInt(v1.x * ratio),"y":parseInt(v1.y * ratio)};
    x.x2 = {"x":parseInt(v2.x * ratio),"y":parseInt(v2.y * ratio)};
    x.x3 = {"x":parseInt(v3.x * ratio),"y":parseInt(v3.y * ratio)};
    x.x4 = {"x":parseInt(v4.x * ratio),"y":parseInt(v4.y * ratio)};
    console.log(x);
    document.forms['input_form'].elements['hidden_trapezoid'].value = JSON.stringify(x); //値セットするならvalueっぽい
    document.forms['input_form'].elements['hidden_rotate'].value = String(rotate); //値セットするならvalueっぽい
    document.forms['input_form'].elements['hidden_sengo'].value = String($('#sengo-event').prop('checked')); //値セットするならvalueっぽい
    console.log(document.forms['input_form'].elements['hidden_trapezoid'].value);
    console.log(document.forms['input_form'].elements['hidden_rotate'].value);
    console.log(document.forms['input_form'].elements['hidden_sengo'].value);
}