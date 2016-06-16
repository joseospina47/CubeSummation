var cubeModel     = app.models.CubeModel,
    errorMessage  = 'Cannot read the submitted information';

/**
 * Query and Update tests
 */
QUnit.test('UPDATE 2 2 2 4', function(assert){
  var results       = cubeModel.readInput('UPDATE 2 2 2 4'),
      compareArray  = ['UPDATED (2,2,2) TO 4'];
  assert.deepEqual(
    results,
    compareArray,
    'The cube is updating its coordinates values'
  );
});

QUnit.test('QUERY 1 1 1 3 3 3', function(assert){
  var results       = cubeModel.readInput('QUERY 1 1 1 3 3 3'),
      compareArray  = [4];
  assert.deepEqual(
    results,
    compareArray,
    'The cube is excecuting queries'
  );
});

QUnit.test('UPDATE 1 1 1 23', function(assert){
  var results       = cubeModel.readInput('UPDATE 1 1 1 23'),
      compareArray  = ['UPDATED (1,1,1) TO 23'];
  assert.deepEqual(
    results,
    compareArray,
    'The cube is updating its coordinates values'
  );
});

  QUnit.test('QUERY 2 2 2 4 4 4', function(assert){
    var results       = cubeModel.readInput('QUERY 2 2 2 4 4 4'),
        compareArray  = [4];
    assert.deepEqual(
      results,
      compareArray,
      'The cube is excecuting queries'
    );
  });

  QUnit.test('QUERY 1 1 1 3 3 3', function(assert){
    var results       = cubeModel.readInput('QUERY 1 1 1 3 3 3'),
        compareArray  = [27];
    assert.deepEqual(
      results,
      compareArray,
      'The cube is excecuting queries'
    );
  });

/**
 * Exception tests
 */
 QUnit.test('input = 5', function(assert){
   assert.throws(
     function(){
       cubeModel.readInput('5');
     },
     'Throws an exception when the input is a single number'
   );
 });

 QUnit.test('input = 5  8', function(assert){
   assert.throws(
     function(){
       cubeModel.readInput('5 8');
     },
     'Throws an exception when the input is 2 numbers'
   );
 });

 QUnit.test('input = ""', function(assert){
   assert.throws(
     function(){
       cubeModel.readInput('');
     },
     'Throws an exception when the input is empty'
   );
 });

 QUnit.test('input = Hola', function(assert){
   assert.throws(
     function(){
       cubeModel.readInput('Hola');
     },
     'Throws an exception when the input is a word'
   );
 });

 QUnit.test('input = Hola Mundo', function(assert){
   assert.throws(
     function(){
       cubeModel.readInput('Hola');
     },
     'Throws an exception when the input is 2 words'
   );
 });
