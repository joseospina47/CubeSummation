var cubeModel = (function () {

  var cube    = {},
      results = [];

  /**
   * Reads the submitted information, and decides
   * the operation to excecute.
   * @param  {String} operationsInput String with operations
   * @return {Array}                  Array of results
   */
  var _readOperations = function(operationsInput){
    var inputLines = input.split('\n'),
    operation,
    action,
    values;

    inputLines.forEach(function(item, index){
      operation = item.split(' ');
      if(operation.length > 2){
          action    = operation.shift(),
          values    = operation.join(' ');
        _runOperation(action, values);
      } else {
        throw 'Cannot read the submitted information';
      }
    });
    return results;
  };

  /**
   * Chooses which function to call.
   * @param  {String} action UPDATE or QUERY
   * @param  {String} values Operation parameters
   * @return {String}        Operation result
   */
  var _runOperation = function(action, values){
    switch(action){
      case 'UPDATE':
        _update(values);
        break;
      case 'QUERY':
        _query(values);
        break;
    }
  };

  /**
   * [function description]
   * @param  {[type]} values [description]
   * @return {[type]}        [description]
   */
  var _update = function(values){
    var operationValues = values.split(' '),
        x               = Number(operationValues[0]),
        y               = Number(operationValues[1]),
        z               = Number(operationValues[2]),
        w               = Number(operationValues[3]);

      if (!_cube[x]) {
          _cube[x] = {};
      }

      if (!_cube[x][y]) {
          _cube[x][y] = {};
      }

      _cube[x][y][z] = w;

      return 'Updated to ' + w;
  };

  /**
   * [function description]
   * @param  {[type]} values [description]
   * @return {[type]}        [description]
   */
  var _query = function(values){
      var operationValues = values.split(' ');
          x1              = Number(operationValues[0]),
          y1              = Number(operationValues[1]),
          z1              = Number(operationValues[2]),
          x2              = Number(operationValues[3]),
          y2              = Number(operationValues[4]),
          z2              = Number(operationValues[5]),
          xMin            = Math.min(x1, x2),
          xMax            = Math.max(x1, x2),
          yMin            = Math.min(y1, y2),
          yMax            = Math.max(y1, y2),
          zMin            = Math.min(z1, z2),
          zMax            = Math.max(z1, z2),
          sum             = 0;

      for(var x = xMin; x <= xMax; x++) {
          if (!_cube[x]) continue;
          for(var y = yMin; y <= yMax; y++) {
              if (!_cube[x][y]) continue;
              for(var z = zMin; z <= zMax; z++) {
                  sum += _cube[x][y][z] || 0;
              }
          }
      }
  };

  return{
    readOperations : _readOperations
  };

}());
