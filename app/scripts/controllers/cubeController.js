app.controllers.CubeController = (function () {

  var cubeModel = app.models.CubeModel;

  /**
   * Shows all the operations results
   * @param  {Array} results Operations Results
   */
  var _showResults = function(results){
    var resultHtml = '';
    results.forEach(function(item, index){
      resultHtml += '<br><code>' + item + '<code>';
    });
    $('.cs-code-result').empty();
    $('.cs-alert').empty();
    $('.cs-result').hide();
    $('.cs-code-result').append(resultHtml);
    $('.cs-result').show();
  };

  /**
   * Displays the error messages.
   */
  var _showErrorMessage = function(errorMessage){
    $('.cs-alert').empty();
    $('.cs-result').hide();
    $('.cs-alert').append(errorMessage);
    $('.cs-alert').show();

    setTimeout(function() {
      $(".cs-alert").hide();
    }, 5000);
  };

  /**
   * Calls the CubeModel to read and excecute
   * all the operations
   */
  var _excecuteOperations = function(){
    try{
      var operationsInput = $('.cs-input').val(),
          results = cubeModel.readInput(operationsInput);
          _showResults(results);
    } catch (error) {
      _showErrorMessage(error);
    }
  };

  /**
   * Binds all the UI actions with the controller
   */
  var _bindUIActions = function(){
    $('.cs-button').on('click', _excecuteOperations);
  };

  /**
   * Initializes the controller
   */
  var _init = function(){
    _bindUIActions();
  };

  _init();

}());
