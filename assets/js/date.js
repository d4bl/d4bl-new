(function(){
    var d = new Date(),
    months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    formatted = months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
    document.getElementById('date').innerHTML = formatted;
  }());