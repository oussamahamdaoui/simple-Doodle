
function map(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

function getOffset(obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
        if (!isNaN(obj.offsetLeft)) {
            offsetLeft += obj.offsetLeft;
        }
        if (!isNaN(obj.offsetTop)) {
            offsetTop += obj.offsetTop;
        }
    } while (obj = obj.offsetParent);
    return {
        left: offsetLeft,
        top: offsetTop
    };
}

function constrain(variable,max,min){
    if(variable>max){
        return max;
    }
    if(variable<min){
        return min;
    }
    return variable;
}




$('#eyesController').on("touchmove", function (e) {
    e.preventDefault();
    offset=getOffset(this);
    e.offsetX = e.targetTouches[0].pageX - offset.left;
    e.offsetY = e.targetTouches[0].pageY - offset.top;


    e.offsetX = constrain(e.offsetX, 200,0);
    e.offsetY = constrain(e.offsetY, 200, 0);
    
    
    x = -map(e.offsetX, 0, 200, 12,-12);
    y = -map(e.offsetY, 0, 200, 12, -12);
    $('.eyeball').css('transform','translate('+x+"px,"+y+"px)");
    
    if (e.offsetY < 90) {
        yb = -map(e.offsetY, 0, 100, 20, -10);
        $('.pupilB').css('transform', 'translate(' + 0 + "px," + yb + "px)");
    }

    else if(e.offsetY > 90) {
        yt = -map(e.offsetY, 100, 200, 20, -16);
        $('.pupilT').css('transform', 'translate(' + 0 + "px," + yt + "px)");
    }    
    xe = map(e.offsetX, 0, 200, -3,3);
    $('#eL').css('left', Math.abs(xe)+57)
    $('#eR').css('right', Math.abs(xe) + 57)
    $('.eye').css('transform', 'translate(' + 4*xe + "px," + 0 + "px)");
})

$('#faceController').on("touchmove", function (e) {
    e.preventDefault()
     offset = getOffset(this);
     e.offsetX = e.targetTouches[0].pageX - offset.left;
     e.offsetY = e.targetTouches[0].pageY - offset.top;


     e.offsetX = constrain(e.offsetX, 200, 0);
     e.offsetY = constrain(e.offsetY, 200, 0);
    var x = -map(e.offsetX, 0, 200, 15,-15);
    var y = -map(e.offsetY, 0, 200, 15,-15);
    $('#face').css('transform', 'translate(' + x + "px," + y + "px)");
    $('.ear').css('transform', 'translate(' + -x*.5 + "px," + -y*.5 + "px)");
})

$('#faceController').on('touchstart', function () {
    $(this).toggleClass('border')
})

$('#faceController').on('touchend', function () {
    $(this).toggleClass('border')
})

$('#eyesController').on('touchstart', function () {
    $(this).toggleClass('border')
})

$('#eyesController').on('touchend', function () {
    $(this).toggleClass('border')
})

/* canvas recording 

function draw(){
    html2canvas(document.querySelector("#body"),{
        canvas:$('#video')[0],
        width:300,
        height:500,
        backgroundColor:null,
        logging:false
    })
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)

*/


///// force controler
/*
Pressure.set('#faceController', {
    change: function (force) {
        $("#video").html(force);
    }
});

Pressure.set('#eyesController', {
    change: function (force) {
        var scale=map(force,0,1,1,1.5);

        $("#video").html($(".eye")[0].style.transform + ',scale(' + scale + ')');
        $(".eye:first")[0].style.transform = $(".eye:first")[0].style.transform.split(" ")[0] +' scale('+scale+')';
        $(".eye:nth-child(2)")[0].style.transform = $(".eye:nth-child(2)")[0].style.transform.split(" ")[0] + ' scale(' + scale + ')';
    }
});

*/