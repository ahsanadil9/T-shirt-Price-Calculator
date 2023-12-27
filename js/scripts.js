var products = {
  white: {
    plain: {
      unit_price: 5.12,
      photo: "v-white.jpg",
    },
    printed: {
      unit_price: 8.95,
      photo: "v-white-personalized.jpg",
    },
  },

  colored: {
    plain: {
      unit_price: 6.04,
      photo: "v-color.jpg",
    },
    printed: {
      unit_price: 9.47,
      photo: "v-color-personalized.png",
    },
  },
};

// Search params

var search_params = {
  quantity: "",
  color: "",
  quality: "",
  style: "",
};

$(function () {
  function update_params() {
    search_params.quantity = parseInt($("#quantity").val());
    search_params.color = $("#color .option-button.selected").attr("id");
    search_params.quality = $("#quality .option-button.selected").attr("id");
    search_params.style = $("#style").val();
    console.log(search_params);
    update_order_detail();
  }

  function update_order_detail() {
    $(".refresh-loader").show();

    $("#result-style").html(search_params.style);

    var qualityID = "#" + search_params.quality;
    $("#result-quality").html($(qualityID).text());

    $("#result-color").html(search_params.color);

    $("#result-quantity").html(search_params.quantity);

    var orderTotal = calculate_price();
    $("#total-price").text(orderTotal);

    var PhotoUrl =
      "img/" + products[search_params.color][search_params.style].photo;
    $("#photo-product").attr("src", PhotoUrl);

    window.setTimeout(function () {
      $(".refresh-loader").hide();
    }, 500);
  }

  function calculate_price() {
    var unitPrice =
      products[search_params.color][search_params.style].unit_price;
    if (search_params.quality == "q190") {
      unitPrice *= 1.12;
    }
    var total = unitPrice * search_params.quantity;
    if (search_params.quantity >= 1000) {
      total *= 0.8;
    } else if (search_params.quantity >= 500) {
      total *= 0.88;
    } else if (search_params.quantity >= 100) {
      total *= 0.95;
    }
    return total.toFixed(2);
  }

  update_params();
  $("#quantity").change(function () {
    search_params.quantity = parseInt($("#quantity").val());
    update_order_detail();
  });

  $("#style").change(function () {
    search_params.style = $("#style").val();
    update_order_detail();
  });

  $(".option-button").click(function () {
    var clickParam = $(this).parent().attr("id");
    var childSelector = "#" + clickParam + " .option-button";
    $(childSelector).removeClass("selected");
    $(this).addClass("selected");
    var selectedChild = "#" + clickParam + " .option-button.selected";
    search_params[clickParam] = $(selectedChild).attr("id");

    update_order_detail();
  });
});
