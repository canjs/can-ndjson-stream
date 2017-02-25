import QUnit from 'steal-qunit';
import plugin from './can-ndjson-stream';

QUnit.module('can-ndjson-stream');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof plugin, 'function');
  QUnit.equal(plugin(), 'This is the can-ndjson-stream plugin');
});
