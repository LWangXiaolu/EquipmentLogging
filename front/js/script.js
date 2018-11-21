// let currentDate=new Date();

// window.alert(currentDate);
// // document.getElementById("main-title").innerHTML="This project is my first project";

// $.getJSON("http://localhost:3000/api/genres", function (data) {//#A
//       // console.log(data);
//       let showValue=data[0].name+" ";
//             for( i=1; i<data.length; i++){
//                 showValue += data[i].name + " ";
//                 console.log(showValue);
//         }
//         $("#available-apis").html(showValue);
//     });
document.getElementById("myButton").onclick=function(){
    $.ajax({
        url: "http://localhost:3000/api/auth",
        type: "POST",
        dataType : "json",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify ({
"name": $('#username').val(),
"password":$('#password').val()
        }),
    processData: false,
        success: function (result) {
          if (result) return location.href="detailProject.html";
            // if (result) return $("#response-message").html("done");
            console.log(result);
            },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            // return $("#response-message").html(xhr.responseText);
        // alert(xhr.status);
        // alert(thrownError);
        }
    });
};

<script type="text/javascript">
    $('#side-bar').hover(function(){
        $('#side-bar').animate({ "left": "-340px" }, "slow" );
    });
</script>
 -->
var maxDataPoints=20;
var chart=new google.visualization.LineChart($('#chart')[0]);
var data=new google.visualization.arrayToDataTable([
    ['Time','Noise Level'],
    [getTime(),0]
    ]);

var options={
    title: getTitle(),
    curveType: 'function',
    animation:{
        duration:2000,
        easing:'in'
    },
    legend:{position:'bottom'}
};

function addDataPoint(dataPoint){
    if (data.getNumberOfRows() > maxDataPoints) {
      data.removeRow(0);
    }
    data.addRow([getTime(), dataPoint.value]);
    chart.draw(data, options); //#E
}

function getTitle(){
    $.getJSON('http://localhost:3001/api/sensors',
      function (result) {
        return result.title;
      });
}
 function getTime() {
    var d = new Date();
    return d.toLocaleTimeString('en-US');
  }

  function doPoll() { //#F
    $.getJSON('http://localhost:3001/api/sensors',
      function (result) {
        addDataPoint(result); //#G
        setTimeout(doPoll, 2000);
      });
    }
    doPoll();
