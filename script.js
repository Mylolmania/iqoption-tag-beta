//(Replace language if != english and other language is present)
function checkLanguage() {
  switch(data['country']){
    case 'xyz':
      //replace language
      break;
  }
}

//Setting initial game variables
WAGER = 500;
FUNDS = 1000;
STATUS = 0;
METHOD = "";
actionStartData = 0;
actionEndData = 0;
//Defining the canvas element
canvas = document.getElementById('mainCanvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
WIDTH = canvas.width;
HEIGHT = canvas.height;

setupViewport(320);
doReadyCheck();

//MRAID scripts
function doReadyCheck() {
  if (mraid.getState() == 'loading') {
    mraid.addEventListener("ready", mraidIsReady);
  } else {
    prepareMyAd();
  }
}

function mraidIsReady() {
  mraid.removeEventListener("ready", mraidIsReady);
  prepareMyAd();
}

function setupViewport(width) {
  var element = document.querySelector("meta[name=viewport]");
  if (!element) {
    element = document.createElement("meta");
    element.name = "viewport";
    element.content = "width=" + width + ", user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(element);
  } else {
    element.content = "width=" + width + ", user-scalable=no";
  }
}

function prepareMyAd() {
  mraid.useCustomClose(true);
  mraid.setOrientationProperties({
    "allowOrientationChange": false,
    "forceOrientation": "landscape"
  });
  var screenSize = mraid.getScreenSize();
  var screenLandscapeWidth = screenSize.width;
  var screenLandscapeHeight = screenSize.height;
  if ((window.orientation == 0) || (window.orientation == 180)) {
    screenLandscapeWidth = screenSize.height;
    screenLandscapeHeight = screenSize.width;
  }
  document.getElementById("main").style.width = screenLandscapeWidth + "px";
  document.getElementById("main").style.height = screenLandscapeHeight + "px";

  ctx = canvas.getContext("2d");

  const binaryOptionsChartPlugin = {
    getPointDistance: function(chart, pointIndex) {
      const meta = chart.getDatasetMeta(0);
      const data = meta.data;
      const firstPoint = data[pointIndex]._model.x;
      const previousPoint = data[(pointIndex - 1)]._model.x;
      return firstPoint - previousPoint;
    },
    getPointPosition: function(chart, pointIndex) {
      const meta = chart.getDatasetMeta(0);
      const data = meta.data;
      return data[pointIndex]._model.x;
    },
    getPointPosition2: function(chart, pointIndex) {
      const meta = chart.getDatasetMeta(0);
      const data = meta.data;
      return data[pointIndex]._model.y;
    },
    renderVerticalLine: function(chartInstance, pointIndex) {
      const pointDistance = this.getPointDistance(chartInstance, pointIndex);
      const lineLeftOffsetStart = this.getPointPosition(chartInstance, pointIndex);

      const scale = chartInstance.scales['y-axis-0'];
      const context = chartInstance.chart.ctx;

      switch (STATUS) {
        case 0:
          var lineLeftOffset = lineLeftOffsetStart + (5 * pointDistance);
          break;
        case 1:
          var lineLeftOffset = lineLeftOffsetStart + (5 * pointDistance);
          break;
        case 2:
          var lineLeftOffset = lineLeftOffsetStart + (4 * pointDistance);
          break;
        case 3:
          var lineLeftOffset = lineLeftOffsetStart + (3 * pointDistance);
          break;
        case 4:
          var lineLeftOffset = lineLeftOffsetStart + (2 * pointDistance);
          break;
        case 5:
          var lineLeftOffset = lineLeftOffsetStart + pointDistance;
          break;
        case 6:
          var lineLeftOffset = lineLeftOffsetStart;
          break;
        case 7:
          var lineLeftOffset = lineLeftOffsetStart;
          break;
      }
      context.beginPath();
      context.strokeStyle = '#ff0000';
      context.moveTo(lineLeftOffset, scale.top);
      context.lineTo(lineLeftOffset, (scale.bottom + 10));
      context.stroke();
    },
    renderHorizontalLine: function(chartInstance, pointIndex) {
      switch (STATUS) {
        case 0:
          break;
        case 1:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, pointIndex);
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, pointIndex);
          break;
        case 2:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 1));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 1));
          break;
        case 3:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 2));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 2));
          break;
        case 4:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 3));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 3));
          break;
        case 5:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 4));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 4));
          break;
        case 6:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 5));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 5));
          break;
        case 6:
          var horizontalLineLeftOffset = this.getPointPosition(chartInstance, (pointIndex - 6));
          var horizontalLineBottomOffset = this.getPointPosition2(chartInstance, (pointIndex - 6));
          break;
      }

      const scale = chartInstance.scales['y-axis-0'];
      const context = chartInstance.chart.ctx;

      context.beginPath();
      context.setLineDash([5, 15]);
      context.strokeStyle = '#AEB1B9';
      context.moveTo(horizontalLineLeftOffset, horizontalLineBottomOffset);
      context.lineTo(WIDTH, horizontalLineBottomOffset);
      context.stroke();
      context.setLineDash([0, 0]);
    },
    afterDatasetsDraw: function(chart, easing) {
      if (chart.config.binaryOptionsChart) {
        chart.config.binaryOptionsChart.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
        chart.config.binaryOptionsChart.forEach(pointIndex => this.renderHorizontalLine(chart, pointIndex));
      }
    }
  };

  Chart.plugins.register(binaryOptionsChartPlugin);

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ],
      datasets: [{
        fill: 'start',
        lineTension: 0,
        data: [-0.24, 0.27, 0.61, 0.89, 0.87, 0.87, 0.25, -0.11, 0.30, -0.09, -0.47, 0.47, -0.49, -1.47, -2.22, -1.70, -2.39, -1.98, -2.09, -3.09, -2.01, -2],
        borderColor: [
          '#AEB1B9',
        ],
        borderWidth: 3
      }]
    },
    options: {
      layout: {
        padding: {
          top: 5,
          bottom: 5
        },
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }]
      }
    },
    binaryOptionsChart: [21]
  });


  setInterval(function() {
    var dataArrayLength = myChart.data.datasets["0"].data.length - 1;
    var lastData = myChart.data.datasets["0"].data[dataArrayLength];


    var newData = generateData(lastData);
    addData(myChart, "", newData);
    switch (STATUS) {
      case 0:
        break;
      case 1:
        actionStartData = lastData;
        STATUS = 2;
        break;
      case 2:
        STATUS = 3;
        break;
      case 3:
        STATUS = 4;
        break;
      case 4:
        STATUS = 5;
        break;
      case 5:
        STATUS = 6;
        break;
      case 6:
        actionEndData = newData;
        STATUS = 7;
        if (METHOD == "call") {
          if (actionEndData > actionStartData) {
            updateFunds("increase");
            openModal("win");
          } else {
            updateFunds("decrease");
            openModal("loss");
          }
        }
        if (METHOD == "put") {
          if (actionEndData < actionStartData) {
            updateFunds("increase");
            openModal("win");
          } else {
            updateFunds("decrease");
            openModal("loss");
          }
        }
        break;
      case 7:

        break;
    }


  }, 1000);

  function generateData(previousData) {
    if (Math.random() >= 0.5) {
      var newData = previousData - Math.random();
    } else {
      var newData = previousData + Math.random();
    }
    return newData;
  }

  function addData(chart, label, data) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
      chart.data.labels.push(label);
    });

    chart.data.labels.shift();

    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });

    chart.update();
  }
}

function call() {
  if (STATUS == 0) {
    document.getElementById("call").classList.add('inactive');
    document.getElementById("put").classList.add('inactive');
    document.getElementById("increase").classList.add('inactive');
    document.getElementById("decrease").classList.add('inactive');
    STATUS = 1;
    METHOD = "call";
  }
}

function put() {
  if (STATUS == 0) {
    document.getElementById("call").classList.add('inactive');
    document.getElementById("put").classList.add('inactive');
    document.getElementById("increase").classList.add('inactive');
    document.getElementById("decrease").classList.add('inactive');
    STATUS = 1;
    METHOD = "put";
  }
}

function updateAmount(action) {
  if (STATUS == 0) {
    if (action == increase) {
      if (FUNDS >= WAGER + 10) {
        WAGER = WAGER + 10;
      }
    }
    if (action == decrease) {
      if (FUNDS >= WAGER - 10 && WAGER - 10 > 0) {
        WAGER = WAGER - 10;
      }
    }
  }

  document.getElementById("amount").innerHTML = "Amount: " + WAGER + ".00 &#8364;";
  document.getElementById("profit").innerHTML = "Profit: +" + (WAGER * 0.91).toFixed(2) + " &#8364;";
}

function updateFunds(action) {
  if (action == "increase") {
    FUNDS = FUNDS + WAGER * 0.91;
  }
  if (action == "decrease") {
    FUNDS = FUNDS - 500;
  }
  document.getElementById("wallet").innerHTML = (FUNDS.toFixed(2)) + " &#8364;";
}

function reset() {
  STATUS = 0;
  document.getElementById("call").classList.remove('inactive');
  document.getElementById("put").classList.remove('inactive');
  document.getElementById("increase").classList.remove('inactive');
  document.getElementById("decrease").classList.remove('inactive');
  closeModal();
}


function openModal(action) {
  var modal = document.getElementById('modal');
  modal.style.display = "block";
  if (action == "win") {
    var modalContentRightWinText = document.getElementById('modal-content-right-win-text');
    var modalContentRight = document.getElementById('modal-content-right-win');
    var modalWinButtonText = document.getElementById('modal-win-button-text');
    modalContentRight.style.display = "block";
    modalContentRightWinText.innerHTML = 'Your profit from investing €' + (WAGER.toFixed(0)) + ' amounts to €' + ((WAGER * 0.91).toFixed(0)) + '.';
    modalWinButtonText.innerHTML = 'Profit: €' + ((WAGER * 0.91).toFixed(0));
  }
  if (action == "loss") {
    var modalContentRight = document.getElementById('modal-content-right-loss');
    modalContentRight.style.display = "block";
  }
}

function closeModal() {
  var modal = document.getElementById('modal');
  var modalContentRightWin = document.getElementById('modal-content-right-win');
  var modalContentRightLoss = document.getElementById('modal-content-right-loss');
  modal.style.display = "none";
  modalContentRightLoss.style.display = "none";
  modalContentRightWin.style.display = "none";
}

var modal = document.getElementById('modal');
var modalStartTradingButton = document.getElementById('modal-start-trading-button');
var modalContentRightWin = document.getElementById('modal-win-button');
var modalContentRightLoss = document.getElementById('modal-loss-button');
modal.onclick = function() {
  reset();
};
modalStartTradingButton.onclick = function() {
  mraid.open("http://affiliate.iqoption.com/redir/?aff=45636");
};
modalContentRightLoss.onclick = function() {
  mraid.open("http://affiliate.iqoption.com/redir/?aff=45636");
};
modalContentRightWin.onclick = function() {
  mraid.open("http://affiliate.iqoption.com/redir/?aff=45636");
};
