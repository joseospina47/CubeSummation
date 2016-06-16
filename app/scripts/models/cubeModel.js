app.models.CubeModel = (function () {

  var _cube    = {};

  /**
   * Updates the value of a specific coordinate.
   * @param  {String} values Operation Values
   * @return {String}        Operation Result
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

      return 'UPDATED (' + x + ',' + y + ',' + z + ') TO ' + w;
  };

  /**
   * Calculates the sum of the value of the blocks
   * given by the submitted coordinates.
   * @param  {String} values Operation Values
   * @return {Integer}       Operation Result
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

      return sum;
  };

  /**
   * Chooses which function to call.
   * @param  {String} action UPDATE or QUERY
   * @param  {String} values Operation parameters
   * @return {String or Integer}  Operation result
   */
  var _runOperation = function(action, values){
    var result;
    switch(action){
      case 'UPDATE':
        result =  _update(values);
        break;
      case 'QUERY':
        result = _query(values);
        break;
    }
    return result;
  };

  /**
   * Reads the submitted information, and decides
   * the operation to excecute.
   * @param  {String} operationsInput String with operations
   * @return {Array}                  Array of results
   */
  var readInput = function(operationsInput){
    var inputLines = operationsInput.split('\n'),
    results        = [],
    operation,
    action,
    values;

    inputLines.forEach(function(item, index){
      operation = item.split(' ');
      if(operation.length > 2){
          action    = operation.shift(),
          values    = operation.join(' ');
          result    = _runOperation(action, values);
          results.push(result);
      } else {
        throw 'Cannot read the submitted information';
      }
    });
    return results;
  };

  return{
    readInput : readInput
  };

}());
