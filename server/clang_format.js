import tmp from 'tmp';
import { spawn } from 'child_process';
import streams from 'memory-streams';

var clang_format = function(contents, style, callback) {
  const args = [`-style=${style}`];
  const proc = spawn('clang-format', args, { maxBuffer: 1000000 });
  var writer = new streams.WritableStream();
  proc.stdin.write(contents);
  proc.stdin.end();
  proc.stdout.pipe(writer);
  proc.stdout.on('end', () => {
    callback(null, writer.toString('utf8'));
  });
}

export default clang_format;
