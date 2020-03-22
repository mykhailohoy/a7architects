$.getJSON("./images", data1 => {
  for (let i in data1) {
    $.getJSON("./images/" + data1[i], data2 => {
      for (let j in data2) {
        $.getJSON("./images/" + data1[i] + "/" + data2[j], data3 => {
          console.log(data3)
        })
      }
    })
  }
})