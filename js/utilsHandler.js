function utilsHandler(data,url,type,callback) {
    $.ajax({
      type: type,
          url: 'utils/'+url,
          data: data,
          success: function (result) {
            callback(result);
          },error: function (request, status, error) {
            callback(request.responseText);
          }
    });
  }